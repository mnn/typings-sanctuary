import * as S from './sanctuary/index';
import {Maybe} from './sanctuary/index';
import {Semigroup} from './sanctuary/index';
import {MaybeSemigroup} from './sanctuary/index';

const fnInc = (x: number): number => x + 1;
const fnAdd = (x: number, y: number): number => x + y;
const fnStrLen = (x: string): number => x.length;

// Classify
() => {
  const a: string = S.type('');
  const b: boolean = S.is(Number, 4);
};

// composition
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
  const c: Maybe<number> = Maybe.of(fnInc).ap(Maybe.of(4));
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
};

// Logic
() => {
  const a: boolean = S.not(true);
  const b: string = S.ifElse(a=>a > 0, x=>'+' + x, x=>x.toString(), 4);
  const c: boolean = S.allPass([x=>x > 1, x=>x % 2 == 0], 4);
  const d: boolean = S.anyPass([x=>x > 1, x=>x % 2 == 0], 4);
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
