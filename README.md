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

Bitte stelle sicher, dass folgende Software installiert ist:

- **Java JDK 21 (LTS)**
- **Docker Desktop** (inkl. Docker Compose)
- **Node.js** (empfohlen: aktuelle LTS-Version)
- **npm** (kommt mit Node.js)

---

## Projekt starten (Schritt für Schritt)

### 1. Docker starten
Docker Desktop muss **vor allen anderen Schritten** gestartet sein.

Überprüfen:
```bash
docker --version
```
### 2. PostgreSQL starten
```bash
docker compose up -d
```
### 3. Backend starten
```powershell
.\mvnw.cmd spring-boot:run
```
- läuft auf http://localhost:8080

### 4. Frontend starten (Preact)
```bash
npm install
npm run dev
```
- läuft auf http://localhost:5173

### Wichtig bei Fehler oder ähnlichem

1. Hinweis bei Problemen im Browser
 - Falls das Frontend im normalen Browserfenster nicht korrekt lädt: Inkognito-/Privat-Tab verwenden
 
2. Alternativ im Browser:
 - DevTools öffnen (F12)
 - Tab Network
 - Option Disable cache aktivieren
 - Seite neu laden
