"use strict";
//import * as SanctMod from 'sanctuary';
var SanctMod = require('sanctuary');
var S = SanctMod.create({ checkTypes: false, env: SanctMod.env });
var m = S.Just(5);
var m2 = m.of('string');
console.log(m2);
