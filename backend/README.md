# Project Setup

## Table of Contents

- [Project Setup](#project-setup)
  - [Table of Contents](#table-of-contents)
  - [Local Development](#local-development)
    - [Run project locally with docker](#run-project-locally-with-docker)
    - [Committing changes](#committing-changes)
  - [Production Setup](#production-setup)

## Local Development

1. Clone project repo
2. Install docker and docker-compose
3. Add docker to sudo group to use docker without sudo
4. Install pre-commit in your global environment

        pip install pre-commit

5. Install the git hook scripts

        cd <project_directory>
        pre-commit install

### Run project locally with docker

- Start the server

        docker-compose -f local.yml up --build

- Run commands inside the container

        docker-compose -f local.yml run --rm django <command>
    EX:

        - docker-compose -f local.yml run --rm django python manage.py makemigrations # To create the migration files
        - docker-compose -f local.yml run --rm django python manage.py migrate # To migrate the database
        - docker-compose -f local.yml run --rm django python manage.py createsuperuser # To create super user
        - docker-compose -f local.yml run --rm django pytest # For testing

- Run tests

        docker-compose -f local.yml run --rm django pytest
        docker-compose -f local.yml run --rm django pytest hio/users/tests/ # To run tests in this folder only

### Committing changes

- Whenever you commit there are some hooks that will be triggered to check for linting issues
- When you commit pre-commit will try to fix linting issues automatically, if it fails it's up to you to fix the problems
- If any issue is found it won't allow you to commit unless you fix it

## Production Setup

- ssh into the server
- cd to project directory
- Make sure you have all environment variables defined in ```./envs/.production/.django``` and ```./envs/.production/.postgres```
- Make sure you can run docker without sudo
- Make sure you have docker-compose installed
- Run

        ./deploy.sh
