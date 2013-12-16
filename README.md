viu
======

Easy semantic html templates for node.js and browser apps.

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


Confirm FS is watching...

## Background

There is *no shortage* of templating modules: 
https://github.com/joyent/node/wiki/modules#wiki-templating

I am not a fan of how underscore/EJS require *four* signifier
characters for each variable placeholder `<%= name %>`. 
EJS (rails) suffers from the same waste of bytes.
**Dust.js** can do it with only two: `{name}`
and since the curly brace already has auto-close/complete in most editors
it makes it *faster* to type. 

