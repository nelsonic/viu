# viu [![Build Status](https://travis-ci.org/nelsonic/viu.png?branch=master)](https://travis-ci.org/nelsonic/viu) [![Code Climate](https://codeclimate.com/github/nelsonic/viu.png)](https://codeclimate.com/github/nelsonic/viu) [![Dependency Status](https://david-dm.org/nelsonic/viu.svg)](https://david-dm.org/nelsonic/viu)
=====

<!-- [![Dependencies](https://david-dm.org/nelsonic/viu.png)](https://david-dm.org/nelsonic/viu) -->

***Frustrated*** with the ***complexity*** <br />
of the existing JavaScript/Node.js **rendering engines**, <br />
I *decided* to write something **light**.

The *aim* is ***Simplicity*** *not* "Bells and Whistles" <br />
***Security*** not *fancy feature* "xyz" <br />
and ***Speed*** because *time is our scarcest resource*.


# (*Start* With) Why?

## (Short) List of Gripes

- *Excessive* **Complexity** (too many "Features")
- *Inconsistent* (Unit/Client) **Testing**
- *Cryptic* syntax (erb/jade ... *not beginner-friendly* :confused: )

## Objectives

- **Minimal** Learning Curve with micro-set of features allowing *anyone*
with basic HTML skills to write templates
- **Logic-less** (*no code* in views)
- **Security** Focus: Code escaped by default
- **Translation** without losing the will to live!


## List of Required Features

- Parse HTML file and insert variables
- Cache templates (*both* server & client side) for fast execution!
- 100% Test Coverage with human-readable tests (without grunt!)
- Use single curly brackets for variable placeholders `{name}`
- Allow (*encourage*) use of *partial* templates
- (Optional) Automatic reloading of changed templates (ect)
- **Valid and Accessible HTML** using http://validator.w3.org/
- **Measurable Performance** (see if/when/why your app is getting *slower*!)

## Security Focus

- **ALL** Data is **escaped** ***by default**
- Compliance with all OWASP XSS prevention rules. see:
https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet#XSS_Prevention_Rules


### (*Very*) Nice to Have

- ***Automatic Translation*** to browser's headers['Accept-Language']
(with option for user to specify prefered language in their preferences
e.g. if I'm visiting a foreign country or using my Russian friend's laptop...)
- **Client side** view of all unit tests (do not require running tests
from command line - which puts new people off!)


# How

## Simple Render Function

A simple function call: (no template specified)

```javascript
V(options, function(err, data){
	response.end(data);
});
```

Try: `nodemon test/exampleapp.js`
Visit: http://localhost:8000/
Run: ab -n 4000 -c 120 http://localhost:8000/


## Default Values

The ability to have default values in templates is handy.
e.g:

```
{ site_name or default_site_name }
```
What type of configuration file should we use...?
http://en.wikipedia.org/wiki/Configuration_file




## Unit Testing

Rather than forcing people to download the code and run
the tests on the command line I've decided to use the browser-based
unit testing framework **QUnit** and **blanket.js**.
This creates more work in the short-run but holds several clear benefits:

- *Anyone* can run/view the tests simply by visiting the tests url.
- **No Command Line** to overwhelm beginners.
- Nothing to install/configure

> Next:

- http://www.ianlewis.org/en/phantom-qunit-test-runner
- https://github.com/IanLewis/phantomjs-qunit
- http://qunitjs.com/plugins/
- https://github.com/Krinkle/qunit-theme-ninja


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

### Parameters for Functions/Methods

Need to decide how to set up the main method.
We can either list out all the parameters inline. e.g:
```
render(options, view, layout_file, callback) {
	// render code here
}
```
***Or*** just use the options object to specify all parameters
```
render(options) {
	// check view_file is set in options
    if (typeof options.view_file === 'undefined') {
        options.view_file = config.default_view;
    }
}
```

I tend to favor spelling out all the available parameters because it
makes learning how to use a method/function easier.
But one can just as easily argue that having too many parameters
is confusing if they aren't all being used.

Lets try the single options parameter and see what people think/say.

For our first test we don't even *need* a parameter! So lets write that first!

#### More Detail

- Default Parameters:
http://docs.nodejitsu.com/articles/javascript-conventions/how-to-create-default-parameters-for-functions
- Multiple parameters vs. single options object:
http://stackoverflow.com/questions/12826977/multiple-arguments-vs-options-object


### Partial Views

We need to decide what the *most intuitive* way of rendering partials is.
[ If you don't know what a partial is, see:
http://stackoverflow.com/questions/7085156/what-are-partial-views ]

**Two Options**:

**1** - Define a Layout File when rendering your view

**2** - Include a header and footer in your view

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

### Parsing

- http://stackoverflow.com/questions/2024732/parsing-text-with-javascript
- http://www.javascriptkit.com/javatutors/string4.shtml
- https://github.com/appleifreak/simple-text-parser

### HTML Validation

![I love valid html](http://www.w3.org/QA/Tools/I_heart_validator_lg "I love valid html")

- HTML 5 Draft Spec: http://www.w3.org/html/wg/drafts/html/master/ + http://www.w3.org/TR/html5/
- Existing module (validator.js): https://github.com/chriso/validator.js

This is a problem:

![Amazon fails validation](http://i.imgur.com/vZtbAwY.png "Amazon fails validation - *Badly*")


### Avoiding Information Overload

When you first start learning a new framework/system its easy
to be *overwhelmed* by an excess of *jargon*.

What if instead of overloading people we had a learning process
where each concept was broken down into a 5-30 second tutorial
you had to go through *before* moving on?

### Auto-Generated Configuration File

Rather than having a giant configuration file with *many* options
*most* people aren't going to use. We build a file-scanner into the
**watcher** that adds config option to the config.js file each time
a variable is registered with the **default_** prefix.

e.g:

```
<title>{title || default_page_title} </title>
```
will create an entry in config.js for **default_page_title**



### (Premature) Optimization

It occured to me that we could  render templates
without the whitespace (between tags)
(i.e. minify our html) e.g:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>My Page Title</title>
	</head>
	<body>
		<h1>Whitespace aids readability</h1>
	</body>
</html>
```
Would become:
```html
<!DOCTYPE html><html><head><meta charset="utf-8"><title>My Page Title</title></head><body><h1>Goodbye Whitespace</h1></body></html>
```

But this makes viewing/reading page source & debugging a nightmare!
So lets put that off for as long as possible
(until enough developers requests it).

> "Premature optimization is the root of all evil."
> ~ Donald Knuth (Computer Programming as an Art - 1974)

#### The Rules Of Optimization

1. **Make it work**.
2. **Make it right** (the code is readable [uses IntentionRevealingNames] and every idea is expressed **OnceAndOnlyOnce**).
3. **Make** ***everything*** **work**.
4. **Make** ***everything*** **right**.
5. **Use** the **system** and **find performance bottlenecks**.
6. **Use** a ***profiler*** in those bottlenecks to determine what needs to be optimized.
(***ProfileBeforeOptimizing***)
7. **Make it fast**. You maintained unit tests, right? Then you can refactor the code mercilessly in order to improve the performance.

#### Read

- HTML minification should be the *last* thing you do to optimize your website:
 http://stackoverflow.com/questions/728260/html-minification
- Premature optimization is the root of all evilhttp://c2.com/cgi/wiki?PrematureOptimization
- Google Page Speed advice: https://developers.google.com/speed/docs/insights/MinifyResources
- Eventually: http://www.willpeavy.com/minifier/
