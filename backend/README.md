# Project Setup

## Table of Contents

- [Project Setup](#project-setup)
  - [Table of Contents](#table-of-contents)
  - [Local Development](#run-project-locally)
        - [Install requirements](#install-requirements)
        - [Run Server](#run-server)
        - [Create app](#to-create-new-django-app)
  - [Production Setup](#production-setup)

### Local Development

1. Clone project repo
2. Install pre-commit in your global environment

        pip install pre-commit

5. Install the git hook scripts

- [x] cd into *backend* folder
- [ ] `pre-commit install`

## Run project locally

- Ensure you have yarn installed if not use npm to install, to check run

        yarn --version

- To install yarn with npm run

        npm install --global yarn

- Goto frontend directory and run command

        yarn

## After installing packages

## Linux

        yarn relocate

## Windows

        yarn build

- move the build folder generated to *backend / channel_plugin / channel_plugin* directory

## Install Requirements

- Goto *backend / channel_plugin* directory (where you can see manage.py file) ensure virtual environment is activated and run command

        pip install -r requirements/local.txt

## Run server

- Run server (where you can see manage.py file) run command

        python manage.py runserver

## To create new django app in Linux environment

- [x] Make sure you're in the folder that has manage.py file
- [ ] cd into apps folder
- [ ] run `python ../manage.py startapp <name-of-app>`
- [ ] goto *config / settings* folder in base.py file add `apps.<name-of-app>`
to *INSTALLED_APPS*

## To create new django app in Windows environment

- [x] Goto apps folder
- [ ] create a folder with `<name-of-app>`
- [ ] go back to folder where you have manage.py file
- [ ] run `python manage.py startapp apps/<name-of-app>`
- [ ] goto *config / settings* folder in base.py file add `apps.<name-of-app>`
to *INSTALLED_APPS*

### Committing changes

- Whenever you commit there are some hooks that will be triggered to check for linting issues
- When you commit pre-commit will try to fix linting issues automatically, if it fails it's up to you to fix the problems
- If any issue is found it won't allow you to commit unless you fix it
