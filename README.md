# DA-Notes

DA-Notes ist eine Open-Source-Webanwendung zum effizienten Verwalten und Teilen digitaler Notizen. Das Projekt basiert auf einem klar getrennten Django-Backend und einem Angular-Frontend.

---

## Projektstruktur

```
DA-Notes/
│
├── backend/       # Django-Projekt
│   ├── manage.py
│   ├── requirements.txt
│   └── ... 
│
└── frontend/      # Angular-Projekt
    ├── src/
    └── ...
```

---

## Voraussetzungen

- Python ≥3.8
- Node.js (empfohlen: v16 oder neuer) und npm
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- Git

---

## Backend Setup (Django)

1. **In das Backend-Verzeichnis wechseln:**
    ```sh
    cd backend
    ```

2. **Neues virtuelles Environment anlegen und aktivieren:**
    - Mit `venv`:
        ```sh
        python -m venv venv
        source venv/bin/activate        # Mac/Linux
        venv\Scripts\activate           # Windows
        ```
    - Optional: Mit `pipenv`
        ```sh
        pipenv shell
        ```

3. **Abhängigkeiten installieren:**
    ```sh
    pip install -r requirements.txt
    ```

4. **Migrationen durchführen:**
    ```sh
    python manage.py migrate
    ```

5. **Superuser erstellen (optional, für Admin-Zugang):**
    ```sh
    python manage.py createsuperuser
    ```

6. **Lokalen Entwicklungsserver starten:**
    ```sh
    python manage.py runserver
    ```
    Das Backend läuft dann auf [http://localhost:8000](http://localhost:8000).

---

## Frontend Setup (Angular)

1. **In das Frontend-Verzeichnis wechseln:**
    ```sh
    cd ../frontend
    ```

2. **Abhängigkeiten installieren:**
    ```sh
    npm install
    ```

3. **Angular-Entwicklungsserver starten:**
    ```sh
    ng serve
    ```
    Die Anwendung ist erreichbar unter [http://localhost:4200](http://localhost:4200).

---

## Verbindung von Angular und Django

- Standardmäßig geht das Frontend davon aus, dass die API-Anfragen an `http://localhost:8000/api/v1/` (Django) gesendet werden.
- Sollte der API-Pfad abweichen, passe ihn in `frontend/src/app/api-services/note-list.service.ts` an.
- Wichtig: Im Backend `django-cors-headers` installieren, um Cross-Origin-Anfragen zu zulassen (sollte schon mit der requirements.txt installiert worden sein!):
    1. Installieren:
        ```sh
        pip install django-cors-headers
        ```
    2. In `backend/settings.py` eintragen:
        ```python
        INSTALLED_APPS = [
            ...
            'corsheaders',
        ]

        MIDDLEWARE = [
            'corsheaders.middleware.CorsMiddleware',
            ...
        ]

        CORS_ALLOWED_ORIGINS = [
            "http://localhost:4200",
        ]
        ```

---

## Produktion

- Für Deployments das Frontend mit `ng build --configuration production` bauen und die statischen Dateien mit Django oder über einen Webserver (z.B. nginx) ausliefern.
- Nicht vergessen: `.env` für Django konfigurieren, SECRET_KEY und Datenbankdaten setzen!  
- Details siehe [Django-Dokumentation](https://docs.djangoproject.com/de/4.2/howto/deployment/checklist/).

