# Step 2

In this step, we'll do the following:

- fill in the event handlers in `main.js` so that they
  - make an AJAX connection to the server
  - display appropriate feedback to the user in response to an user action (e.g. click)
  
- fill in the http endpoints in `app.js` so that they
  - connect up to `shortner.js` methods
  - return appropriate data (to the requests made by `main.js`) that can be used to give appropriate feedback to the user
  
- fill in the methods in `shortener.js` so that they
  - make the appropriate queries to the back-end database
  - return appropriate data (to the call made from `app.js`) so that it can return data to requests made from `main.js`
  
You should be able to do this in any order, although it may be helpful to start with `main.js` since the endpoints in `app.js` currently return mock data already.
After you connect up your AJAX calls in `main.js`, continue with `app.js` so that it calls methods in `shortener.js` (which in turn will make calls to the database).

## Redirects

Note that the `/r/<key>` endpoint also has mock data already.
If you call that endpoint, the server will return an `HTTP 302` response to redirect you to `google.ca`.

`HTTP 302` is only one way to redirect.
You may want to create additional endpoints to implement the following (other) types of redirect (with each supporting an optional delay)
- HTML `meta`
- JS
  - `window.location`
  - `location.replace`
  
See https://stackoverflow.com/questions/1865837/whats-the-difference-between-window-location-and-window-location-replace for a discussion on the differences between the two `JS` strategies.

-----

## Other branches

- Step 2b
  - initial implementation of `insert`
- Step 2c
  - implementation of `remove`
- Step 2d
  - a "better" `insert` that `update`s the record if the user tries to insert the same url again
