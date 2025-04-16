from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_sales_reps():
    response = client.get("/api/sales-reps")
    assert response.status_code == 200
    assert "data" in response.json()
    assert "total_sales" in response.json()

def test_get_sales_reps_sorted_desc():
    response = client.get("/api/sales-reps?sort=desc")
    assert response.status_code == 200
    assert "data" in response.json()

def test_get_sales_rep_detail():
    response = client.get("/api/sales-reps/1")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)

def test_get_deals():
    response = client.get("/api/deals")
    assert response.status_code == 200
    assert "data" in response.json()
    assert "summary" in response.json()

def test_get_deals_detail():
    response = client.get("/api/deals/1")
    assert response.status_code == 200

def test_get_clients_detail():
    response = client.get("/api/clients/1")
    assert response.status_code == 200

def test_regional_deals():
    response = client.get("/api/regional-deals")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_top_clients():
    response = client.get("/api/top-clients")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_ai_endpoint_hello():
    payload = {"question": "hello"}
    response = client.post("/api/ai", json=payload)
    assert response.status_code == 200
    assert "answer" in response.json()
