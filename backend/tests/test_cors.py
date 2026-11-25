from runpy import run_module

import pytest
from fastapi.testclient import TestClient

S3_ORIGINS = [
    f"http://cuc-bp-{name}-sitio-2026.s3-website-us-east-1.amazonaws.com"
    for name in ("retamoso", "suarez", "guerra")
]
ALLOW_ORIGIN = "access-control-allow-origin"
ALLOW_CREDENTIALS = "access-control-allow-credentials"


def client_for(monkeypatch, frontend_url):
    monkeypatch.setenv("DATABASE_URL", "sqlite://")
    monkeypatch.setenv("PYTHON_DOTENV_DISABLED", "1")
    if frontend_url is None:
        monkeypatch.delenv("FRONTEND_URL", raising=False)
    else:
        monkeypatch.setenv("FRONTEND_URL", frontend_url)
    return TestClient(run_module("app.main")["app"])


@pytest.fixture
def client(monkeypatch):
    return client_for(monkeypatch, " , " + " , ".join(S3_ORIGINS) + " , ")


@pytest.mark.parametrize("origin", S3_ORIGINS)
def test_allows_configured_origins(client, origin):
    response = client.get("/health", headers={"Origin": origin})
    assert response.status_code == 200
    assert response.headers[ALLOW_ORIGIN] == origin
    assert ALLOW_CREDENTIALS not in response.headers


@pytest.mark.parametrize("origin", ["https://externo.example", "http://localhost:5173"])
def test_does_not_allow_unconfigured_origins(client, origin):
    response = client.get("/health", headers={"Origin": origin})
    assert response.status_code == 200
    assert ALLOW_ORIGIN not in response.headers


@pytest.mark.parametrize("frontend_url", [None, ""])
def test_does_not_allow_origins_without_configuration(monkeypatch, frontend_url):
    client = client_for(monkeypatch, frontend_url)
    response = client.get("/health", headers={"Origin": S3_ORIGINS[0]})
    assert ALLOW_ORIGIN not in response.headers


def test_rejects_wildcard_configuration(monkeypatch):
    with pytest.raises(ValueError, match="FRONTEND_URL"):
        client_for(monkeypatch, f"{S3_ORIGINS[0]}, *")


@pytest.mark.parametrize(("method", "header", "expected_status"), [
    ("GET", "Content-Type", 200),
    ("GET", "X-Admin-API-Key", 400),
    ("POST", "Content-Type", 400),
    ("PATCH", "Content-Type", 400),
])
def test_catalog_preflight(client, method, header, expected_status):
    response = client.options("/api/products/1", headers={
        "Origin": S3_ORIGINS[0],
        "Access-Control-Request-Method": method,
        "Access-Control-Request-Headers": header,
    })
    assert response.status_code == expected_status
    assert response.headers["access-control-allow-methods"] == "GET"
    assert ALLOW_CREDENTIALS not in response.headers
