"use strict";
var SanctuaryMod = require('sanctuary');
// usage with create, IMO much more common (runtime type checks are costly, so they should not be enabled in production)
(function () {
    // cast is not required (here is only because of IDEA)
    var S = SanctuaryMod.create({ checkTypes: false, env: SanctuaryMod.env });
    var m = S.Just(5);
    var m2 = m.of('string');
    console.log('Just from create:', m2);
})();
// usage on a raw module, probably mostly for very small projects
(function () {
    // cast is required
    var S = SanctuaryMod;
    var m = S.Just(5);
    var m2 = m.of('string');
    console.log('Just from raw module:', m2);
})();
