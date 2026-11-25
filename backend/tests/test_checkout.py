from decimal import Decimal

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

with pytest.MonkeyPatch.context() as config:
    config.setenv("DATABASE_URL", "sqlite://")
    config.setenv("PYTHON_DOTENV_DISABLED", "1")
    import app.main as main
    from app.database import get_db
    from app.models import Product

PREVIEW_URL = "/api/checkout/preview"
ITEM = {"product_id": 1, "quantity": 2}


@pytest.fixture
def checkout(tmp_path, monkeypatch):
    engine = create_engine(f"sqlite:///{tmp_path / 'checkout.db'}")
    sessions = sessionmaker(bind=engine)

    def get_test_db():
        with sessions() as db:
            yield db

    monkeypatch.setattr(main, "engine", engine)
    monkeypatch.setitem(main.app.dependency_overrides, get_db, get_test_db)
    fields = {"description": "", "category": "Periféricos", "image": ""}
    try:
        with TestClient(main.app) as client:
            with sessions.begin() as db:
                db.add_all(
                    [
                        Product(id=1, title="Teclado", price=Decimal("19.99"), **fields),
                        Product(id=2, title="Mouse", price=Decimal("0.29"), **fields),
                    ]
                )
            yield client, sessions
    finally:
        engine.dispose()


def test_checkout_preview_is_public(checkout):
    client, _ = checkout
    response = client.post(PREVIEW_URL, json={"items": [ITEM]})

    assert response.status_code == 200
    assert response.json() == {
        "items": [
            ITEM | {"title": "Teclado", "unit_price_cents": 1999, "subtotal_cents": 3998}
        ],
        "total_cents": 3998,
    }


def test_checkout_preview_calculates_exact_total_in_request_order(checkout):
    client, _ = checkout
    response = client.post(
        PREVIEW_URL, json={"items": [{"product_id": 2, "quantity": 3}, ITEM]}
    )

    assert response.status_code == 200
    preview = response.json()
    assert [item["product_id"] for item in preview["items"]] == [2, 1]
    assert [item["subtotal_cents"] for item in preview["items"]] == [87, 3998]
    assert preview["total_cents"] == 4085


def test_checkout_preview_uses_latest_database_price(checkout):
    client, sessions = checkout
    payload = {"items": [ITEM]}
    assert client.post(PREVIEW_URL, json=payload).json()["total_cents"] == 3998

    with sessions.begin() as db:
        db.get(Product, 1).price = Decimal("29.99")

    response = client.post(PREVIEW_URL, json=payload)
    assert response.status_code == 200
    assert response.json()["items"][0]["unit_price_cents"] == 2999
    assert response.json()["total_cents"] == 5998


@pytest.mark.parametrize(
    "items",
    [
        [],
        [ITEM, ITEM | {"quantity": 1}],
        [ITEM | {"product_id": product_id} for product_id in range(1, 102)],
        [{"quantity": 2}],
        [{"product_id": 1}],
        *([ITEM | {"product_id": value}] for value in (0, -1, True, 1.0, "1")),
        *([ITEM | {"quantity": value}] for value in (0, -1, True, 2.0, "2", 101)),
    ],
)
def test_checkout_preview_rejects_invalid_items(checkout, items):
    client, _ = checkout
    assert client.post(PREVIEW_URL, json={"items": items}).status_code == 422


def test_checkout_preview_reports_all_missing_ids(checkout):
    client, _ = checkout
    response = client.post(
        PREVIEW_URL,
        json={
            "items": [
                ITEM | {"product_id": 2**63},
                ITEM,
                ITEM | {"product_id": 99},
            ]
        },
    )

    assert response.status_code == 404
    assert response.json() == {
        "detail": {
            "message": "Productos no encontrados",
            "missing_product_ids": [2**63, 99],
        }
    }
