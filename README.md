viu
======

Simple semantic HTML templates for node.js and browser apps.

Frustrated with the complexity of the available JavaScript rendering engines,
I decided to try writing my own.

## (Short) List of Gripes

- *Excessive* **Complexity** (too many "Features")
- *Inconsistent* (Unit/Client) **Testing**

## Objectives

- **Minimal** Learning Curve with micro-set of features allowing *anyone* 
with basic HTML skills to write templates
- **Logic-less** (no code in views)
- **Security** Focus: Code escaped by default
- **Translation** without losing the will to live!


## List of Required Features

- Parse HTML file and insert variables
- Cache templates (*both* server & client side) for fast execution!
- 100% Test Coverage with human-readable tests (without grunt!)
- Use single curly brackets for variable placeholders `{name}`
- Allow (*encourage*) use of *partial* templates
- Automatic reloading of changed templates (ect)

### (*Very*) Nice to Have

- ***Automatic Translation*** to browser's headers['Accept-Language']
(with option for user to specify prefered language in their preferences
e.g. if I'm visiting a foreign country or using my Russian friend's laptop...)


## Decisions

### Which Words / Characters will be Significant?

The advantage of using characters is fewer bytes are consumed.
Which means less data is transmitted over the wire and apps are faster.
The dissadvantage is that templates are less human-readable...

e.g: 

- **#** (hash) for iteration/enumeration 
(as in [dust](https://github.com/linkedin/dustjs/wiki/Dust-Tutorial))

```html
<ul>
 {#names}
  <li>{name}</li>{~n}
 {/names}
</ul>
```

Handlebars by contrast uses the **#each** notation for itteration:

```html
<ul>
  {{#each names}}
  <li>{{name}}</li>
  {{/each}}
</ul>
```

The **#** (hash) character could be considered "loaded" because of its 
significance in CSS and Ruby (#id and #comment respectively)
But there aren't that many characters *available* on a standard keyboard ...
So we may need to *repurpose* a few ...

I prefer to use (*human-readable*) **words** where ever possible to
*lower barriers to entry* for "non-technical" people.

```html
<ul>
  {each names}
  <li>{name}</li>
  {end each}
</ul>
```

Including a partial view:

```html
{include footer}
```


## Background

There is *no shortage* of templating modules: 
https://github.com/joyent/node/wiki/modules#wiki-templating

I am not a fan of how underscore/EJS require *four* signifier
characters for *each* variable placeholder or iterator `<%= name %>`. 
EJS (rails) suffers from the same waste of bytes.
**Dust.js** can do it with only two: `{name}`
and since the curly brace already has auto-close/complete in most editors
it makes it *faster* to type. 

Express View Renderer:
https://github.com/visionmedia/express/blob/master/lib/response.js#L762

http://expressjs.com/guide.html#debugging-express

### Inspiration

- ECT: https://github.com/baryshev/ect + http://ectjs.com/#benchmark
- Dustjs: https://github.com/akdubya/dustjs + 
(LinkedIn) https://github.com/linkedin/dustjs +
(Express) https://github.com/klei-dev/dust
- Handlebars: http://handlebarsjs.com/ + 
https://github.com/wycats/handlebars.js +
https://github.com/donpark/hbs
- **EJS** (server *only*): https://github.com/visionmedia/ejs


### Watching Files For Changes

> ***Quis custodiet ipsos custodes***

- http://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener


### Headless Testing

- https://github.com/sgentle/phantomjs-node
