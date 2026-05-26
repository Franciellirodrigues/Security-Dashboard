from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Permite que a (porta 5173) consulte a API sem erros de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Banco de dados temporário em memória
db_vulnerabilities = []

class Vulnerability(BaseModel):
    id: str
    title: str
    severity: str
    description: str
    path: str

@app.get("/api/vulnerabilities")
def get_vulnerabilities():
    return db_vulnerabilities

@app.post("/api/vulnerabilities")
def save_vulnerabilities(vulnerabilities: List[Vulnerability]):
    global db_vulnerabilities
    db_vulnerabilities = [v.model_dump() for v in vulnerabilities]
    return {"status": "success", "count": len(db_vulnerabilities)}