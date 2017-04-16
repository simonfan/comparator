// third-party
const objectPath = require('object-path');

// constants
const SORT_DESC_RE = /(^-)?(.+)$/;

/**
 * Compares two calues and returns a number that will be used by
 * Array.prototype.sort.
 *
 * `undefined` values will always come last.
 * 
 * @param  {*} aValue
 * @param  {*} bValue
 * @param  {Number} direction
 * @return {Number}
 */
function compareValues(aValue, bValue, direction) {
  if (aValue === undefined && bValue !== undefined) {
    return 1;
  }

  if (aValue !== undefined && bValue === undefined) {
    return -1;
  }

  if (aValue === bValue) {
    return 0;
  } else {
    return aValue > bValue ? 1 * direction : -1 * direction;
  }
}

/**
 * Parses a property sort string into an object with
 * `property` and `direction`.
 * 
 * @param  {String} str
 * @return {Object}
 */
function parsePropertyComparisonString(str) {

  var match = str.match(SORT_DESC_RE);

  return {
    property: match[2],
    direction: match[1] ? -1 : 1,
  };
}

/**
 * Genenates a comparator function that takes in two objects
 * and returns either 1 or -1.
 *
 * Properties can have a leading '-' indicating they should
 * be used for sorting ASC.
 *
 * Multiple properties are allowed so that in case one property
 * comparison returns 0 (which means they are equal), the
 * next property is used for the comparison.
 * 
 * @param  {String|Array[String]|Array[Object]} properties
 * @return {Function}
 */
module.exports = function comparator(properties) {
  // properties must be an array.
  properties = 
    typeof properties === 'string' || 
    (typeof properties === 'object' && !Array.isArray(properties)) ?
    [properties] : properties;

  properties = properties.map(function (property) {
    return typeof property === 'string' ?
      parsePropertyComparisonString(property) : property;
  });

  return function compare(a, b) {

    return properties.reduce(function (res, property) {

      if (res === 0) {
        var aValue = objectPath.get(a, property.property),
            bValue = objectPath.get(b, property.property),
            direction = property.direction;
        
        return compareValues(aValue, bValue, direction);
      } else {
        return res;
      }

    }, 0);
  };
};
