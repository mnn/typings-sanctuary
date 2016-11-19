type SanctuaryType = any;

export interface SanctuaryModule {
  create(properties: {checkTypes: boolean, env: SanctuaryType[]}): Sanctuary;
  env: SanctuaryType[];
}

/* attempts at typing type ref
 interface TypeRep<T> {
 '@@type': string;
 }

 interface String extends TypeRep<String> {
 }

 interface Number extends TypeRep<Number> {
 }
 */

export interface Functor<F> {
}

export interface MaybeFunc<M, N, T extends (m: M)=>N> extends Maybe<T> {
//# Maybe#ap :: Maybe (a -> b) ~> Maybe a -> Maybe b
  ap: (value: Maybe<M>) => Maybe<N>;
}

export interface Semigroup<T> {
  concat: (other: Semigroup<T>) => Semigroup<T>;
}

export interface MaybeSemigroup<T extends Semigroup<T>> extends Maybe<T> {
  concat(other: MaybeSemigroup<T>): MaybeSemigroup<T>;
  concat(other: Maybe<T>): Maybe<T>;
}

export interface Applicative<T> {
}

export interface Foldable<F> {
  reduce<A>(fn: (acc: A, item: F) => A, zero: A): A;
}

//. ### Maybe type
export interface Maybe<A> extends Functor<A>, Foldable<A> {
  // breaks ap, not sure why
  //value: A;

  // TODO: not sure if TypeScript allows @@ in id
//# Maybe#@@type :: String

//# Maybe#isNothing :: Boolean
  isNothing: boolean;

//# Maybe#isJust :: Boolean
  isJust: boolean;

//# Maybe#chain :: Maybe a ~> (a -> Maybe b) -> Maybe b
  chain: <B>(fn: (a: A) => Maybe<B>) => Maybe<B>;

//# Maybe#empty :: Maybe a ~> Maybe a
  empty: () => Maybe<A>

//# Maybe#equals :: Maybe a ~> b -> Boolean
  equals: (toTest: A) => boolean

//# Maybe#extend :: Maybe a ~> (Maybe a -> a) -> Maybe a
  extend: (fn: (maybe: Maybe<A>) => A) => Maybe<A>;

//# Maybe#filter :: Maybe a ~> (a -> Boolean) -> Maybe a
  filter: (testFn: (value: A) => boolean) => Maybe<A>;

//# Maybe#map :: Maybe a ~> (a -> b) -> Maybe b
  map: <B>(processor: (value: A) => B) => Maybe<B>

//# Maybe#of :: Maybe a ~> b -> Maybe b
  of: <B>(value: B) => Maybe<B>;

//# Maybe#reduce :: Maybe a ~> ((b, a) -> b) -> b -> b
  reduce: <B>(reducer: (acc: B, item: A) => B, zero: B) => B;

//# Maybe#sequence :: Applicative f => Maybe (f a) ~> (a -> f a) -> f (Maybe a)
  // TODO

//# Maybe#toBoolean :: Maybe a ~> Boolean
  toBoolean: () => boolean;

//# Maybe#toString :: Maybe a ~> String
  toString: () => string;

//# Maybe#inspect :: Maybe a ~> String
  inspect: () => string;
}

//# MaybeType :: Type -> Type
//# Maybe :: TypeRep Maybe
export interface MaybeStatic {
//# Maybe.empty :: -> Maybe a
  empty<A>(): Maybe<A>;

//# Maybe.of :: a -> Maybe a
  of<A, B, T extends (a: A)=>B>(input?: T|null): MaybeFunc<A, B, T>;
  of<S, A extends Semigroup<S>>(input?: A|null): MaybeSemigroup<A>;
  of<A>(input?: A|null): Maybe<A>;
}

//. ### Either type

export interface EitherSemigroup<A extends Semigroup<A>, B extends Semigroup<B>> extends Either<A, B> {
//# Either#concat :: (Semigroup a, Semigroup b) => Either a b ~> Either a b -> Either a b
  concat(other: EitherSemigroup<A, B>): EitherSemigroup<A, B>;
  //concat(other: Either<A, B>): Either<A, B>;
}

export interface EitherFunc<A, B extends (m: M)=>N, M, N> extends Either<A, B> {
//# Either#ap :: Either a (b -> c) ~> Either a b -> Either a c
  ap: <A>(value: Either<A, M>) => Either<A, N>;
}

//# EitherType :: Type -> Type -> Type
//# Either :: TypeRep Either
export interface Either<A, B> {
//# Either#@@type :: String
//# Either#isLeft :: Boolean
  isLeft: boolean;

//# Either#isRight :: Boolean
  isRight: boolean;

//# Either#chain :: Either a b ~> (b -> Either a c) -> Either a c
  chain<C>(mapFn: (b: B) => Either<A, C>): Either<A, C>;

//# Either#equals :: Either a b ~> c -> Boolean
  equals(toTest: any): boolean;

//# Either#extend :: Either a b ~> (Either a b -> b) -> Either a b
  extend(fn: (a: Either<A, B>)=>B): Either<A, B>;

//# Either#map :: Either a b ~> (b -> c) -> Either a c
  map<C>(fn: (b: B)=>C): Either<A, C>;

//# Either#of :: Either a b ~> c -> Either a c
  // Doesn't support type classes (e.g. semigroup).
  of<C>(newRight: C): Either<A, C>;

//# Either#reduce :: Either a b ~> ((c, b) -> c) -> c -> c
  reduce<C>(reducer: (acc: C, item: B) => C, zero: C): C;

//# Either#sequence :: Applicative f => Either a (f b) ~> (b -> f b) -> f (Either a b)
  // TODO

//# Either#toBoolean :: Either a b ~> Boolean
  toBoolean(): boolean;

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

export interface Alternative<A> {
  toBoolean(): boolean;
}

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
//is(typeRep: TypeRep<any>, toTest: any): boolean;
  is(typeRep: any, toTest: any): boolean;

//. ### Combinator
//# I :: a -> a
  I<A>(a: A): A;

//# K :: a -> b -> a
  K<A, B>(a: A, b?: B): A;

//# A :: (a -> b) -> a -> b
  A<A, B>(fn: (a: A) => B, a: A): B;

//# T :: a -> (a -> b) -> b
  T<A, B>(a: A, fn: (a: A) => B): B;

//# C :: (a -> b -> c) -> b -> a -> c
  C<A, B, C>(fn: (a: A)=>(b: B)=>C, b: B, a: A): C;

//# B :: (b -> c) -> (a -> b) -> a -> c
  B<A, B, C>(f: (b: B)=>C, g: (a: A)=>B, value: A): C;

//# S :: (a -> b -> c) -> (a -> b) -> a -> c
  S<A, B, C>(bin: (a: A)=>(b: B)=>C, un: (a: A)=>B, value: A): C;

//. ### Function
//# flip :: ((a, b) -> c) -> b -> a -> c
  flip<A, B, C>(fn: (a: A, b: B) => C): (b: B, a: A) => C;


// TODO: very loosely typed. check if it could be typed better

//# lift :: Functor f => (a -> b) -> f a -> f b
  lift<A, B, C extends Functor<A>, D extends C>(fn: (a: A) => B, fa: C): D;

//# lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
  lift2<A, B, C, D extends Functor<A>, E extends Functor<B>>(fn: (a: A) => (b: B) => C, fa: D, fb: E): any;

//# lift3 :: Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d
  lift3<A, B, C, D, E extends Functor<A>, F extends Functor<B>, G extends Functor<C>>(fn: (a: A) => (b: B) => (c: C) => D, fa: E, fb: F, fc: G): any;


//. ### Composition
//# compose :: (b -> c) -> (a -> b) -> a -> c
  compose<A, B, C>(f: (b: B)=>C, g: (a: A) => B): (a: A)=>C;

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

//# meld :: [** -> *] -> (* -> * -> ... -> *)
// Jesus, this one is even worse than the pipe thingy. Only few most common cases for now.
// TODO: remove when removed from library
// 1
  meld<A, B>(functions: [(a: A)=>B]): (a: A)=>B;
// 1, 1
  meld<A, B, C>(functions: [(a: A)=>B, (b: B)=>C]): (a: A)=>C;
// 2
  meld<A, B, C>(functions: [(a: A, b: B)=>C]): (a: A, b: B)=>C;
// 2, 2
  meld<A, B, C, D, E>(functions: [(a: A, b: B)=>C, (c: C, d: D)=>E]): (a: A, b: B, d: D)=>E;

//# MaybeType :: Type -> Type
  Maybe: MaybeStatic;

//# Nothing :: -> Maybe a
  Nothing<A extends Semigroup<any>>(): MaybeSemigroup<A>; // isn't working as expected
  Nothing<A>(): Maybe<A>;
  Nothing(): Maybe<any>;

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


//. ### Alternative
//# and :: Alternative a => a -> a -> a
  and<A extends Alternative<A>>(first: A, second: A): A;

//# or :: Alternative a => a -> a -> a
  or<A extends Alternative<A>>(first: A, second: A): A;

//# xor :: (Alternative a, Monoid a) => a -> a -> a
  xor<A extends Alternative<A>>(first: A, second: A): A;


//. ### Logic
//# not :: Boolean -> Boolean
  not(input: boolean): boolean;

//# ifElse :: (a -> Boolean) -> (a -> b) -> (a -> b) -> a -> b
  ifElse<A, B>(predicate: (testInput: A) => boolean, successProcessor: (input: A) => B, failureProcessor: (input: A) => B, value: A): B;

//# allPass :: Array (a -> Boolean) -> a -> Boolean
  allPass<A>(input: Array<(testInput: A) => boolean>, value: A): boolean;

//# anyPass :: Array (a -> Boolean) -> a -> Boolean
  anyPass<A>(input: Array<(testInput: A) => boolean>, value: A): boolean;


//. ### List
//# concat :: Semigroup a => a -> a -> a
  concat<A extends Semigroup<any>> (first: A, second: A): A;

//# slice :: Integer -> Integer -> [a] -> Maybe [a]
  slice<A>(startIndex: number, endIndex: number, input: A[]): Maybe<A[]>;

//# at :: Integer -> [a] -> Maybe a
  at<A>(index: number, input: A[]): Maybe<A>;

//# head :: [a] -> Maybe a
  head<A>(input: A[]): Maybe<A>;

//# last :: [a] -> Maybe a
  last<A>(input: A[]): Maybe<A>;

//# tail :: [a] -> Maybe [a]
  tail<A>(input: A[]): Maybe<A[]>;

//# init :: [a] -> Maybe [a]
  init<A>(input: A[]): Maybe<A[]>;

//# take :: Integer -> [a] -> Maybe [a]
  take<A>(length: number, input: A[]): Maybe<A[]>;

//# takeLast :: Integer -> [a] -> Maybe [a]
  takeLast<A>(length: number, input: A[]): Maybe<A[]>;

//# drop :: Integer -> [a] -> Maybe [a]
  drop<A>(length: number, input: A[]): Maybe<A[]>;

//# dropLast :: Integer -> [a] -> Maybe [a]
  dropLast<A>(length: number, input: A[]): Maybe<A[]>;

//# reverse :: [a] -> [a]
  reverse<A>(input: A[]): A[];

//# indexOf :: a -> [a] -> Maybe Integer
  indexOf<A>(needle: A, input: A[]): Maybe<number>;

//# lastIndexOf :: a -> [a] -> Maybe Integer
  lastIndexOf<A>(needle: A, input: A[]): Maybe<number>;


//. ### Array
//# append :: a -> Array a -> Array a
  append<A>(item: A, array: A[]): A[];

//# prepend :: a -> Array a -> Array a
  prepend<A>(item: A, array: A[]): A[];

//# find :: (a -> Boolean) -> Array a -> Maybe a
  find<A>(pred: (item: A) => boolean, array: A[]): Maybe<A>;

//# pluck :: Accessible a => TypeRep b -> String -> Array a -> Array (Maybe b)
  pluck<B>(typeRep: any, propName: string, array: any[]): Maybe<B> [];

//# reduce :: Foldable f => (a -> b -> a) -> a -> f b -> a
  reduce<A, B>(reducer: (acc: A) => (item: B) => A, zero: A, foldable: Foldable<B>): A;

//# reduce_ :: Foldable f => ((a, b) -> a) -> a -> f b -> a
  reduce_<A, B>(reducer: (acc: A, item: B) => A, zero: A, foldable: Foldable<B>): A;

//# unfoldr :: (b -> Maybe (Pair a b)) -> b -> Array a
  unfoldr<A, B>(fn: (acc: B) => Maybe<[A, B]>, seed: B): A[]; // could be inference improved?

//# range :: Integer -> Integer -> Array Integer
  range(start: number, stop: number): number[];

//. ### Object
//# prop :: Accessible a => String -> a -> b
  prop<B>(propName: string, object: Object): B;

//# get :: Accessible a => TypeRep b -> String -> a -> Maybe b
// get<B>(typeRep: TypeRep<B>, propName: string, object: Object): Maybe<B>;
  get<B>(typeRep: any, propName: string, object: Object): Maybe<B>;

//# gets :: Accessible a => TypeRep b -> Array String -> a -> Maybe b
  gets<B>(typeRep: any, path: string[], object: Object): Maybe<B>;

//# keys :: StrMap a -> Array String
  keys(object: Object): string[];

//# values :: StrMap a -> Array a
  values(object: Object): string[];

//# pairs :: StrMap a -> Array (Pair String a)
  pairs(object: Object): [string, any][];


//. ### Number
//# negate :: ValidNumber -> ValidNumber
  negate(num: number): number;

//# add :: FiniteNumber -> FiniteNumber -> FiniteNumber
  add(first: number, second: number): number;

//# sum :: Foldable f => f FiniteNumber -> FiniteNumber
  sum(f: Foldable<number>): number;

//# sub :: FiniteNumber -> FiniteNumber -> FiniteNumber
  sub(first: number, second: number): number;

//# inc :: FiniteNumber -> FiniteNumber
  inc(num: number): number;

//# dec :: FiniteNumber -> FiniteNumber
  dec(num: number): number;

//# mult :: FiniteNumber -> FiniteNumber -> FiniteNumber
  mult(first: number, second: number): number;

//# product :: Foldable f => f FiniteNumber -> FiniteNumber
  product(f: Foldable<number>): number;

//# div :: FiniteNumber -> NonZeroFiniteNumber -> FiniteNumber
  div(first: number, second: number): number;

//# min :: Ord a => a -> a -> a
  min(first: number, second: number): number;

//# max :: Ord a => a -> a -> a
  max(first: number, second: number): number;


//. ### Integer
//# even :: Integer -> Boolean
  even(num: number): boolean;

//# odd :: Integer -> Boolean
  odd(num: number): boolean;


//. ### Parse
//# parseDate :: String -> Maybe Date
  parseDate(input: string): Date;

//# parseFloat :: String -> Maybe Number
  parseFloat(input: string): number;

//# parseInt :: Integer -> String -> Maybe Integer
  parseInt(input: string): number;

//# parseJson :: TypeRep a -> String -> Maybe a
// parseJson<A>(typeRep: TypeRep<A>, input: string): Maybe<A>;
  parseJson<A>(typeRep: any, input: string): Maybe<A>;


//. ### RegExp
//# regex :: RegexFlags -> String -> RegExp
  regex(flags: string, input: string): RegExp;

//# regexEscape :: String -> String
  regexEscape(input: string): string;

//# test :: RegExp -> String -> Boolean
  test(regex: RegExp, input: string): boolean;

//# match :: RegExp -> String -> Maybe (Array (Maybe String))
  match(regex: RegExp, input: string): Maybe<Array<Maybe<string>>>


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
