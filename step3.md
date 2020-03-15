# Step 3

In this step, we'll add in a templating system to make rendering html fragments easier.
We will use the popular handlebars package (https://handlebarsjs.com/), but you should be able to adapt the idea to any of the other popular templating systems.

## Templating systems

A templating system allows you to define a "template" and supply a set of variables that the templating system will then use in place of placeholders.

In the handlebars system, placeholders are placed inside `{{...}}` pairs (hence the name "handlebars").
E.g. the following template will generate an html page with the placeholder `url`.

```html
<html>
<head>
  <title>{{url}}</title>
</head>
<body>
  <a href="{{url}}">{{url}}</a>
</body>
</html>
```

Notice how `url` is used three times in this example, but only needs to be specified once.

## Redirects

In addition to the HTTP 302 redirects (through the `/r/:key` route), we will also implement the following through templates (the `[:delay]` parameter is optional, and we'll do that by implementing a pair of routes):
- HTML meta (through the `/h/:key/[:delay]` route)
- JS (with countdown)
  - window.location.href, which acts like a mouse "click"" (through the `/c/:key/[:delay]` route)
  - window.location.replace, which acts like the HTTP redirect (through the `/j/:key/[:delay]` route)

-----

## Other branches

- Step 3a
  - templates on the browser-side for the `last updated` list
  - https://github.com/samson-teals/url-shorten/compare/step-3_template...step-3_template-a
- Step 3b
  - templates on the browser-side for the `delete` operation
  - https://github.com/samson-teals/url-shorten/compare/step-3_template-a...step-3_template-b
- Step 3c
  - templates on the browser-side for the `add` and `update` operation
  - https://github.com/samson-teals/url-shorten/compare/step-3_template-b...step-3_template-c
- Step 3d
  - templates on the server-side to implement HTML meta redirects
  - https://github.com/samson-teals/url-shorten/compare/step-3_template-c...step-3_template-d
- Step 3e
  - templates on the server-side to implement JS `window.location.href`
  - https://github.com/samson-teals/url-shorten/compare/step-3_template-d...step-3_template-e
- Step 3f
  - templates on the server-side to implement JS `window.location.replace`
  - https://github.com/samson-teals/url-shorten/compare/step-3_template-e...step-3_template-f
