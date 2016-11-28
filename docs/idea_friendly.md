IntelliJ IDEA friendly example
==========================

```ts
import SanctuaryMod = require('sanctuary/index');
import { SanctuaryModule } from 'sanctuary/sanctuary-types';

// help IDEA type, so we get all that sweet auto-completion
const S = (<SanctuaryModule>SanctuaryMod).create({checkTypes: false, env: SanctuaryMod.env});

console.log(S.add(1, 2));
```
