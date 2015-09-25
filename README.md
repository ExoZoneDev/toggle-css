# toggle-css

insert and remove a string of css in the `<head>`

# example

suppose we've got some css:

``` css
body {
  background-color: purple;
  color: yellow;
}
```

and we want to bundle that css into a js file so that we can write an entirely
self-contained module:

``` javascript
var fs = require("fs");
var css = require("toggle-css");
var style = fs.readFileSync(__dirname + "/style.css");
// Optional id parameter
css.insert(style, "my-cool-style");
document.body.appendChild(document.createTextNode("HELLO CRUEL WORLD"));
```

You can also remove the css if you gave it an id when inserting it.
``` javascript
css.remove("my-cool-style");
```

There is also a toggle function which will remove the css if it already inserted, and add it if not.
You can pass in a boolean value as the last parameter to force which way to toggle.
``` javascript
var value = checkbox.checked;
css.toggle(style, "my-cool-style", value === true);
```

compile with [browserify](http://browserify.org) using
[brfs](https://github.com/substack/brfs) to inline the `fs.readFile()`
call:

```
$ browserify -t brfs insert.js > bundle.js
```

Now plop that bundle.js into a script tag and you'll have a self-contained js
blob with inline css!

``` html
<html>
  <head></head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```
