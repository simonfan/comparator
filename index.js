// constants
const SORT_DESC_RE = /(^-)?(.+)$/;

function compareValues(aValue, bValue, direction) {
  if (aValue === bValue) {
    return 0;
  } else {
    return aValue > bValue ? 1 * direction : -1 * direction;
  }
}

function parsePropertySortString(str) {

  var match = str.match(SORT_DESC_RE);

  return {
    property: match[2],
    direction: match[1] ? -1 : 1,
  };
}

var comparator = function comparator(properties, options) {
  // properties must be an array.
  properties = typeof properties === 'string' ? [properties] : properties;

  properties = properties.map(function (property) {
    return typeof property === 'string' ?
      parsePropertySortString(property) : property;
  });

  // default options
  options = options || {};

  // root namespace from which to obtain values.
  var root = options.root;

  return function (a, b) {

    a = root ? a[root] : a;
    b = root ? b[root] : b;

    return properties.reduce(function (res, property) {

      if (res === 0) {
        var aValue = a[property.property],
            bValue = b[property.property],
            direction = property.direction;

        return compareValues(aValue, bValue, direction);
      } else {
        return res;
      }

    }, 0);
  };
};

module.exports = comparator;
