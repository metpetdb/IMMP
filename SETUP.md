Installing IMMP
==============

These instructions are written for a local Ubuntu deployment (or Vagrant installation), specifically 16.04 and earlier. Specific instructions for web deployment (mostly Apache stuff) can be found in Apache.md [coming soon]

####Clone repo and change directories into the repo

    $ git clone git@github.com:metpetdb/IMMP
    $ cd IMMP/

####Python, Pip, Postgres, and Psycopg2 installation

    $ sudo apt-get install python python-dev python-pip python-psycopg2 libpq-dev

####Virtualenv installation

Virtual environments allow for sets of python packages to operate independently, assuring that the state of your system and the state of the project do not interfere with each other. To install VirtualEnv, issue the following pip command

    $ pip install virtualenv

Upon initial setup, a new virtualenvironment will need to be generated with the following command.

( Note: If using Vagrant (specifically on Windows), the flag `--always-copy` may be needed )
    
    $ virtualenv venv

This should create the directory `venv/` in the IMMP folder, and within it `venv/bin/activate`. 

To activate the virtual environment:

    $ source venv/bin/activate

To deactivate the virtual environment

    $ deactivate


####Flask and SQLAlchemy installation

First, Postgres must be installed
    
    $ sudo apt-get install postgresql

You can install these at root level with `sudo pip`, but it is recommended you install them within the virtual environment

    $ pip install Flask Flask-SQLAlchemy psycopg2

####PostgreSQL configuration

    $ sudo su - postgres
    (postgres) $ psql
    postgres-# CREATE DATABASE immp;
    postgres-# ALTER ROLE "postgres" PASSWORD 'test';
    postgres-# \q
    (postgres) $ exit

####Initialize database if not connecting to existing database

    $ python
    >>> from main import db
    >>> db.create_all()
    >>> exit()

####Run the app and see if it works!

    $ python main.py

Go to localhost:5000 to see the local deployment in your browser
