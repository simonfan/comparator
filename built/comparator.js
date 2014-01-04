//     comparator
//     (c)
//     comparator is licensed under the MIT terms.

define("comparator",["lodash"],function(r){function n(r,n,t){return r===n?0:r>n?1*t:-1*t}var t=function(t,u,e){t=r.isString(t)?[t]:t,u=u||{},e=e||{};var i=e.root;return function(e,o){return e=i?e[i]:e,o=i?o[i]:o,r.reduce(t,function(t,i){if(0===t){var c=e[i],f=o[i],a=r.isNumber(u)?u:u[i]?u[i]:1;return n(c,f,a)}return t},0)}};return t});