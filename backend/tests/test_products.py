from contextlib import contextmanager

import pytest
from fastapi import FastAPI, status
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

with pytest.MonkeyPatch.context() as config:
    config.setenv("DATABASE_URL", "sqlite://")
    from app.database import Base, get_db
    from app.models import Product
    from app.routers import admin, products
    from app.seed import seed_products

PRODUCTS_URL = "/api/products"
STATS_URL = "/api/admin/stats"
ADMIN_KEY = "clave-solo-para-pruebas"
ADMIN_HEADERS = {"X-Admin-API-Key": ADMIN_KEY}
PRODUCT = {
    "title": "Teclado",
    "price": 19.99,
    "description": "Teclado mecánico",
    "category": "Periféricos",
    "image": "https://example.com/teclado.png",
}


@pytest.fixture
def sessions(tmp_path):
    engine = create_engine(f"sqlite:///{tmp_path / 'test.db'}")
    Base.metadata.create_all(engine)
    try:
        yield sessionmaker(bind=engine)
    finally:
        engine.dispose()


@contextmanager
def client_for(sessions):
    def get_test_db():
        with sessions() as db:
            yield db

    app = FastAPI()
    app.include_router(products.router, prefix="/api")
    app.include_router(admin.router, prefix="/api")
    app.dependency_overrides[get_db] = get_test_db
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
def client(monkeypatch, sessions):
    monkeypatch.setenv("ADMIN_API_KEY", ADMIN_KEY)
    with sessions.begin() as db:
        db.add_all(
            [
                Product(**(PRODUCT | {"id": 3, "title": "Auriculares", "category": "Audio"})),
                Product(**(PRODUCT | {"id": 2, "title": "Mouse"})),
                Product(**PRODUCT, id=1),
            ]
        )
    with client_for(sessions) as test_client:
        yield test_client


def test_list_products(client):
    response = client.get(f"{PRODUCTS_URL}/")
    assert response.status_code == status.HTTP_200_OK
    assert [product["id"] for product in response.json()] == [1, 2, 3]


def test_categories_are_unique(client):
    response = client.get(f"{PRODUCTS_URL}/categories")
    assert response.status_code == status.HTTP_200_OK
    assert sorted(response.json()) == ["Audio", "Periféricos"]


@pytest.mark.parametrize("product_id", [99999, 2**63])
def test_missing_product_returns_404(client, product_id):
    response = client.get(f"{PRODUCTS_URL}/{product_id}")
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_valid_product_is_created(client):
    response = client.post(PRODUCTS_URL, json=PRODUCT, headers=ADMIN_HEADERS)
    assert response.status_code == status.HTTP_201_CREATED
    created = response.json()
    assert created == PRODUCT | {"id": 4}
    assert client.get(f"{PRODUCTS_URL}/{created['id']}").json() == created


@pytest.mark.parametrize("headers", [{}, {"X-Admin-API-Key": "incorrecta"}])
def test_create_requires_valid_admin_key(client, headers):
    response = client.post(PRODUCTS_URL, json=PRODUCT, headers=headers)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert client.get(f"{PRODUCTS_URL}/4").status_code == status.HTTP_404_NOT_FOUND


def test_create_is_disabled_without_configured_key(client, monkeypatch):
    monkeypatch.delenv("ADMIN_API_KEY")
    response = client.post(PRODUCTS_URL, json=PRODUCT, headers=ADMIN_HEADERS)
    assert response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE
    assert client.get(f"{PRODUCTS_URL}/").status_code == status.HTTP_200_OK


def test_product_without_title_returns_400(client):
    payload = PRODUCT.copy()
    del payload["title"]
    response = client.post(PRODUCTS_URL, json=payload, headers=ADMIN_HEADERS)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "(title)" in response.json()["detail"]


def test_zero_price_returns_400(client):
    response = client.post(
        PRODUCTS_URL, json=PRODUCT | {"price": 0}, headers=ADMIN_HEADERS
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "mayor que 0" in response.json()["detail"]


@pytest.mark.parametrize("price", [0.001, 19.999, 100_000_000])
def test_price_must_fit_database_column(client, price):
    response = client.post(
        PRODUCTS_URL, json=PRODUCT | {"price": price}, headers=ADMIN_HEADERS
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert client.get(f"{PRODUCTS_URL}/4").status_code == status.HTTP_404_NOT_FOUND


def test_patch_updates_only_sent_fields_and_persists(client, sessions):
    changes = {"price": 29.99, "description": ""}
    response = client.patch(f"{PRODUCTS_URL}/1", json=changes, headers=ADMIN_HEADERS)

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == PRODUCT | changes | {"id": 1}
    with client_for(sessions) as next_client:
        assert next_client.get(f"{PRODUCTS_URL}/1").json() == response.json()


def test_patch_missing_product_returns_404(client):
    response = client.patch(
        f"{PRODUCTS_URL}/99999", json={"price": 29.99}, headers=ADMIN_HEADERS
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.parametrize("path, content", [
    ("/no-es-id", '{"price": 29.99}'),
    ("/1", '{"price":'),
    ("/1", "[]"),
    ("/1", "{}"),
    ("/1", '{"price": 0, "title": "No debe guardarse"}'),
    ("/1", '{"price": 29.999}'),
    ("/1", '{"description": null}'),
    ("/1", '{"title": "  "}'),
    ("/1", '{"id": 2}'),
])
def test_patch_invalid_request_returns_400_without_changes(client, path, content):
    response = client.patch(
        f"{PRODUCTS_URL}{path}",
        content=content,
        headers=ADMIN_HEADERS | {"Content-Type": "application/json"},
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert client.get(f"{PRODUCTS_URL}/1").json() == PRODUCT | {"id": 1}


@pytest.mark.parametrize("headers", [{}, {"X-Admin-API-Key": "incorrecta"}])
def test_patch_requires_valid_admin_key(client, headers):
    response = client.patch(
        f"{PRODUCTS_URL}/1", json={"price": 29.99}, headers=headers
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert client.get(f"{PRODUCTS_URL}/1").json() == PRODUCT | {"id": 1}


def test_patch_is_disabled_without_configured_key(client, monkeypatch):
    monkeypatch.delenv("ADMIN_API_KEY")
    response = client.patch(
        f"{PRODUCTS_URL}/1", json={"price": 29.99}, headers=ADMIN_HEADERS
    )
    assert response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE
    assert client.get(f"{PRODUCTS_URL}/1").json() == PRODUCT | {"id": 1}


def test_seeded_catalog_uses_database_and_keeps_ids(sessions, monkeypatch):
    monkeypatch.setenv("ADMIN_API_KEY", ADMIN_KEY)
    with client_for(sessions) as client:
        assert client.get(f"{PRODUCTS_URL}/").json() == []
        assert client.get(f"{PRODUCTS_URL}/categories").json() == []
        assert client.get(STATS_URL).json() == {
            "products_count": 0,
            "categories_count": 0,
        }

    with sessions() as db:
        assert seed_products(db) is True
    with sessions() as db:
        assert seed_products(db) is False

    with client_for(sessions) as client:
        catalog = client.get(f"{PRODUCTS_URL}/").json()
        assert [product["id"] for product in catalog] == list(range(1, 16))
        assert len(client.get(f"{PRODUCTS_URL}/categories").json()) == 12
        assert client.get(STATS_URL).json() == {
            "products_count": 15,
            "categories_count": 12,
        }
        payload = PRODUCT | {"category": "Nueva categoría"}
        response = client.post(PRODUCTS_URL, json=payload, headers=ADMIN_HEADERS)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.json() == payload | {"id": 16}

    with client_for(sessions) as client:
        assert client.get(f"{PRODUCTS_URL}/16").json() == payload | {"id": 16}
        assert client.get(STATS_URL).json() == {
            "products_count": 16,
            "categories_count": 13,
        }


def test_seed_does_not_overwrite_existing_products(sessions):
    with sessions.begin() as db:
        db.add(Product(**PRODUCT, id=1))

    with sessions() as db:
        assert seed_products(db) is False

    with client_for(sessions) as client:
        assert client.get(f"{PRODUCTS_URL}/").json() == [PRODUCT | {"id": 1}]
