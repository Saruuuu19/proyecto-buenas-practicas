from runpy import run_module

import pytest
from fastapi.routing import APIRoute
from fastapi.testclient import TestClient

S3_ORIGINS = [
    f"http://cuc-bp-{name}-sitio-2026.s3-website-us-east-1.amazonaws.com"
    for name in ("retamoso", "suarez", "guerra")
]
PREVIEW = "/api/checkout/preview"
ALLOW_ORIGIN = "access-control-allow-origin"
ALLOW_METHODS = "access-control-allow-methods"
ALLOW_HEADERS = "access-control-allow-headers"
ALLOW_CREDENTIALS = "access-control-allow-credentials"


def app_for(monkeypatch, frontend_url):
    monkeypatch.setenv("DATABASE_URL", "sqlite://")
    monkeypatch.setenv("PYTHON_DOTENV_DISABLED", "1")
    if frontend_url is None:
        monkeypatch.delenv("FRONTEND_URL", raising=False)
    else:
        monkeypatch.setenv("FRONTEND_URL", frontend_url)
    return run_module("app.main")["app"]


@pytest.fixture
def app(monkeypatch):
    return app_for(monkeypatch, " , " + " , ".join(S3_ORIGINS) + " , ")


@pytest.fixture
def client(app):
    return TestClient(app)


def preflight(client, path, method, origin=S3_ORIGINS[0], headers="Content-Type"):
    return client.options(path, headers={
        "Origin": origin,
        "Access-Control-Request-Method": method,
        "Access-Control-Request-Headers": headers,
    })


@pytest.mark.parametrize("origin", S3_ORIGINS)
def test_preview_preflight(client, origin):
    response = preflight(client, PREVIEW, "POST", origin)
    assert response.status_code == 200
    assert response.headers[ALLOW_ORIGIN] == origin
    assert response.headers[ALLOW_METHODS] == "POST"
    assert "content-type" in response.headers[ALLOW_HEADERS].lower()
    assert "x-admin-api-key" not in response.headers[ALLOW_HEADERS].lower()
    assert ALLOW_CREDENTIALS not in response.headers


def test_catalog_read_keeps_cors(client):
    response = preflight(client, "/api/products/1", "GET")
    assert response.status_code == 200
    assert response.headers[ALLOW_METHODS] == "GET"
    response = client.get("/health", headers={"Origin": S3_ORIGINS[0]})
    assert response.status_code == 200
    assert response.headers[ALLOW_ORIGIN] == S3_ORIGINS[0]
    assert ALLOW_CREDENTIALS not in response.headers


@pytest.mark.parametrize(("path", "method", "headers"), [
    (f"{PREVIEW}/", "POST", "Content-Type"),
    ("/api/products", "POST", "Content-Type"),
    ("/api/products/1", "PATCH", "Content-Type"),
    ("/api/products/1", "GET", "X-Admin-API-Key"),
    (PREVIEW, "PATCH", "Content-Type"),
    (PREVIEW, "GET", "Content-Type"),
    (PREVIEW, "POST", "Content-Type, X-Admin-API-Key"),
])
def test_rejects_preflight_outside_policy(client, path, method, headers):
    response = preflight(client, path, method, headers=headers)
    assert response.status_code == 400


@pytest.mark.parametrize("origin", ["https://externo.example", "http://localhost:5173"])
def test_rejects_unconfigured_origins(client, origin):
    response = preflight(client, PREVIEW, "POST", origin)
    assert response.status_code == 400
    assert ALLOW_ORIGIN not in response.headers


@pytest.mark.parametrize("frontend_url", [None, ""])
def test_no_origins_without_configuration(monkeypatch, frontend_url):
    client = TestClient(app_for(monkeypatch, frontend_url))
    response = client.get("/health", headers={"Origin": S3_ORIGINS[0]})
    assert ALLOW_ORIGIN not in response.headers


def test_rejects_wildcard_configuration(monkeypatch):
    with pytest.raises(ValueError, match="FRONTEND_URL"):
        app_for(monkeypatch, f"{S3_ORIGINS[0]}, *")


def test_preview_post_response(app):
    async def preview(payload: dict):
        return payload

    app.router.routes.insert(0, APIRoute(PREVIEW, preview, methods=["POST"]))
    payload = {"items": [1]}
    client = TestClient(app)
    headers = {"Origin": S3_ORIGINS[0]}
    response = client.post(PREVIEW, json=payload, headers=headers)
    assert response.status_code == 200
    assert response.json() == payload
    assert response.headers[ALLOW_ORIGIN] == S3_ORIGINS[0]
    assert ALLOW_CREDENTIALS not in response.headers

    response = client.post(f"{PREVIEW}/", json=payload, headers=headers, follow_redirects=False)
    assert ALLOW_ORIGIN not in response.headers


@pytest.mark.parametrize(("method", "path"), [
    ("POST", "/api/products"),
    ("PATCH", "/api/products/1"),
])
def test_admin_write_still_requires_key_and_has_no_cors(client, monkeypatch, method, path):
    monkeypatch.setenv("ADMIN_API_KEY", "test-key")
    response = client.request(method, path, json={}, headers={"Origin": S3_ORIGINS[0]})
    assert response.status_code == 401
    assert ALLOW_ORIGIN not in response.headers
