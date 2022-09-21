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


## Testing

To run the backend test with coverage, use the following command(s). This would normally be 
run with a CI pipeline.

    docker-compose run -u root --rm backend bash -c "coverage run -m pytest && coverage report -m"
    docker-compose run -u root --rm backend bash -c "flake8"

## Assumptions and Things to note

This is by no means a perfect implementation. The number of models are being kept as lean 
as possible to achieve the required minimum outcomes. In a normal scenario there would be a 
lot more supporting information captured along with the current information.

No attempt is being made to secure the endpoints, it is assumed these are private 
behind some sort of authentication as would normally be the case.

Not all field and form validation are being considered for lack of exact specs like for example 
the integer range which could be provided to XP rewards.
