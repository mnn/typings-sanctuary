Type definitions for [Sanctuary](https://sanctuary.js.org/)
====================================================

Just a reminder before using - do not expect 100% typings which are in my opinion impossible, because TypeScript's type (and module) system isn't just strong enough for all magic used in Sanctuary.

There are some nasty `any`s (sometimes masked behind empty interface or non-parameter generic) and on some places you have to help TS with types inferring (e.g. `S.Nothing<number>()`).  If you can think of better solution than is in this typings, please consider making a PR.

Status
-----

Consider this project to be in a beta version - there can be breaking changes!

- [x] Wrapper (S.create)
- [x] Classify
- [x] Combinator
- [x] Function
- [x] Composition
- [x] Maybe type
- [ ] Either type
- [x] Alternative
- [x] Logic
- [x] List
- [x] Array
- [x] Object
- [x] Number
- [x] Integer
- [x] Parse
- [x] RegExp
- [x] String

Usage
----
**TODO**

Testing
------

To compile `sanctuary-tests.ts` run (assuming `npm install` has been done):

```
npm test
```
