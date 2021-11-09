# Project Setup

## Table of Contents

- [Project Setup](#project-setup)
  - [Table of Contents](#table-of-contents)
    - [Local Development](#local-development)
      - [Run project locally](#run-project-locally)
      - [After installing packages](#after-installing-packages)
        - [For Linux](#for-linux)
        - [For Windows](#for-windows)
      - [Install Requirements](#install-requirements)
      - [Run server](#run-server)
      - [To create new django app](#to-create-new-django-app)
    - [Production Development](#production-development)
    - [Committing changes](#committing-changes)
    - [Contribution](#contribution)

### Local Development

1. Install pre-commit in your global environment

        pip install pre-commit

2. Install the git hook scripts

- [x] cd into *backend* folder
- [ ] `pre-commit install`

#### Run project locally

- Ensure you have yarn installed if not use npm to install, to check run

        yarn --version

- To install yarn with npm run

        npm install --global yarn

- Goto *frontend/main* directory and run command

        yarn

        yarn relocate_main

- Goto *frontend/root* directory and run command

        yarn

        yarn relocate_root

#### After installing packages


#### Install Requirements

- Goto *backend / channel_plugin* directory (where you can see manage.py file) ensure virtual environment is activated and run command

        pip install -r requirements/local.txt

- To create virtual environment

        python venv -m venv

- To activate virtual environment

        source venv/bin/activate

#### Run server

- Run server (where you can see manage.py file) run command

        python manage.py runserver

#### To create new django app

- [x] Make sure you're in the folder that has manage.py file
- [ ] cd into apps folder
- [ ] run `django-admin startapp <name-of-app>`

### Production Development

- Goto *frontend* directory and run command

        yarn
        yarn relocate

- Goto *backend / channel_plugin* directory (where you can see manage.py file) ensure virtual environment is activated and run command

        pip install -r requirements/production.txt
        python3 manage.py collectstatic --noinput
        pkill gunicorn
        gunicorn --bind 0.0.0.0:9000 config.wsgi --daemon

### Committing changes

- Whenever you commit there are some hooks that will be triggered to check for linting issues
- When you commit pre-commit will try to fix linting issues automatically, if it fails it's up to you to fix the problems
- If any issue is found it won't allow you to commit unless you fix it
- Always run `git add .` after fixing an issue, then try commiting again
  - if not still working, especially due to flake8 (the last commit check), run `pre-commit uninstall` in the *backend* folder then try again

### Contribution

For making contributing please check [here](CONTRIBUTING.md)
