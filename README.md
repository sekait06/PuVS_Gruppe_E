Parallele und Verteilte Systeme

Gruppe E (fakait01, sekait06, mascit43) - Frontend Preact JS 

# Todo Fullstack Application (PuVS)

Dieses Projekt ist eine einfache Fullstack-Todo-Anwendung im Rahmen des Moduls  
**Parallele und Verteilte Systeme (PuVS)**.

Das System besteht aus:
- einem **Spring-Boot-Backend** (REST API)
- einer **PostgreSQL-Datenbank** (über Docker)
- einem **Preact-Frontend** (Vite)

Frontend und Backend sind klar getrennt und kommunizieren über HTTP (REST, RMM Level 2).

---

## Architektur-Überblick

- **Backend:** Spring Boot + JPA + PostgreSQL  
  - stellt REST-Endpunkte für Todos bereit (`/todos`)
- **Frontend:** Preact + Vite  
  - konsumiert die REST-API
  - läuft unabhängig vom Backend
- **Datenbank:** PostgreSQL  
  - läuft in einem Docker-Container

---

## Voraussetzungen

>Bitte stelle sicher, dass folgende Software installiert ist:

- **Java JDK 21 (LTS)**
- **Docker Desktop** (inkl. Docker Compose)
- **Node.js** (empfohlen: aktuelle LTS-Version)
- **npm** (kommt mit Node.js)

---

## Projekt starten (Schritt für Schritt)

### 1. Docker starten
Docker Desktop muss **vor allen anderen Schritten** gestartet sein.



### Falls Docker Desktop installiert werden muss:
-> https://www.docker.com/products/docker-desktop/
- Installer starten
  1. WSL 2 Integration aktiviert lassen (sehr wichtig)
  2. Falls gefragt: Use WSL 2 instead of Hyper-V -> Ja
  3. Docker installiert evtl. automatisch WSL
  4. Rechner neu starten, wenn Docker das verlangt
 
### Überprüfen:
```bash
docker --version
```
### Ergebnis:
```text
Docker version 26.x.x, build ...
```
und
### Überprüfen:
```bash
docker compose version
```

### Ergebnis: 
```text
Docker Compose version v2.x.x
```
---
### 2. PostgreSQL starten
```bash
docker compose up -d
```
PostgreSQL Container starten (Test)
```bash
docker run -d --name postgres-puvs `
  -e POSTGRES_PASSWORD=mysecretpassword `
  -p 5432:5432 `
  postgres:16
```
- Danach überprüfen:
```bash
docker ps
```
- Man sollte postgres in der Liste sehen

---
### 3. Backend starten
```powershell
.\mvnw.cmd spring-boot:run
```
- läuft auf http://localhost:8080

---

### 4. Frontend starten (Preact)
```bash
npm install
npm run dev
```
- läuft auf http://localhost:5173

---

### Wichtig bei Fehler oder ähnlichem

- Hinweis bei Problemen im Browser
  1. Falls das Frontend im normalen Browserfenster nicht korrekt lädt: **Inkognito-/Privat-Tab verwenden**
 
- Alternativ im Browser:
  1. DevTools öffnen (F12)
  2. Tab Network
  3. Option Disable cache aktivieren
  4. Seite neu laden
