# Django Rest Framework Backend with Authentication

## Index

- [About](#about)
- [Built using](#built-using)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing dependencies](#installing-dependencies-locally)
- [Project setup](#project-setup)
  - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
  - [Lints and fixes files](#linting-files)
  - [Run your unit tests](#run-unit-tests-locally)
  - [List the available urls](#list-the-API-urls)
  - [Test the urls](#test-the-API-urls)
- [Navigate](#navigate)

## About

This repository was created to assist in the authentication implementation process in 
 **Django applications with JWT and refresh tokens**. All API endpoints 
have **unit tests**.

Feel free to use it as a template and make any changes you deem necessary.

## Built using

- [Django](https://www.djangoproject.com/): The Web Framework
- [Python](https://www.python.org/): Python Language.
- [Pytest](https://docs.pytest.org/en/7.1.x/): Python Testing Framework
- [Django Rest Framework](https://testing-library.com): API Framework

## Getting started

### Prerequisites

You need to install [Python](https://www.python.org/) on your machine. Preferably 
using a python version control package like [pyenv](https://github.com/pyenv/pyenv).

### Installing dependencies locally

```bash
pip install -r requirements.txt
```

## Project setup

### Compiles and hot-reloads for development

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Linting files
```bash
# show errors
flake8
```

### Run unit tests locally

In order to run tests locally you need to have [Postgres](https://www.postgresql.org/) installed locally and 
have a database configured for testing purposes. 

In order to create a local postgres Database you can follow this [DigitalOcean guide](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-14-04).
And remember to grant the db user create privileges so that it can create the test database 
`ALTER USER username CREATEDB;` using `psql`.

With a postgres database created you would need to create a local pytest.ini file and local settings 
which override your database settings.

```python
# settings_local.py

# noinspection PyUnresolvedReferences
from .settings import *  # noqa

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': '<DB_NAME>',
        'USER': '<DB_USER>',
        'PASSWORD': '<DB_PASSWORD>',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```


```ini
# pytest_local.ini
[pytest]
DJANGO_SETTINGS_MODULE=backend.settings_local
python_files = tests.py test_*.py
```

```bash
# run tests
pytest -c pytest_local.ini
coverage run -m pytest -c pytest_local.ini && coverage report -m
```

### List the API urls 

```bash
python manage.py show_urls
```


### Test the API urls 

You can test the urls with curl

```bash
    curl -X POST -H "Content-Type: application/json" \ 
    -d '{"email": "davidattenborough", "password": "boatymcboatface"}' \
    http://0.0.0.0:8000/api/token/
```

## Navigate

To interact with the Django Admin you can navigate 
to [http://0.0.0.0:8000/admin/](http://0.0.0.0:8000/admin/).