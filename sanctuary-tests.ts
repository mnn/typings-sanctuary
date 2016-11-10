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

// Alternative
() => {
  type n= number | null | undefined;
  const a: n = S.and(1, null);
  const b: n = S.or(1, null);
  const c: n = S.xor(1, null);
};

// Logic
() => {
  const a: boolean = S.not(true);
  const b: string = S.ifElse(a=>a > 0, x=>'+' + x, x=>x.toString(), 4);
  const c: boolean = S.allPass([x=>x > 1, x=>x % 2 == 0], 4);
  const d: boolean = S.anyPass([x=>x > 1, x=>x % 2 == 0], 4);
};

// List
() => {
  type na = number[];
  type n = number;
  const a: na = S.concat([1], [2]);
  const b: Maybe<na> = S.slice(0, 1, [1]);
  const c: Maybe<n> = S.at(1, [1, 2]);
  const d: Maybe<n> = S.head([1]);
  const e: Maybe<n> = S.last([1]);
  const f: Maybe<na> = S.tail([1]);
  const g: Maybe<na> = S.init([1]);
  const h: Maybe<na> = S.take(2, [1]);
  const ch: Maybe<na> = S.takeLast(2, [1]);
  const i: Maybe<na> = S.drop(2, [1]);
  const j: Maybe<na> = S.dropLast(2, [1]);
  const k: na = S.reverse([1]);
  const l: Maybe<n> = S.indexOf('a', ['']);
  const m: Maybe<n> = S.lastIndexOf('a', ['']);
};

// Array
() => {
  const a: number[] = S.append(2, [1]);
  const b: number[] = S.prepend(1, [2]);
  const c: Maybe<number> = S.find(x => x > 0, [1]);
  const d: Maybe<number>[] = S.pluck<number>(Number, 'x', [{x: 1}, {x: 2}]);
  const e: number = S.reduce(acc => item => acc + item, 0, [1]);
  const f: number = S.reduce_((acc, item) => acc + item, 0, [1]);
  const g: number[] = S.unfoldr<number, number>(n => n < 5 ? S.Just([n, n + 1]) : S.Nothing(), 1);
  const h: number[] = S.range(0, 10);
};

// Object
() => {
  const a: number = S.prop<number>('a', {a: 1}); // can't be inferred
  // const b: Maybe<number> = S.get<number>(<any>Number, 'a', {});
  const b: Maybe<number> = S.get<number>(Number, 'a', {});
  const c: Maybe<number> = S.gets(Number, ['b'], {});
  const d: string[] = S.keys({});
  const e: string[] = S.values({});
  const f: Array<[string,any]> = S.pairs({});
};

// Number
() => {
  type n = number;
  const a: n = S.negate(1);
  const b: n = S.add(1, 2);
  const c: n = S.sum([1, 2]);
  const d: n = S.sum(S.Just(42));
  const e: n = S.sub(1, 2);
  const f: n = S.inc(1);
  const g: n = S.dec(1);
  const h: n = S.mult(1, 2);
  const ch: n = S.product([1, 2]);
  const i: n = S.div(1, 2);
  const j: n = S.min(1, 2);
  const k: n = S.max(1, 2);
};

// Integer
() => {
  const a: boolean = S.even(1);
  const b: boolean = S.odd(1);
};

// Parse
() => {
  const a: Date = S.parseDate('');
  const b: number = S.parseFloat('');
  const c: number = S.parseInt('');
  const d: Maybe<number> = S.parseJson(Number, ''); // not great, without a hint it's inferred as Maybe<any>
};

// RegExp
() => {
  const a: RegExp = S.regex('', '');
  const b: string = S.regexEscape('');
  const c: boolean = S.test(new RegExp(''), '');
  const d: Maybe<Array<Maybe<string>>> = S.match(new RegExp(''), '');
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
