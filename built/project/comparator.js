//     comparator
//     (c)
//     comparator is licensed under the MIT terms.

define(["underscore"],function(e){function t(e,t,n){return e===t?0:e>t?1*n:-1*n}var n=function(r,i,s){r=e.isString(r)?[r]:r,i=i||{},s=s||{};var o=s.root;return function(n,s){return n=o?n[o]:n,s=o?s[o]:s,e.reduce(r,function(r,o){if(r===0){var u=n[o],f=s[o],l=e.isNumber(i)?i:i[o]?i[o]:1;return t(u,f,l)}return r},0)}};return n});