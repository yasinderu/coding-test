from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import random

from utils.helpers import filter_data

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load dummy data
with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

@app.get("/api/sales-reps")
def get_sales_reps(sort: str = None):
    data = DUMMY_DATA["salesReps"]
    for salesPerson in data:
        salesPerson["total_deals"] = sum(item["value"] for item in salesPerson["deals"] if item["status"] != "Closed Lost")
    total_sales = sum(item["total_deals"] for item in data)
    if sort == "asc" or sort == "desc":
        data = sorted(data, key=lambda x: x["total_deals"], reverse=True if sort == "desc" else False)
    return {"data": data, "total_sales": total_sales}

@app.get("/api/sales-reps/{id}")
def get_sales_reps_detail(id: int):
    res = filter_data("id", DUMMY_DATA["salesReps"], id)
    return res if res else {"message": "Data not found."}

@app.get("/api/deals")
def get_deals(sort: str = None):
    data = []
    summary = {
        "Closed Won": 0,
        "In Progress": 0,
        "Closed Lost": 0
    }
    for item in DUMMY_DATA["salesReps"]:
        for deals in item["deals"]:
            data.append(deals)
            summary[deals["status"]] += 1
    if sort == "asc" or sort == "desc":
        data = sorted(data, key=lambda x: x["value"], reverse=True if sort == "desc" else False)
    return {"data": data, "summary": {
        "closed_won": summary["Closed Won"],
        "in_progress": summary["In Progress"],
        "closed_lost": summary["Closed Lost"]
    }}

@app.get("/api/regional-deals")
def regional_deals():
    regional_deals = {}
    data = []

    for item in DUMMY_DATA["salesReps"]:
        region = item["region"]
        total_deals = sum(deal["value"] for deal in item["deals"] if deal["status"] == "Closed Won")
        regional_deals[region] = total_deals
    for key in regional_deals:
        data.append({
            "region": key,
            "value": regional_deals[key]
        })
    return data

@app.get("/api/top-clients")
def get_top_clients(sort: str = None):
    data = []
    for item in DUMMY_DATA["salesReps"]:
        for deals in item["deals"]:
            if deals["status"] == "Closed Won":
                data.append(deals)
    if sort == "asc" or sort == "desc":
        data = sorted(data, key=lambda x: x["value"], reverse=True if sort == "desc" else False)
    return data
    
@app.get("/api/deals/{salesRepsId}")
def get_deals_detail(salesRepsId: int):
    res = filter_data("id", DUMMY_DATA["salesReps"], salesRepsId)
    return res["deals"] if res else {"message": "Data not found."}
    
@app.get("/api/clients/{salesRepsId}")
def get_client_detail(salesRepsId: int):
    res = filter_data("id", DUMMY_DATA["salesReps"], salesRepsId)
    return res["clients"] if res else {"message": "Data not found."}

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    """
    Accepts a user question and returns a placeholder AI response.
    (Optionally integrate a real AI model or external service here.)
    """
    body = await request.json()
    response = {
        "hello": ["Hi, how are you doing?", "Hello :)", "Hi There!", "Hello, how can i help?"],
        "how are you": ["Never better!", "I'm doing well!", "I'm in perfect condition!", "Great!"],
        "tell me about sales": ["sales is the process of exchanging a product or service for money or another valuable asset", "A transaction that includes an exchange of services or goods for a certain amount of money is known as a sale."],
        "bye": ["See you later!", "Bye bye!", "Sayonara!"]
    }

    user_question = body.get("question", "").strip().lower()

    if user_question in response:
        return {"answer": random.choice(response[user_question])}
    else:
        return {"answer": "Good day! what a lovely day!"}
    
    # Placeholder logic: echo the question or generate a simple response
    # Replace with real AI logic as desired (e.g., call to an LLM).
    # return {"answer": f"This is a placeholder answer to your question: {user_question}"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
