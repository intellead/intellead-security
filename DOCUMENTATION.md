# Welcome to Intellead Security documentation!

Intellead Secutiry aims to be an easy way to authenticate users for Intellead project.

## Contents
  * Introduction
  * Instalation
    * Config vars
    * Get a copy
  
## Introduction
Intellead Security aims to receive the data at request path and return information about the customer that is doing the request.

## Instalation

#### Config vars
The application uses a postgres database to store the dataset.  
For this it is necessary to configure the connection variables.  
You must config the following vars:
  * JDBC_DATABASE_URL - Full URL to intellead-security-postgres (`jdbc:postgresql://<host>:<port>/<database>`);
  * JDBC_DATABASE_USERNAME - Database username;
  * JDBC_DATABASE_PASSWORD - Database password.

#### Get a copy
I like to encourage you to contribute to the repository.
This should be as easy as possible for you but there are few things to consider when contributing. The following guidelines for contribution should be followed if you want to submit a pull request.
  * You need a GitHub account.
  * Submit an issue ticket for your issue if there is no one yet.
  * If you are able and want to fix this, fork the repository on GitHub.
  * Make commits of logical units and describe them properly.
  * If possible, submit tests to your patch / new feature so it can be tested easily.
  * Assure nothing is broken by running all the tests.
  * Open a pull request to the original repository and choose the right original branch you want to patch.
  * Even if you have write access to the repository, do not directly push or merge pull-requests. Let another team member review your pull request and approve.

## Copyrights and Licence
Project copyright and license is available at [LICENSE.md](./LICENSE.md).
