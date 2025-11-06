# DA-Notes

DA-Notes is an open-source web application for efficiently managing and sharing digital notes. The project is based on a clearly separated Django backend and an Angular frontend.

---

## Project Structure

```
DA-Notes/
│
├── backend/       # Django project
│   ├── manage.py
│   ├── requirements.txt
│   └── ... 
│
└── frontend/      # Angular project
    ├── src/
    └── ...
```

---

## Prerequisites

- Python ≥3.8
- Node.js (recommended: v16 or newer) and npm
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- Git

---

## Backend Setup (Django)

1. **Switch to the backend directory:**
    ```sh
    cd backend
    ```

2. **Create and activate a new virtual environment:**
    - With `venv`:
        ```sh
        python -m venv venv
        source venv/bin/activate        # Mac/Linux
        venv\Scripts\activate           # Windows
        ```
    - Optional: With `pipenv`
        ```sh
        pipenv shell
        ```

3. **Install dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

4. **Apply migrations:**
    ```sh
    python manage.py migrate
    ```

5. **Create a superuser (optional, for admin access):**
    ```sh
    python manage.py createsuperuser
    ```

6. **Start the local development server:**
    ```sh
    python manage.py runserver
    ```
    The backend will then be running at [http://localhost:8000](http://localhost:8000).

---

## Frontend Setup (Angular)

1. **Switch to the frontend directory:**
    ```sh
    cd ../frontend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the Angular development server:**
    ```sh
    ng serve
    ```
    The application can be accessed at [http://localhost:4200](http://localhost:4200).

---

## Connecting Angular and Django

- By default, the frontend assumes that API requests are sent to `http://localhost:8000/api/v1/` (Django).
- If the API path differs, adjust it in `frontend/src/app/api-services/note-list.service.ts`.
- Important: Make sure to install `django-cors-headers` in the backend to allow cross-origin requests (should already be included via requirements.txt!):
    1. Install:
        ```sh
        pip install django-cors-headers
        ```
    2. Add to `backend/settings.py`:
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

## Production

- For deployments, build the frontend with `ng build --configuration production` and serve the static files with Django or via a web server (e.g. nginx).
- Don’t forget: configure the `.env` file for Django, set the SECRET_KEY and database credentials!  
- For more details see the [Django documentation](https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/).
