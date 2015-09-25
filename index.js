var inserted = {};
var idToCss = {};

module.exports = {};

var insert = function (css, id) {
  if (inserted[css]) {
    return;
  }
  inserted[css] = true;

  var elem = document.createElement("style");
  elem.setAttribute("type", "text/css");
  if (id) {
    elem.setAttribute("id", "toggle-css-" + id);
    idToCss[id] = css;
  }

  if ("textContent" in elem) {
    elem.textContent = css;
  } else {
    elem.styleSheet.cssText = css;
  }

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
};

var remove = function (id) {
  var elem = document.getElementById("toggle-css-" + id);
  if (elem) {
    elem.parentNode.removeChild(elem);
    inserted[idToCss[id]] = false;
    idToCss[id] = undefined;
  }
};

var toggle = function (css, id, state) {
  if (state === true || (state === undefined && inserted[css] !== true)) {
    insert(css, id);
  } else if (state === false || (state === undefined && inserted[css] === true)) {
    remove(id);
  }
};

module.exports.insert = insert;
module.exports.remove = remove;
module.exports.toggle = toggle;