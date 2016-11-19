Type definitions for Sanctuary ([page](https://sanctuary.js.org/), [GitHub](https://github.com/sanctuary-js/sanctuary))
====================================================

Just a reminder before using - do not expect 100% typings which are in my opinion impossible, because TypeScript's type (and module) system isn't just strong enough for all magic used in Sanctuary.

There are some nasty `any`s (sometimes masked behind empty interface or non-parameter generic) and on some places you have to help TS with types inferring (e.g. `S.Nothing<number>()`).  If you can think of better solution than is in this typings, please consider making a PR.

Status
-----

Almost everything is typed. Consider this project to be a beta version, there may be breaking changes (I will try to not break anything).

Installation
-----------

For now just a hacky solution. (Typings tool with GitHub address can't be used, because it doesn't support multiple files - it breaks typings for `Maybe` and other types.)

Run this in your project directory (it creates typings module directory in `node_modules` and downloads typings):

```bash
wget -qO- https://github.com/mnn/typings-sanctuary/raw/master/install.sh | bash -s
```

Usage
----

After installation you should be able to compile and run following code:

```ts
import SanctuaryMod = require('sanctuary/index');
import { SanctuaryModule } from 'sanctuary/sanctuary-types';

const S = SanctuaryMod.create({checkTypes: false, env: SanctuaryMod.env});

console.log(S.add(1, 2));
```

Testing
------

To compile and execute `sanctuary-tests.ts` run (assuming `npm install` has been done):

```bash
npm test
```
