import * as S from './sanctuary/index';
import {Maybe} from './sanctuary/index';
import {Semigroup} from './sanctuary/index';
import {MaybeSemigroup} from './sanctuary/index';

const fnInc = (x: number): number => x + 1;
const fnAdd = (x: number, y: number): number => x + y;
const fnStrLen = (x: string): number => x.length;
const fnThreeOp = (x: string, y: boolean): number => -1;

// Classify
() => {
  const a: string = S.type('');
  const b: boolean = S.is(Number, 4);
};

// Combinator
() => {
  type n = number;
  const a: n = S.I(1);
  const b: n = S.K(2);
  const c: n = S.K(3, '');
  const d: n = S.A(fnInc, 0);
  const e: n = S.T(0, fnInc);
  const f: n = S.C(fnThreeOp, true, '');
  const g: n = S.B(Math.sqrt, fnInc, 99);
  const h: n = S.S(fnAdd, Math.sqrt, 100);
};

// Function
() => {
  const a: (a: string, b: number) => boolean = S.flip((b: number, a: string) => false);
  const b: Maybe<number> = S.lift(fnInc, Maybe.of(1));
};

// Composition
() => {
  const a: number = S.compose(fnInc, fnStrLen)('');
  const b: number = S.pipe([fnStrLen, fnInc])('');
  const c: number = S.pipe([fnStrLen, fnStrLen])('');
  const fa = (s: string): number => s.length;
  const fb = (s: number): string => s.toString();
  const d: string = S.pipe([fa, fb, fa, fb, fa, fb, fa, fb, fa, fb])('');
  const e: string = S.meld([fa, fb])('');
  const fc = (n: number, s: string): string => n + s;
  const f: string = S.meld([fnAdd, fc])(1, 2, 'x');
};

// Maybe
() => {
  const a: Maybe<any> = Maybe.empty();
  const b: Maybe<number> = Maybe.of(1);
  const c: Maybe<number> = Maybe.of(fnInc).ap(Maybe.of(4)); // TODO: fix, not sure how it broke
  const d: boolean = Maybe.of(fnInc).isJust;
  const maybeNumber = (s: string): Maybe<number> => Maybe.of(s.length);
  const e: Maybe<number> = Maybe.of('').chain(maybeNumber); // flatMap
  const f: Semigroup<any[]> = [];
  const g: MaybeSemigroup<number[]> = Maybe.of([1]);
  const h: Maybe<number> = S.Just(0);
  const ch: Maybe<number> = S.Nothing<number>(); // meh, ugly. but without type variable it's not working
  const i: MaybeSemigroup<number[]> = Maybe.of([1]).concat(S.Just([2]));
  const j: MaybeSemigroup<number[]> = Maybe.of([1]).concat(S.Nothing<number[]>()); // a bit ugly
  const k: Maybe<any> = S.Nothing();
  const l: Maybe<number> = Maybe.of(1).empty();
  const m: boolean = Maybe.of(1).equals(2);
  //const n: Maybe<number> = Maybe.of(1).extend((a) => a.value);
  const o: Maybe<number> = Maybe.of(1).filter(x=>x > 1);
  const t: Maybe<number> = Maybe.of('').map(fnStrLen);
  const u: Maybe<number> = Maybe.of('').of(0);
  const v: string = Maybe.of(4).reduce((acc, item) => acc + item, '');
  // TODO: applicative test
};

// Logic
() => {
  const a: boolean = S.not(true);
  const b: string = S.ifElse(a=>a > 0, x=>'+' + x, x=>x.toString(), 4);
  const c: boolean = S.allPass([x=>x > 1, x=>x % 2 == 0], 4);
  const d: boolean = S.anyPass([x=>x > 1, x=>x % 2 == 0], 4);
};

// Integer
() => {
  const a: boolean = S.even(1);
  const b: boolean = S.odd(1);
};

// String
() => {
  const a: string = S.toUpper('a');
  const b: string = S.toLower('a');
  const c: string = S.trim('a');
  const d: string[] = S.words('a');
  const e: string = S.unwords(['a']);
  const f: string[] = S.lines('a');
  const g: string = S.unlines(['a']);
};
