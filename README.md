# URL Shortener

The URL shortener will be a simple single-page-application (SPA) that will help us practice building a client (web browser) and server (nodejs web server) style application.

## Layout

We start off with an application skeleton that contains two main parts:
- the `public` directory which contains static files that will be sent, unchanged, to the browser
- the "root" directory which contains the files that will be executed by the nodejs server

## `public` directory

The `public` directory is intended to contain the "application" that will be executed on the client side (web browser).

Supporting files are `jquery.3.4.1.min.js` and `moment.min.js` which may contain useful utilities to help you get started.
Feel free to add other libraries and utilities that you find on the internet.
For example, the `handlebarsjs` templating system may be useful to help keep your application clean later.

The following files are intended for you to edit:
- `index.html` - this file is loaded by default and contains the entire SPA
- `main.js` - holds executable javascript to implement application behaviour
- `main.css` - any styles that support the main application

## "root" directory

The "root" directory is intended to contain the server-side component.
You'll want to write "route" handlers so that when the browser goes to a certain path, the server will respond with dynamically generated content.
E.g., if the browser points to `/last/{n}`, the server will respond with the last `n` updated entries.

The supporting files `db_client.js` and `pgdb.js` are given to you to make it easier to connect to the database.
`init_db.js` is an example of how to connect to the database, and contains a simple set of queries to initialize tables and sequences that may be useful for our application.

The main entry point is `app.js` (defined in `package.json`).
Although it is possible to implement all the handler code in this file, it may make it easier to work with if you implement the application as a series of classes that model application logic.

The starter `app.js` contains a "mock" handler for `/last/{n}` that returns the last `n` entries.
It is a "mock" handler because it always returns the same array of two objects.
Eventually, you will want to return dynamic content derived from a database query.

# Local development

Although it is possible to develop the entire application by making changes and committing them to git, and then deploying to heroku, it may be faster to develop locally.
To do this, you will need to install `nodejs` and `npm`.

Run `npm init` to initialize all the packages that make up the web server.
Run `npm start` to start the server.
You can then point your browser to `http://localhost:3000`.

## Heroku

The easiest way to set up on heroku is to deploy the application first.
Then, you can either add a new `postgres` resource, OR go to the existing `pgweb` project and attach the new url-shortener application to pgweb's `postgres` resource.
