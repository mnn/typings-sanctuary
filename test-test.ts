import SanctuaryMod = require('./test.d');
import {Maybe, SanctuaryModule, Sanctuary} from './test-interfaces';

// usage with create, IMO much more common (runtime type checks are costly, so they should not be enabled in production)
(() => {
  // cast is not required (here is only because of IDEA)
  const S = (<SanctuaryModule>SanctuaryMod).create({checkTypes: false, env: SanctuaryMod.env});

  const m: Maybe<number> = S.Just(5);
  const m2: Maybe<string> = m.of('string');

  console.log('Just from create:', m2);
})();

// usage on a raw module, probably mostly for very small projects
(() => {
  // cast is required
  const S = <Sanctuary><any>SanctuaryMod;

  const m: Maybe<number> = S.Just(5);
  const m2: Maybe<string> = m.of('string');

  console.log('Just from raw module:', m2);
})();
