//import * as SanctMod from './test.d';
import SanctMod = require('./test.d');
//import SanctMod from './test.d';

import {Maybe, Sanctuary, SanctuaryModule} from './test-interfaces';

const S = (<SanctuaryModule>SanctMod).create({checkTypes: false, env: SanctMod.env}); // cast is only here b/c of IDEA

const m: Maybe<number> = S.Just(5);
const m2: Maybe<string> = m.of('string');

console.log(m2);
