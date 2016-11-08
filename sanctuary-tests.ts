import * as S from './sanctuary/index';

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
