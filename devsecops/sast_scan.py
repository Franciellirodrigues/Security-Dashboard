import json
import requests

# 1. Simulação de vulnerabilidades encontradas no código
vulnerabilities_found = [
    {
        "id": "SEC-001",
        "title": "Hardcoded AWS Secret Key",
        "severity": "HIGH",
        "description": "Uma chave de acesso secreta da AWS foi encontrada exposta no arquivo deploy.js.",
        "path": "src/utils/deploy.js"
    },
    {
        "id": "SEC-002",
        "title": "SQL Injection Vulnerability",
        "severity": "HIGH",
        "description": "Concatenação direta de strings detectada na query de login de usuários.",
        "path": "backend/auth.py"
    },
    {
        "id": "SEC-003",
        "title": "Missing Security Headers",
        "severity": "MEDIUM",
        "description": "O middleware de segurança Helmet não foi configurado no servidor Express.",
        "path": "backend/main.py"
    }
]

def send_to_dashboard():
    url = "http://127.0.0.1:8000/api/vulnerabilities"
    headers = {"Content-Type": "application/json"}
    
    print("🚀 Iniciando análise de segurança da pasta 'devsecops'...")
    try:
        # Envia a lista completa de vulnerabilidades para o nosso backend em Python
        response = requests.post(url, json=vulnerabilities_found, headers=headers)
        if response.status_code == 200:
            print("✅ Relatório de vulnerabilidades enviado com sucesso para o Dashboard!")
        else:
            print(f"❌ Erro ao enviar dados. Status: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Erro de conexão: O seu backend (main.py) está rodando?")

if __name__ == "__main__":
    send_to_dashboard()