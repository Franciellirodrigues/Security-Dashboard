# 🛡️ DevSecOps Guard - Automated Vulnerability Dashboard

<div align="center">

[![DevSecOps CI/CD Pipeline](https://github.com/Franciellirodrigues/Security-Dashboard/actions/workflows/devsecops.yml/badge.svg)](https://github.com/SEU_USUARIO/Security-Dashboard/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a23a841a-539e-461a-8c4b-772da600b6da/deploy-status)](https://securitydashboard-devsecops.netlify.netlify.app)

**An interactive end-to-end ecosystem that simulates a continuous security pipeline (SAST), ingests vulnerability data via an asynchronous API, and maps hazards onto a dynamic live dashboard.**

[🔗 Explore the Live Dashboard](https://securitydashboard-devsecops.netlify.app)

</div>

---

## 🏗️ Ecosystem Architecture

This project demonstrates an active **Shift-Left Security** approach, broken down into three decoupled components:

* **Frontend (Security Dashboard):** A single-page application built using **React** and **Vite**, fully styled with **Tailwind CSS v4**. It features reactive metrics counters, active compliance status updates, and a triage table for threat intelligence.
* **Backend (Ingestion Engine):** A robust async API built with **Python** and **FastAPI**. It handles continuous streaming of security telemetry through dedicated ingestion (`POST`) and data delivery (`GET`) endpoints.
* **DevSecOps Pipeline (Automation):** Managed entirely by **GitHub Actions**. It provisions a virtual runner, resolves pipeline environments, and tests code integrity automatically upon code changes.

---

## 🛠️ Technologies & Tools

<div align="left">

* **Frontend Engine:** <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="25" alt="React" /> **React** | 
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" height="25" alt="Vite" /> **Vite** | 
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" height="25" alt="Tailwind" /> **Tailwind CSS v4**
* **Backend & Ingestion:** <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height="25" alt="Python" /> **Python 3.10+** | 
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" height="25" alt="FastAPI" /> **FastAPI**
* **Automation & Hosting:** <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="25" alt="GitHub Actions" /> **GitHub Actions** | 
    <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white" height="20" alt="Netlify" /> **Netlify** | 
    <img src="https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white" height="20" alt="Render" /> **Render**

</div>

---

## 🚀 How to Run the Infrastructure Locally

### Prerequisites
* [Node.js (v18+)](https://nodejs.org/)
* [Python (3.10+)](https://www.python.org/)

### 1. Initialize the Environment
Clone the repository and jump into the root directory:
```bash
git clone [https://github.com/SEU_USUARIO_DO_GITHUB/Security-Dashboard.git](https://github.com/SEU_USUARIO_DO_GITHUB/Security-Dashboard.git)
cd Security-Dashboard
```
### 2. Boot Up the Backend API (Python)
Open a new terminal session, navigate to the `backend` workspace, activate your virtual environment, and launch the Uvicorn server:
```bash
cd backend
python -m venv .venv

# Activate the Virtual Environment
# Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# Linux/macOS:
source .venv/bin/activate

# Install core dependencies and launch the engine
pip install -r requirements.txt
uvicorn main:app --reload
```
Local Endpoint: Your local core API will start listening at http://127.0.0.1:8000
Local API Verification: You can verify it is running by opening http://127.0.0.1:8000/api/vulnerabilities directly in your browser. It should return an empty JSON array [] if no scans have been received yet.

### 3. Launch the Frontend UI (React)
Open a second separate terminal session, navigate to the frontend workspace, initialize dependencies, and trigger the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
Local Web URL: Access the interactive user interface by navigating to http://localhost:5173/

### 4. Fire Up the DevSecOps Scan
To trigger the mock static analysis scan (SAST) and send threat logs straight to your active board, open a third terminal session:
```bash
cd devsecops
pip install requests
python sast_scan.py
```
Telemetry Verification: Once the terminal outputs ✅ Relatório de vulnerabilidades enviado com sucesso..., refresh your local browser window (http://localhost:5173/) to witness the security telemetry update metrics live!

### ☁️ Cloud Infrastructure Deployment
This project operates live under a fully hosted cloud structure:

* Production UI: Optimized static hosting delivered via Netlify at securitydashboard-devsecops.netlify.app<br>
* Production API Engine: Hosted dynamically on Render at security-dashboard-vab7.onrender.com/api/vulnerabilities<br>
* CI/CD Orchestration: Handled via .github/workflows/devsecops.yml. Every code adjustment automatically prompts GitHub's server to process the code scanning script against our live remote database.<br>
* Developed for proof-of-concept validation in Application Security (AppSec) and Defensive Software Engineering. 🛡️
