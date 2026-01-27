`Parallele und Verteilte Systeme`

Gruppe E (fakait01, sekait06, mascit43) - Frontend Preact JS 

# Todo Fullstack Application (PuVS)

Dieses Projekt ist eine einfache Fullstack-Todo-Anwendung im Rahmen des Moduls  
**Parallele und Verteilte Systeme (PuVS)**.

Das System besteht aus:
- einem **Spring-Boot-Backend** (REST API)
- einer **PostgreSQL-Datenbank**
- einem **Preact-Frontend** (Vite)
- einer **Containerisierung & Orchestrierung über Docker und Kubernetes**

Frontend und Backend sind klar getrennt und kommunizieren über HTTP (REST, RMM Level 2).

---

## Architektur-Überblick

- **Backend:** Spring Boot + JPA + PostgreSQL  
  - stellt REST-Endpunkte für Todos bereit (`/todos`)
- **Frontend:** Preact + Vite  
  - konsumiert die REST-API
  - läuft unabhängig vom Backend
- **Datenbank:** PostgreSQL  
- **Kubernetes:**
  - orchestriert Frontend, Backend und Datenbank
  - übernimmt Service Discovery und Restart bei Fehlern   

---

## Voraussetzungen

>Bitte stelle sicher, dass folgende Software installiert ist:

- **Java JDK 21 (LTS)**
- **Docker Desktop** (inkl. aktiviertem Kubernetes)
- **Node.js** (empfohlen: aktuelle LTS-Version)
- **npm**
- **kubectl** (wird von Docker Desktop mitgeliefert)

---

## Erstinstallation (einmalig)

Dieser Abschnitt muss **nur einmal** durchgeführt werden.

---
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

> [!NOTE]
> Da wir nun **Kubernetes** eingebaut haben, benutzen wir Docker Compose nicht mehr, da es für Kubernetes **nicht relevant** ist.

---
## 1. Docker Desktop & Kubernetes starten

- Docker Desktop öffnen
- In den Einstellungen auf den Tab **Kubernetes** wechseln. Dort sicherstellen:
    - **Kubernetes ist aktiviert** (Slider aktivieren)
    - **Apply & Restart** -> Beim ersten Mal kann es ein wenig dauern

> [!IMPORTANT]
> Sollte das "Starting / Pulling images" ungewöhnlich lange dauern, könnte es helfen, Docker Desktop einmal **komplett zu beenden** (auch aus dem Tray entfernen) und dann die Schritte im Kubernetes-Tab zu wiederholen

Wenn der Vorgang im Kubernetes-Tab **erfolgreich** abgeschlossen und nun **aktiviert** ist, kann zur Überprüfung in PowerShell folgendes eingegeben werden:

### Überprüfen:
```bash
dir $HOME
dir $HOME\.kube
kubectl config get-contexts
kubectl get nodes
```

Sollte alles richtig sein, sollte nach Eingabe des Befehls 
```bash 
kubectl get nodes
```
folgender Context angezeigt werden:

### Ergebnis:
```text
docker-desktop    Ready
```

---
## 2. Backend-JAR bauen

```bash
cd starterapp
.\mvnw.cmd clean package -DskipTests
```

### Ergebnis:
Im Ordner `starterapp/target` muss eine `.jar`-Datei vorhanden sein

---
## 3. Docker Images bauen

Im Projekt-Root müssen einmal folgende Befehle in PowerShell ausgeführt werden:

```bash
docker build -t todo-backend:latest -f starterapp/Dockerfile starterapp
docker build -t todo-frontend:latest -f frontend/Dockerfile frontend
```

---
## 4. Kubernetes Ressourcen deployen

Mit dem Anwenden der Kubernetes-Manifeste wird auch die PostgreSQL-Datenbank als StatefulSet automatisch gestartet.

Die YAML-Dateien müssen **einmalig** angewendet werden:

```bash
kubectl apply -f k8s/00-namespace.yaml
kubectl apply -f k8s/01-postgres.yaml
kubectl apply -f k8s/02-backend.yaml
kubectl apply -f k8s/03-frontend.yaml
```

Der Status kann überprüft werden:

### Überprüfung:
```bash
kubectl get pods -n todo-app
```

### Ergebnis:
Alle Pods sollten nach kurzer Zeit **Running** sein.

---
## 5. Anwendung öffnen

```bash
kubectl port-forward -n todo-app svc/frontend 5173:80
```

Im Browser sollte nun folgendes aktiv sein:
```text
http://localhost:5173
```

---

## Normaler Betrieb der Anwendung (Starten & Stoppen)

Nach der Erstinstallation sind **keine neuen Builds oder Deployments nötig**, solange sich der Code nicht ändert.

---
## Anwendung starten

- Docker Desktop öffnen und warten bis Kubernetes **Running** ist
- Pods starten (falls sie gestoppt sind):
    ```bash
    kubectl scale statefulset postgres --replicas=1 -n todo-app
    kubectl scale deployment backend --replicas=1 -n todo-app
    kubectl scale deployment frontend --replicas=1 -n todo-app
    ```

    Status überprüfen:
    ```bash
    kubectl get pods -n todo-app
    ```
- Frontend verfügbar machen:
    ```bash
    kubectl port-forward -n todo-app svc/frontend 5173:80
    ```

    Im Browser:
    ```text
    http://localhost:5173
    ```

---
## Anwendung stoppen (ohne Löschen)

- Im Terminal mit `kubectl port-forward` den Zugriff beenden durch **Strg + C**
- Pods anhalten (empfohlen):
    ```bash
    kubectl scale deployment frontend --replicas=0 -n todo-app
    kubectl scale deployment backend --replicas=0 -n todo-app
    kubectl scale statefulset postgres --replicas=0 -n todo-app
    ```

    -> Es wird nichts gelöscht - Die YAML-Dateien, Namespace und Daten bleiben erhalten.
- Optional: Docker Desktop **komplett beenden** (**Tray -> Quit**)

---

### Wichtig bei Fehler oder ähnlichem

- Hinweis bei Problemen im Browser
  1. Falls das Frontend im normalen Browserfenster nicht korrekt lädt: **Inkognito-/Privat-Tab verwenden**
 
- Alternativ im Browser:
  1. DevTools öffnen (F12)
  2. Tab Network
  3. Option Disable cache aktivieren
  4. Seite neu laden

---
# Warum Kubernetes?

Im Rahmen des Moduls *Parallele und Verteilte Systeme* wird der Einsatz von Mechanismen zur Koordination, Orchestrierung und Verwaltung verteilter Komponenten behandelt.

In diesem Projekt wird **Kubernetes** eingesetzt, um die einzelnen Teile des Systems – Frontend, Backend und Datenbank – als **verteilte Services** zu betreiben und zu orchestrieren.

Der Einsatz von Kubernetes bietet dabei folgende Vorteile:

- **Service-Orchestrierung:**  
  Kubernetes verwaltet mehrere voneinander unabhängige Services und sorgt für deren Start, Überwachung und Neustart im Fehlerfall.

- **Lose Kopplung der Komponenten:**  
  Frontend, Backend und Datenbank laufen in separaten Containern und kommunizieren ausschließlich über klar definierte Schnittstellen (REST). Dadurch sind die Komponenten unabhängig voneinander austauschbar.

- **Service Discovery & Netzwerkabstraktion:**  
  Die Kommunikation zwischen den Services erfolgt über Kubernetes Services und DNS-Namen anstelle von festen IP-Adressen oder Ports.

- **Reproduzierbarkeit & Portabilität:**  
  Durch deklarative YAML-Manifeste kann das gesamte System reproduzierbar auf unterschiedlichen Systemen gestartet werden, ohne manuelle Konfiguration einzelner Komponenten.

- **Bezug zu verteilten Systemen:**  
  Das Projekt zeigt typische Eigenschaften verteilter Systeme wie Parallelität, Isolation, Ausfallsicherheit und klar definierte Kommunikationsprotokolle.

Damit stellt Kubernetes eine praxisnahe Umsetzung der im Modul behandelten Konzepte dar und ermöglicht es, ein reales verteiltes System lokal zu betreiben und zu analysieren.
