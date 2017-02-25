type SanctuaryType = any;

export interface SanctuaryModule {
  create(properties: {checkTypes: boolean, env: SanctuaryType[]}): Sanctuary;
  env: SanctuaryType[];
}

// simple types
type Ord = number | string | boolean | Date;
type Primitive = string | number | boolean;
type List<T> = ArrayLike<T>;
type StringLike = string | StringRepresentable<string>;
type Prop = Primitive | StringRepresentable<Primitive>;
type Path = List<Prop>;
type Struct<T> = Obj<T> | List<T>;

type Pred<T> = (v: T) => boolean;
type ObjPred<T> = (value: T, key: string) => boolean;
export type IsFnType<A> = (x: Type<A>) => boolean;

interface Dictionary<T> {
  [index: string]: T;
}
type Obj<T> = Dictionary<T>;

interface NumericDictionary<T> {
  [index: number]: T;
}

interface StringRepresentable<T> {
  toString(): T;
}

export interface Type<T> extends Function {
  new (...args: any[]): T;
}
type TypeRep<T> = Type<T>;

type Accessible = Primitive | Struct<any>;
type Integer = number; // - fractions
type FiniteNumber = number; // - Infinity, -Infinity, NaN
type NonZeroFiniteNumber = number; // - Infinity, -Infinity, 0, -0, NaN
type ValidNumber = number; // - NaN

export interface Functor<F> {}

export interface Apply<F> {}

export interface Chain<M> {}

interface Array<A> extends Functor<A>, Apply<A> {}

export interface MaybeFunc<M, N, T extends (m: M)=>N> extends Apply<T>, Maybe<T> {}

export interface Semigroup<T> {
  concat: (other: Semigroup<T>) => Semigroup<T>;
}

export interface MaybeSemigroup<T extends Semigroup<T>> extends Maybe<T> {
  concat(other: MaybeSemigroup<T>): MaybeSemigroup<T>;
  concat(other: Maybe<T>): Maybe<T>;
}

export interface Applicative<T> {}

export interface Foldable<F> {
  reduce<A>(fn: (acc: A, item: F) => A, zero: A): A;
}

export interface NonGlobalRegExp extends RegExp {}

export interface GlobalRegExp extends RegExp {}

export interface RegexMatchResult {
  match: string;
  groups: Maybe<string>[];
}

//. ### Maybe type
export interface Maybe<A> extends Functor<A>, Foldable<A> {
  value: A;

//# Maybe#isNothing :: Boolean
  isNothing: boolean;

//# Maybe#isJust :: Boolean
  isJust: boolean;

//# Maybe#toString :: Maybe a ~> String
  toString: () => string;

//# Maybe#inspect :: Maybe a ~> String
  inspect: () => string;
}

//# MaybeType :: Type -> Type
//# Maybe :: TypeRep Maybe
export interface MaybeStatic {
}

//. ### Either type

export interface EitherSemigroup<A extends Semigroup<A>, B extends Semigroup<B>> extends Either<A, B> {
//# Either#concat :: (Semigroup a, Semigroup b) => Either a b ~> Either a b -> Either a b
  concat(other: EitherSemigroup<A, B>): EitherSemigroup<A, B>;
  //concat(other: Either<A, B>): Either<A, B>;
}

export interface EitherFunc<A, B extends (m: M)=>N, M, N> extends Either<A, B> {
//# Either#ap :: Either a (b -> c) ~> Either a b -> Either a c
//  ap: <A>(value: Either<A, M>) => Either<A, N>; // TODO: move to main object
}

//# EitherType :: Type -> Type -> Type
//# Either :: TypeRep Either
export interface Either<A, B> {
//# Either#@@type :: String
//# Either#isLeft :: Boolean
  isLeft: boolean;

//# Either#isRight :: Boolean
  isRight: boolean;

//# Either#toString :: Either a b ~> String
  toString(): string;

//# Either#inspect :: Either a b ~> String
  inspect(): string;
}

export interface EitherStatic {
//# Either.of :: b -> Either a b
  of<A, B extends (m: M)=>N, M, N>(input: B): EitherFunc<A, B, M, N>;
  of<A extends Semigroup<any>, B extends Semigroup<any>>(input: B): EitherSemigroup<A, B>;
  of<A, B>(input: B): Either<A, B>;
}

export interface Alt<A> extends Alternative<A> {}

export interface Alternative<A> {}

declare global {
  interface String extends Semigroup<String> {
  }

  interface Array<T> extends Alternative<Array<T>>, Semigroup<Array<T>> {
  }

  interface Boolean extends Alternative<Boolean> {
  }
}

export interface Sanctuary {

//# create :: { checkTypes :: Boolean, env :: Array Type } -> Module
  create(properties: {checkTypes: boolean, env: SanctuaryType[]}): Sanctuary;

//# env :: Array Type
  env(): SanctuaryType[];

//. ### Classify
//# type :: a -> String
  type(input: any): string;

//# is :: TypeRep a -> b -> Boolean
  is<A>(typeRep: Type<A>, toTest: any): toTest is A;
  is<A>(typeRep: Type<A>): (toTest: any) => toTest is A;

//. ### Fantasy Land
//# or :: Alternative a => a -> a -> a
  alt<A extends Alt<A>>(first: A, second: A): A;


//. ### Combinator
//# I :: a -> a
  I<A>(a: A): A;

//# K :: a -> b -> a
  K<A, B>(a: A, b?: B): A;

//# A :: (a -> b) -> a -> b
  A<A, B>(fn: (a: A) => B, a: A): B;

//# T :: a -> (a -> b) -> b
  T<A, B>(a: A, fn: (a: A) => B): B;

// originally C
//# flip :: (a -> b -> c) -> b -> a -> c
  flip<A, B, C>(fn: (a: A)=>(b: B)=>C, b: B, a: A): C;

//. ### Function
//# flip_ :: ((a, b) -> c) -> b -> a -> c
  flip_<A, B, C>(fn: (a: A, b: B) => C): (b: B, a?: A) => C;
  flip_<A, B, C, Rest>(fn: (a: A, b: B, ...args: Rest[]) => C): (b: B, a?: A, ...args: Rest[]) => C;

// TODO: very loosely typed. check if it could be typed better

// used to be "lift"
//# map :: Functor f => (a -> b) -> f a -> f b
  map<A, B, C extends Functor<A>, D extends C>(fn: (a: A) => B, fa: C): D;

//# ap :: Apply f => f (a -> b) -> f a -> f b
  ap<A extends MaybeFunc<M, N, T>, M, N, T extends(m: M)=>N>(fn: A, a: Maybe<M>): Maybe<N>;
  ap<A extends Apply<T>, T extends(m: M)=>N, M, N>(fn: A, a: Apply<M>): Apply<N>;

//# lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
  lift2<A, B, C, D extends Functor<A>, E extends Functor<B>>(fn: (a: A) => (b: B) => C, fa: D, fb: E): any;

//# lift3 :: Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d
  lift3<A, B, C, D, E extends Functor<A>, F extends Functor<B>, G extends Functor<C>>(fn: (a: A) => (b: B) => (c: C) => D, fa: E, fb: F, fc: G): any;

//# chain :: Chain m => (a -> m b) -> m a -> m b
  chain: <A, B>(fn: (a: A) => Maybe<B>, a: Maybe<A>) => Maybe<B>;
  // chain: <A, B>(fn: (a: A) => B[], a: A[]) => B[]; // TODO: error TS2403: Subsequent variable declarations must have the same type.


//. ### Composition
//# compose :: (b -> c) -> (a -> b) -> a -> c
  // compose<A, B, C>(f: (b: B)=>C, g: (a: A) => B): (a: A)=>C;
  compose<V0, T1>(fn0: (x0: V0) => T1): (x0: V0) => T1;
  compose<V0, V1, T1>(fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T1;
  compose<V0, V1, V2, T1>(fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T1;
  compose<V0, V1, V2, V3, T1>(fn0: (x0: V0, x1: V1, x2: V2, x3: V3) => T1): (x0: V0, x1: V1, x2: V2, x3: V3) => T1;
  compose<V0, T1, T2>(fn1: (x: T1) => T2, fn0: (x0: V0) => T1): (x0: V0) => T2;
  compose<V0, V1, T1, T2>(fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T2;
  compose<V0, V1, V2, T1, T2>(fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T2;
  compose<V0, V1, V2, V3, T1, T2>(fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2, x3: V3) => T1): (x0: V0, x1: V1, x2: V2, x3: V3) => T2;
  compose<V0, T1, T2, T3>(fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0) => T1): (x0: V0) => T3;
  compose<V0, V1, T1, T2, T3>(fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T3;
  compose<V0, V1, V2, T1, T2, T3>(fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T3;
  compose<V0, V1, V2, V3, T1, T2, T3>(fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2, x3: V3) => T1): (x0: V0, x1: V1, x2: V2, x3: V3) => T3;
  compose<V0, T1, T2, T3, T4>(fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0) => T1): (x0: V0) => T4;
  compose<V0, V1, T1, T2, T3, T4>(fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T4;
  compose<V0, V1, V2, T1, T2, T3, T4>(fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T4;
  compose<V0, V1, V2, V3, T1, T2, T3, T4>(fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2, x3: V3) => T1): (x0: V0, x1: V1, x2: V2, x3: V3) => T4;
  compose<V0, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0) => T1): (x0: V0) => T5;
  compose<V0, V1, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T5;
  compose<V0, V1, V2, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T5;
  compose<V0, V1, V2, V3, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2, x3: V3) => T1): (x0: V0, x1: V1, x2: V2, x3: V3) => T5;
  compose<V0, T1, T2, T3, T4, T5, T6>(fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0) => T1): (x0: V0) => T6;
  compose<V0, V1, T1, T2, T3, T4, T5, T6>(fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T6;
  compose<V0, V1, V2, T1, T2, T3, T4, T5, T6>(fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T6;
  compose<V0, V1, V2, V3, T1, T2, T3, T4, T5, T6>(fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2, x3: V3) => T1): (x0: V0, x1: V1, x2: V2, x3: V3) => T6;
  compose<V0, T1, T2, T3, T4, T5, T6, T7>(fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0) => T1): (x0: V0) => T7;
  compose<V0, V1, T1, T2, T3, T4, T5, T6, T7>(fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T7;
  compose<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7>(fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T7;
  compose<V0, V1, V2, V3, T1, T2, T3, T4, T5, T6, T7>(fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2, x3: V3) => T1): (x0: V0, x1: V1, x2: V2, x3: V3) => T7;
  compose<V0, T1, T2, T3, T4, T5, T6, T7, T8>(fn7: (x: T7) => T8, fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0) => T1): (x0: V0) => T8;
  compose<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8>(fn7: (x: T7) => T8, fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T8;
  compose<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8>(fn7: (x: T7) => T8, fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T8;
  compose<V0, V1, V2, V3, T1, T2, T3, T4, T5, T6, T7, T8>(fn7: (x: T7) => T8, fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2, x3: V3) => T1): (x0: V0, x1: V1, x2: V2, x3: V3) => T8;
  compose<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(fn8: (x: T8) => T9, fn7: (x: T7) => T8, fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0) => T1): (x0: V0) => T9;
  compose<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9>(fn8: (x: T8) => T9, fn7: (x: T7) => T8, fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T9;
  compose<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9>(fn8: (x: T8) => T9, fn7: (x: T7) => T8, fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T9;
  compose<V0, V1, V2, V3, T1, T2, T3, T4, T5, T6, T7, T8, T9>(fn8: (x: T8) => T9, fn7: (x: T7) => T8, fn6: (x: T6) => T7, fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2, x3: V3) => T1): (x0: V0, x1: V1, x2: V2, x3: V3) => T9;

//# pipe :: [(a -> b), (b -> c), ..., (m -> n)] -> a -> n
  pipe<A, Z>(functions: [(a: A)=>Z]): (a: A)=>Z;
  pipe<A, B, Z>(functions: [(a: A)=>B, (b: B)=>Z]): (a: A)=>Z;
  pipe<A, B, C, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>U, (u: U)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>U, (u: U)=>V, (v: V)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>U, (u: U)=>V, (v: V)=>W, (w: W)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>U, (u: U)=>V, (v: V)=>W, (w: W)=>X, (x: X)=>Z]): (a: A)=>Z;
  pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>U, (u: U)=>V, (v: V)=>W, (w: W)=>X, (x: X)=>Y, (y: Y)=>Z]): (a: A)=>Z;
// pipe<A, Z>(functions: Array<(any)=>any>): (A)=>Z;

//# MaybeType :: Type -> Type
  Maybe: MaybeStatic;

//# Nothing :: Maybe a
  Nothing: MaybeSemigroup<any>;

//# Just :: a -> Maybe a
  Just<A, B, T extends (a: A)=>B>(input: T): MaybeFunc<A, B, T>;
  Just<S, A extends Semigroup<S>>(input: A): MaybeSemigroup<A>;
  Just<A>(input: A): Maybe<A>;

//# isNothing :: Maybe a -> Boolean
  isNothing(input: Maybe<any>): boolean;

//# isJust :: Maybe a -> Boolean
  isJust(input: Maybe<any>): boolean;

//# fromMaybe :: a -> Maybe a -> a
  fromMaybe<A>(defaultValue: A, maybe: Maybe<A>): A;

//# maybeToNullable :: Maybe a -> Nullable a
  maybeToNullable<A>(input: Maybe<A>): A|null;

//# toMaybe :: a? -> Maybe a
  toMaybe<A, B, T extends (a: A)=>B>(input?: T|null): MaybeFunc<A, B, T>;
  toMaybe<S, A extends Semigroup<S>>(input?: A|null): MaybeSemigroup<A>;
  toMaybe<A>(input?: A|null): Maybe<A>;

//# maybe :: b -> (a -> b) -> Maybe a -> b
  maybe<A, B>(defaultValue: B, mapFn: (a: A) => B, maybe: Maybe<A>): B;

//# justs :: Array (Maybe a) -> Array a
  justs<A>(maybes: Maybe<A>[]): A[];

//# mapMaybe :: (a -> Maybe b) -> Array a -> Array b
  mapMaybe<A, B>(mapFn: (a: A) => Maybe<B>, input: A[]): B[];

//# encase :: (a -> b) -> a -> Maybe b
  encase<A, B>(fn: (a: A) => B, input: A): Maybe<B>;

//# encase2 :: (a -> b -> c) -> a -> b -> Maybe c
  encase2<A, B, C>(fn: (a: A) => (b: B) => C, inputA: A, inputB: B): Maybe<C>;

//# encase2_ :: ((a, b) -> c) -> a -> b -> Maybe c
  encase2_<A, B, C>(fn: (a: A, b: B) => C, inputA: A, inputB: B): Maybe<C>;

//# encase3 :: (a -> b -> c -> d) -> a -> b -> c -> Maybe d
  encase3<A, B, C, D>(fn: (a: A) => (b: B) => (c: C) => D, inputA: A, inputB: B, inputC: C): Maybe<D>;

//# encase3_ :: ((a, b, c) -> d) -> a -> b -> c -> Maybe d
  encase3_<A, B, C, D>(fn: (a: A, b: B, c: C) => D, inputA: A, inputB: B, inputC: C): Maybe<D>;

//# maybeToEither :: a -> Maybe b -> Either a b
  maybeToEither<A, B>(leftValue: A, rightValue: Maybe<B>): Either<A,B>;


//. ### Either type

  Either: EitherStatic;

//# Left :: a -> Either a b
  // this seems to be useless in practice, but without S and SS tsc won't pick it up as a semigroup...
  Left<S, SS, A extends Semigroup<S>, B extends Semigroup<SS>>(input: A): EitherSemigroup<A, B>;
  Left<A, B>(input: A): Either<A, B>;

//# Right :: b -> Either a b
  Right<A, B extends (m: M)=>N, M, N>(input: B): EitherFunc<A, B, M, N>;
  Right<S, SS, A extends Semigroup<S>, B extends Semigroup<SS>>(input: B): EitherSemigroup<A, B>;
  Right<A, B>(input: B): Either<A, B>;

//# isLeft :: Either a b -> Boolean
  isLeft<A, B>(either: Either<A, B>): boolean;

//# isRight :: Either a b -> Boolean
  isRight<A, B>(either: Either<A, B>): boolean;

//# either :: (a -> c) -> (b -> c) -> Either a b -> c
  either<A, B, C>(leftFn: (a: A)=>C, rightFn: (b: B) =>C, input: Either<A, B>): C;

//# lefts :: Array (Either a b) -> Array a
  lefts<A>(input: Either<A, any>[]): A[];

//# rights :: Array (Either a b) -> Array b
  rights<B>(input: Either<any, B>[]): B[];

//# encaseEither :: (Error -> l) -> (a -> r) -> a -> Either l r
  encaseEither<L, R, A>(errorMapFn: (e: Error)=>L, dangerousFn: (a: A)=>R, input: A): Either<L, R>;

//# encaseEither2 :: (Error -> l) -> (a -> b -> r) -> a -> b -> Either l r
  encaseEither2<L, R, A, B>(errorMapFn: (e: Error) => L, dangerousFn: (a: A)=>(b: B)=>R, a: A, b: B): Either<L, R>;

//# encaseEither2_ :: (Error -> l) -> ((a, b) -> r) -> a -> b -> Either l r
  encaseEither2_<L, R, A, B>(errorMapFn: (e: Error) => L, dangerousFn: (a: A, b: B)=>R, a: A, b: B): Either<L, R>;

//# encaseEither3 :: (Error -> l) -> (a -> b -> c -> r) -> a -> b -> c -> Either l r
  encaseEither3<L, R, A, B, C>(errorMapFn: (e: Error) => L, dangerousFn: (a: A)=>(b: B)=>(c: C)=>R, a: A, b: B, c: C): Either<L, R>;

//# encaseEither3_ :: (Error -> l) -> ((a, b, c) -> r) -> a -> b -> c -> Either l r
  encaseEither3_<L, R, A, B, C>(errorMapFn: (e: Error) => L, dangerousFn: (a: A, b: B, c: C)=>R, a: A, b: B, c: C): Either<L, R>;

//# eitherToMaybe :: Either a b -> Maybe b
  eitherToMaybe<B>(either: Either<any, B>): Maybe<B>;


//. ### Logic
//# and :: Boolean -> Boolean -> Boolean
  and(a: boolean, b: boolean): boolean;
  and(a: boolean): (b: boolean) => boolean;

//# or :: Boolean -> Boolean -> Boolean
  or(a: boolean, b: boolean): boolean;
  or(a: boolean): (b: boolean) => boolean;

//# not :: Boolean -> Boolean
  not(input: boolean): boolean;

//# ifElse :: (a -> Boolean) -> (a -> b) -> (a -> b) -> a -> b
  ifElse<A, B>(predicate: Pred<A>, successProcessor: (input: A) => B, failureProcessor: (input: A) => B, value: A): B;

//# allPass :: Array (a -> Boolean) -> a -> Boolean
  allPass<A>(input: Pred<A>[], value: A): boolean;

//# anyPass :: Array (a -> Boolean) -> a -> Boolean
  anyPass<A>(input: Pred<A>[], value: A): boolean;


//. ### List
//# concat :: Semigroup a => a -> a -> a
  concat<A extends Semigroup<any>> (first: A, second: A): A;

//# slice :: Integer -> Integer -> [a] -> Maybe [a]
  slice<A>(startIndex: Integer, endIndex: Integer, input: A[]): Maybe<A[]>;

//# at :: Integer -> [a] -> Maybe a
  at<A>(index: Integer, input: A[]): Maybe<A>;

//# head :: [a] -> Maybe a
  head<A>(input: A[]): Maybe<A>;

//# last :: [a] -> Maybe a
  last<A>(input: A[]): Maybe<A>;

//# tail :: [a] -> Maybe [a]
  tail<A>(input: A[]): Maybe<A[]>;

//# init :: [a] -> Maybe [a]
  init<A>(input: A[]): Maybe<A[]>;

//# take :: Integer -> [a] -> Maybe [a]
  take<A>(length: Integer, input: A[]): Maybe<A[]>;

//# takeLast :: Integer -> [a] -> Maybe [a]
  takeLast<A>(length: Integer, input: A[]): Maybe<A[]>;

//# drop :: Integer -> [a] -> Maybe [a]
  drop<A>(length: Integer, input: A[]): Maybe<A[]>;

//# dropLast :: Integer -> [a] -> Maybe [a]
  dropLast<A>(length: Integer, input: A[]): Maybe<A[]>;

//# reverse :: [a] -> [a]
  reverse<A>(input: A[]): A[];

//# indexOf :: a -> [a] -> Maybe Integer
  indexOf<A>(needle: A, input: A[]): Maybe<Integer>;

//# lastIndexOf :: a -> [a] -> Maybe Integer
  lastIndexOf<A>(needle: A, input: A[]): Maybe<Integer>;


//. ### Array
//# append :: a -> Array a -> Array a
  append<A>(item: A, array: A[]): A[];

//# prepend :: a -> Array a -> Array a
  prepend<A>(item: A, array: A[]): A[];

//# find :: (a -> Boolean) -> Array a -> Maybe a
  find<A>(pred: Pred<A>, array: A[]): Maybe<A>;

//# pluck :: Accessible a => String -> Array a -> Array b
  pluck<A extends Accessible, K extends keyof A, B extends A[K]>(propName: K, array: A[]): B[];
  pluck<B>(propName: string, array: Accessible[]): B[];
  // pluck(propName: string, array: any[]): any[];

//# reduce :: Foldable f => (a -> b -> a) -> a -> f b -> a
  reduce<A, B>(reducer: (acc: A) => (item: B) => A, zero: A, foldable: Foldable<B>): A;

//# reduce_ :: Foldable f => ((a, b) -> a) -> a -> f b -> a
  reduce_<A, B>(reducer: (acc: A, item: B) => A, zero: A, foldable: Foldable<B>): A;

//# unfoldr :: (b -> Maybe (Pair a b)) -> b -> Array a
  unfoldr<A, B>(fn: (acc: B) => Maybe<[A, B]>, seed: B): A[]; // could be inference improved?

//# range :: Integer -> Integer -> Array Integer
  range(start: Integer, stop: Integer): Integer[];

//. ### Object
//# prop :: Accessible a => String -> a -> b
  prop<A extends Accessible, K extends keyof A>(p: K, obj: A): A[K];

//# get :: Accessible a => (b -> Boolean) -> String -> a -> Maybe c
  get<A extends Accessible, K extends keyof A, B extends A[K]>(pred: IsFnType<A>, p: K, obj: A): Maybe<B>;
  get<A extends Accessible, B>(pred: IsFnType<A>, p: string, obj: A): Maybe<B>;

//# gets :: Accessible a => (b -> Boolean) -> Array String -> a -> Maybe c
  gets<A extends Accessible, B>(pred: IsFnType<A>, path: string[], object: A): Maybe<B>;

//# keys :: StrMap a -> Array String
  keys(object: Object): string[];
  keys(object: Obj<any>): string[];

//# values :: StrMap a -> Array a
  values<T>(obj: Obj<T>): T[];
  values(object: Object): any[];

//# pairs :: StrMap a -> Array (Pair String a)
  pairs<T>(obj: Obj<T>): [string,T][];


//. ### Number
//# negate :: ValidNumber -> ValidNumber
  negate(num: ValidNumber): ValidNumber;

//# add :: FiniteNumber -> FiniteNumber -> FiniteNumber
  add(first: FiniteNumber, second: FiniteNumber): FiniteNumber;

//# sum :: Foldable f => f FiniteNumber -> FiniteNumber
  sum(f: Foldable<FiniteNumber>): FiniteNumber;

//# sub :: FiniteNumber -> FiniteNumber -> FiniteNumber
  sub(first: FiniteNumber, second: FiniteNumber): FiniteNumber;

//# inc :: FiniteNumber -> FiniteNumber
  inc(num: FiniteNumber): FiniteNumber;

//# dec :: FiniteNumber -> FiniteNumber
  dec(num: FiniteNumber): FiniteNumber;

//# mult :: FiniteNumber -> FiniteNumber -> FiniteNumber
  mult(first: FiniteNumber, second: FiniteNumber): FiniteNumber;

//# product :: Foldable f => f FiniteNumber -> FiniteNumber
  product(f: Foldable<FiniteNumber>): FiniteNumber;

//# div :: FiniteNumber -> NonZeroFiniteNumber -> FiniteNumber
  div(first: FiniteNumber, second: NonZeroFiniteNumber): FiniteNumber;

//# min :: Ord a => a -> a -> a
  min<T extends Ord>(first: T, second: T): T;

//# max :: Ord a => a -> a -> a
  max<T extends Ord>(first: T, second: T): T;


//. ### Integer
//# even :: Integer -> Boolean
  even(num: Integer): boolean;

//# odd :: Integer -> Boolean
  odd(num: Integer): boolean;


//. ### Parse
//# parseDate :: String -> Maybe Date
  parseDate(input: string): Maybe<Date>;

//# parseFloat :: String -> Maybe Number
  parseFloat(input: string): Maybe<number>;

//# parseInt :: Integer -> String -> Maybe Integer
  parseInt(radix: Integer, input: string): Maybe<Integer>;

//# parseJson :: TypeRep a -> String -> Maybe a
  parseJson<A>(pred: Pred<any>, input: string): Maybe<A>;


//. ### RegExp
//# regex :: RegexFlags -> String -> RegExp
  regex(flags: string, input: string): RegExp;

//# regexEscape :: String -> String
  regexEscape(input: string): string;

//# test :: RegExp -> String -> Boolean
  test(regex: RegExp, input: string): boolean;

//# match :: NonGlobalRegExp -> String -> Maybe { match :: String, groups :: Array (Maybe String) }
  match(regex: NonGlobalRegExp, input: string): Maybe<RegexMatchResult>;
  match(regex: NonGlobalRegExp): (input: string) => Maybe<RegexMatchResult>;

// # matchAll :: GlobalRegExp -> String -> Array { match :: String, groups :: Array (Maybe String) }
  matchAll(regex: GlobalRegExp, input: string): RegexMatchResult[];
  matchAll(regex: GlobalRegExp): (input: string) => RegexMatchResult[];

//. ### String
//# toUpper :: String -> String
  toUpper(input: string): string;

//# toLower :: String -> String
  toLower(input: string): string;

//# trim :: String -> String
  trim(input: string): string;

//# words :: String -> Array String
  words(input: string): string[];

//# unwords :: Array String -> String
  unwords(input: string[]): string;

//# lines :: String -> Array String
  lines(input: string): string[];

//# unlines :: Array String -> String
  unlines(input: string[]): string;

}
