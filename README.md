# Readme

## Getting started

Start by creating a clean python environment. I use pyenv:

    pyenv virtualenv 3.9.4 docker-compose-fastapi-react-nginx-3.9.4
    pyenv activate docker-compose-fastapi-react-nginx-3.9.4

We need docker-compose installed so install the requirements from the base directory:

    pip install -r requirements.txt

This is just to run docker. The other dependencies are contained in their respective directories.

## Running the app

The app is managed using `docker-compose` and therefor you can start the application using 

    docker-compose up

    docker-compose run -u root --rm backend bash -c "python manage.py migrate"

    docker-compose run -u root --rm backend bash -c "python manage.py createsuperuser"

    docker-compose run -u root --rm backend bash -c "python manage.py show_urls"


## Testing

To run the backend test with coverage, use the following command(s). This would normally be 
run with a CI pipeline.

    docker-compose run -u root --rm backend bash -c "coverage run -m pytest && coverage report -m"
    docker-compose run -u root --rm backend bash -c "flake8"

# Backend 

You can test the urls with curl

    curl -X POST -H "Content-Type: application/json" \ 
    -d '{"email": "davidattenborough", "password": "boatymcboatface"}' \
    http://0.0.0.0:8000/api/token/

