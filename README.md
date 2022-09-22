# Backend and Frontend connected via NGINX

This is a boilerplate development project which connects some backend application to some frontend. To swap
out either you would only need to make sure the ports are still connected correctly, those can 
be modified in the NGINX conf or the Dockerfiles and docker-compose.

The backend is connected to the postgres database created in the `docker-compose.yml`.

## Getting started

Start by creating a clean python environment. I use pyenv:

    pyenv virtualenv 3.10.6 assignment-env-3.10.6
    pyenv activate assignment-env-3.10.6

We need docker-compose installed so install the requirements from the base directory:

    pip install -r requirements.txt

This is just to run docker. The other dependencies are contained in their respective directories.

## Running the app

The app is managed using `docker-compose` and therefor you can start the application using 

    docker-compose up

If you need to rebuild the project you can use

    docker-compose up --build

To use the backend you will need to migrate and create a superuser.

    docker-compose run -u root --rm backend bash -c "python manage.py migrate"

    docker-compose run -u root --rm backend bash -c "python manage.py createsuperuser"


## Testing

To run the backend test with coverage, use the following command(s). This would normally be 
run with a CI pipeline.

### Backend

    docker-compose run -u root --rm backend bash -c "coverage run -m pytest && coverage report -m"
    docker-compose run -u root --rm backend bash -c "flake8"

### Frontend

    docker-compose run -u root --rm frontend bash -c "yarn test:coverage"
    docker-compose run -u root --rm frontend bash -c "yarn lint"

