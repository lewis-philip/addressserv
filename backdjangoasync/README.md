# Backend - Django async

## Python virtual environment (venv)

```bash
cd backdjangoasync
python3 -m venv venv
source venv/bin/activate
python3 -m pip install --upgrade pip
pip install -r requirements.txt
```


## Settings (settings.py, .env)

1. Database settings (sqlite3 vs. PostgreSQL vs. ...)
2. Email settings (filebased.EmailBackend vs. smtp.EmailBackend)


## Database

After database migration and superuser creation, create the following user groups: "customer", "operator", "finance", "admin" (do not add Django predefined permissions to these groups)

```bash
python3 manage.py migrate
python3 manage.py createsuperuser
```


## Run dev server [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

```bash
python3 -m uvicorn projmain.asgi:application --reload
```

