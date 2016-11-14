// Type definitions for Sanctuary
// Project: typings-sanctuary
// Definitions by: monnef <http://monnef.tk>

// template: http://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html

export as namespace S;

type SanctuaryType = any;
type SanctuaryModule = any; // TODO: should be same as namespace S

/* attempts at typing type ref
 interface TypeRep<T> {
 '@@type': string;
 }

 interface String extends TypeRep<String> {
 }

 interface Number extends TypeRep<Number> {
 }
 */


//# create :: { checkTypes :: Boolean, env :: Array Type } -> Module
export function create(properties: {checkTypes: boolean, env: SanctuaryType[]}): SanctuaryModule;

//# env :: Array Type
export function env(): SanctuaryType[];

//. ### Classify
//# type :: a -> String
export function type(input: any): string;

//# is :: TypeRep a -> b -> Boolean
//export function is(typeRep: TypeRep<any>, toTest: any): boolean;
export function is(typeRep: any, toTest: any): boolean;

//. ### Combinator
//# I :: a -> a
export function I<A>(a: A): A;

//# K :: a -> b -> a
export function K<A, B>(a: A, b?: B): A;

//# A :: (a -> b) -> a -> b
export function A<A, B>(fn: (a: A) => B, a: A): B;

//# T :: a -> (a -> b) -> b
export function T<A, B>(a: A, fn: (a: A) => B): B;

//# C :: (a -> b -> c) -> b -> a -> c
export function C<A, B, C>(fn: (a: A, b: B) => C, b: B, a: A): C;

//# B :: (b -> c) -> (a -> b) -> a -> c
export function B<A, B, C>(f: (b: B) => C, g: (a: A)=>B, value: A): C;

//# S :: (a -> b -> c) -> (a -> b) -> a -> c
export function S<A, B, C>(bin: (a: A, b: B)=>C, un: (a: A)=>B, value: A): C;

//. ### Function
//# flip :: ((a, b) -> c) -> b -> a -> c
export function flip<A, B, C>(fn: (a: A, b: B) => C): (b: B, a: A) => C;

interface Functor<F> {
}

// TODO: very loosely typed. check if it could not be typed better

//# lift :: Functor f => (a -> b) -> f a -> f b
export function lift<A, B, C extends Functor<A>, D extends C>(fn: (a: A) => B, fa: C): D;

//# lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
export function lift2<A, B, C, D extends Functor<A>, E extends Functor<B>>(fn: (a: A, b: B) => C, fa: D, fb: E): any;

//# lift3 :: Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d
export function lift3<A, B, C, D, E extends Functor<A>, F extends Functor<B>, G extends Functor<C>>(fn: (a: A, b: B, c: C) => D, fa: E, fb: F, fc: G): any;


//. ### Composition
//# compose :: (b -> c) -> (a -> b) -> a -> c
export function compose<A, B, C>(f: (b: B)=>C, g: (a: A) => B): (a: A)=>C;

//# pipe :: [(a -> b), (b -> c), ..., (m -> n)] -> a -> n
export function pipe<A, Z>(functions: [(a: A)=>Z]): (a: A)=>Z;
export function pipe<A, B, Z>(functions: [(a: A)=>B, (b: B)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>U, (u: U)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>U, (u: U)=>V, (v: V)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>U, (u: U)=>V, (v: V)=>W, (w: W)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>U, (u: U)=>V, (v: V)=>W, (w: W)=>X, (x: X)=>Z]): (a: A)=>Z;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>(functions: [(a: A)=>B, (b: B)=>C, (c: C)=>D, (d: D)=>E, (e: E)=>F, (f: F)=>G, (g: G)=>H, (h: H)=>I, (i: I)=>J, (j: J)=>K, (k: K)=>L, (l: L)=>M, (m: M)=>N, (n: N)=>O, (o: O)=>P, (p: P)=>Q, (q: Q)=>R, (r: R)=>S, (s: S)=>T, (t: T)=>U, (u: U)=>V, (v: V)=>W, (w: W)=>X, (x: X)=>Y, (y: Y)=>Z]): (a: A)=>Z;
// export function pipe<A, Z>(functions: Array<(any)=>any>): (A)=>Z;

//# meld :: [** -> *] -> (* -> * -> ... -> *)
// Jesus, this one is even worse than the pipe thingy. Only few most common cases for now.
// TODO: generate signatures
// 1
export function meld<A, B>(functions: [(a: A)=>B]): (a: A)=>B;
// 1, 1
export function meld<A, B, C>(functions: [(a: A)=>B, (b: B)=>C]): (a: A)=>C;
// 2
export function meld<A, B, C>(functions: [(a: A, b: B)=>C]): (a: A, b: B)=>C;
// 2, 2
export function meld<A, B, C, D, E>(functions: [(a: A, b: B)=>C, (c: C, d: D)=>E]): (a: A, b: B, d: D)=>E;


//. ### Maybe type
//# MaybeType :: Type -> Type
//# Maybe :: TypeRep Maybe
declare namespace Maybe {
//# Maybe.empty :: -> Maybe a
  export function empty<A>(): Maybe<A>;

//# Maybe.of :: a -> Maybe a
  export function of<A, B, T extends (a: A)=>B>(input: T): MaybeFunc<A, B, T>;
  export function of<S, A extends Semigroup<S>>(input: A): MaybeSemigroup<A>;
  export function of<A>(input: A): Maybe<A>;
}

interface MaybeFunc<M, N, T extends (m: M)=>N> extends Maybe<T> {
//# Maybe#ap :: Maybe (a -> b) ~> Maybe a -> Maybe b
  ap: (value: Maybe<M>) => Maybe<N>;
}

interface Semigroup<T> {
  concat: (other: Semigroup<T>) => Semigroup<T>;
}

interface MaybeSemigroup<T extends Semigroup<T>> extends Maybe<T> {
  concat(other: MaybeSemigroup<T>): MaybeSemigroup<T>;
  concat(other: Maybe<T>): Maybe<T>;
}

interface Applicative<T> {
}

interface Maybe<A> extends Functor<A>, Foldable<A> {
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
  sequence: (fn: (value: A) => Applicative<A>) => Applicative<Maybe<A>>; // TODO: is it right?

//# Maybe#toBoolean :: Maybe a ~> Boolean
  toBoolean: () => boolean;

//# Maybe#toString :: Maybe a ~> String
  toString: () => string;

//# Maybe#inspect :: Maybe a ~> String
  inspect: () => string;
}
//# Nothing :: -> Maybe a
export function Nothing<A extends Semigroup<any>>(): MaybeSemigroup<A>; // isn't working as expected
export function Nothing<A>(): Maybe<A>;
export function Nothing(): Maybe<any>;

//# Just :: a -> Maybe a
export function Just<A, B, T extends (a: A)=>B>(input: T): MaybeFunc<A, B, T>;
export function Just<S, A extends Semigroup<S>>(input: A): MaybeSemigroup<A>;
export function Just<A>(input: A): Maybe<A>;

//# isNothing :: Maybe a -> Boolean
//# isJust :: Maybe a -> Boolean
//# fromMaybe :: a -> Maybe a -> a
//# maybeToNullable :: Maybe a -> Nullable a
//# toMaybe :: a? -> Maybe a
//# maybe :: b -> (a -> b) -> Maybe a -> b
//# justs :: Array (Maybe a) -> Array a
//# mapMaybe :: (a -> Maybe b) -> Array a -> Array b
//# encase :: (a -> b) -> a -> Maybe b
//# encase2 :: (a -> b -> c) -> a -> b -> Maybe c
//# encase2_ :: ((a, b) -> c) -> a -> b -> Maybe c
//# encase3 :: (a -> b -> c -> d) -> a -> b -> c -> Maybe d
//# encase3_ :: ((a, b, c) -> d) -> a -> b -> c -> Maybe d
//# maybeToEither :: a -> Maybe b -> Either a b


//. ### Either type
//# EitherType :: Type -> Type -> Type
//# Either :: TypeRep Either
//# Either.of :: b -> Either a b
//# Either#@@type :: String
//# Either#isLeft :: Boolean
//# Either#isRight :: Boolean
//# Either#ap :: Either a (b -> c) ~> Either a b -> Either a c
//# Either#chain :: Either a b ~> (b -> Either a c) -> Either a c
//# Either#concat :: (Semigroup a, Semigroup b) => Either a b ~> Either a b -> Either a b
//# Either#equals :: Either a b ~> c -> Boolean
//# Either#extend :: Either a b ~> (Either a b -> b) -> Either a b
//# Either#map :: Either a b ~> (b -> c) -> Either a c
//# Either#of :: Either a b ~> c -> Either a c
//# Either#reduce :: Either a b ~> ((c, b) -> c) -> c -> c
//# Either#sequence :: Applicative f => Either a (f b) ~> (b -> f b) -> f (Either a b)
//# Either#toBoolean :: Either a b ~> Boolean
//# Either#toString :: Either a b ~> String
//# Either#inspect :: Either a b ~> String
//# Left :: a -> Either a b
//# Right :: b -> Either a b
//# isLeft :: Either a b -> Boolean
//# isRight :: Either a b -> Boolean
//# either :: (a -> c) -> (b -> c) -> Either a b -> c
//# lefts :: Array (Either a b) -> Array a
//# rights :: Array (Either a b) -> Array b
//# encaseEither :: (Error -> l) -> (a -> r) -> a -> Either l r
//# encaseEither2 :: (Error -> l) -> (a -> b -> r) -> a -> b -> Either l r
//# encaseEither2_ :: (Error -> l) -> ((a, b) -> r) -> a -> b -> Either l r
//# encaseEither3 :: (Error -> l) -> (a -> b -> c -> r) -> a -> b -> c -> Either l r
//# encaseEither3_ :: (Error -> l) -> ((a, b, c) -> r) -> a -> b -> c -> Either l r
//# eitherToMaybe :: Either a b -> Maybe b


//. ### Alternative
//# and :: Alternative a => a -> a -> a
export function and<A>(first: A | null | undefined, second: A | null | undefined): A;

//# or :: Alternative a => a -> a -> a
export function or<A>(first: A | null | undefined, second: A | null | undefined): A;

//# xor :: (Alternative a, Monoid a) => a -> a -> a
export function xor<A>(first: A | null | undefined, second?: A | null | undefined): A;


//. ### Logic
//# not :: Boolean -> Boolean
export function not(input: boolean): boolean;

//# ifElse :: (a -> Boolean) -> (a -> b) -> (a -> b) -> a -> b
export function ifElse<A, B>(predicate: (testInput: A) => boolean, successProcessor: (input: A) => B, failureProcessor: (input: A) => B, value: A): B;

//# allPass :: Array (a -> Boolean) -> a -> Boolean
export function allPass<A>(input: Array<(testInput: A) => boolean>, value: A): boolean;

//# anyPass :: Array (a -> Boolean) -> a -> Boolean
export function anyPass<A>(input: Array<(testInput: A) => boolean>, value: A): boolean;


//. ### List
//# concat :: Semigroup a => a -> a -> a
export function concat<A extends Semigroup<any>>(first: A, second: A): A;

//# slice :: Integer -> Integer -> [a] -> Maybe [a]
export function slice<A>(startIndex: number, endIndex: number, input: A[]): Maybe<A[]>;

//# at :: Integer -> [a] -> Maybe a
export function at<A>(index: number, input: A[]): Maybe<A>;

//# head :: [a] -> Maybe a
export function head<A>(input: A[]): Maybe<A>;

//# last :: [a] -> Maybe a
export function last<A>(input: A[]): Maybe<A>;

//# tail :: [a] -> Maybe [a]
export function tail<A>(input: A[]): Maybe<A[]>;

//# init :: [a] -> Maybe [a]
export function init<A>(input: A[]): Maybe<A[]>;

//# take :: Integer -> [a] -> Maybe [a]
export function take<A>(length: number, input: A[]): Maybe<A[]>;

//# takeLast :: Integer -> [a] -> Maybe [a]
export function takeLast<A>(length: number, input: A[]): Maybe<A[]>;

//# drop :: Integer -> [a] -> Maybe [a]
export function drop<A>(length: number, input: A[]): Maybe<A[]>;

//# dropLast :: Integer -> [a] -> Maybe [a]
export function dropLast<A>(length: number, input: A[]): Maybe<A[]>;

//# reverse :: [a] -> [a]
export function reverse<A>(input: A[]): A[];

//# indexOf :: a -> [a] -> Maybe Integer
export function indexOf<A>(needle: A, input: A[]): Maybe<number>;

//# lastIndexOf :: a -> [a] -> Maybe Integer
export function lastIndexOf<A>(needle: A, input: A[]): Maybe<number>;


//. ### Array
//# append :: a -> Array a -> Array a
export function append<A>(item: A, array: A[]): A[];

//# prepend :: a -> Array a -> Array a
export function prepend<A>(item: A, array: A[]): A[];

//# find :: (a -> Boolean) -> Array a -> Maybe a
export function find<A>(pred: (item: A) => boolean, array: A[]): Maybe<A>;

//# pluck :: Accessible a => TypeRep b -> String -> Array a -> Array (Maybe b)
export function pluck<B>(typeRep: any, propName: string, array: any[]): Maybe<B>[];

//# reduce :: Foldable f => (a -> b -> a) -> a -> f b -> a
export function reduce<A, B>(reducer: (acc: A) => (item: B) => A, zero: A, foldable: Foldable<B>): A;

//# reduce_ :: Foldable f => ((a, b) -> a) -> a -> f b -> a
export function reduce_<A, B>(reducer: (acc: A, item: B) => A, zero: A, foldable: Foldable<B>): A;

//# unfoldr :: (b -> Maybe (Pair a b)) -> b -> Array a
export function unfoldr<A, B>(fn: (acc: B) => Maybe<[A, B]>, seed: B): A[]; // could be inference improved?

//# range :: Integer -> Integer -> Array Integer
export function range(start: number, stop: number): number[];

//. ### Object
//# prop :: Accessible a => String -> a -> b
export function prop<B>(propName: string, object: Object): B;

//# get :: Accessible a => TypeRep b -> String -> a -> Maybe b
// export function get<B>(typeRep: TypeRep<B>, propName: string, object: Object): Maybe<B>;
export function get<B>(typeRep: any, propName: string, object: Object): Maybe<B>;

//# gets :: Accessible a => TypeRep b -> Array String -> a -> Maybe b
export function gets<B>(typeRep: any, path: string[], object: Object): Maybe<B>;

//# keys :: StrMap a -> Array String
export function keys(object: Object): string[];

//# values :: StrMap a -> Array a
export function values(object: Object): string[];

//# pairs :: StrMap a -> Array (Pair String a)
export function pairs(object: Object): [string, any][];


//. ### Number
//# negate :: ValidNumber -> ValidNumber
export function negate(num: number): number;

//# add :: FiniteNumber -> FiniteNumber -> FiniteNumber
export function add(first: number, second: number): number;

interface Foldable<F> {
  reduce<A>(fn: (acc: A, item: F) => A, zero: A): A;
}

//# sum :: Foldable f => f FiniteNumber -> FiniteNumber
export function sum(f: Foldable<number>): number;

//# sub :: FiniteNumber -> FiniteNumber -> FiniteNumber
export function sub(first: number, second: number): number;

//# inc :: FiniteNumber -> FiniteNumber
export function inc(num: number): number;

//# dec :: FiniteNumber -> FiniteNumber
export function dec(num: number): number;

//# mult :: FiniteNumber -> FiniteNumber -> FiniteNumber
export function mult(first: number, second: number): number;

//# product :: Foldable f => f FiniteNumber -> FiniteNumber
export function product(f: Foldable<number>): number;

//# div :: FiniteNumber -> NonZeroFiniteNumber -> FiniteNumber
export function div(first: number, second: number): number;

//# min :: Ord a => a -> a -> a
export function min(first: number, second: number): number;

//# max :: Ord a => a -> a -> a
export function max(first: number, second: number): number;


//. ### Integer
//# even :: Integer -> Boolean
export function even(num: number): boolean;

//# odd :: Integer -> Boolean
export function odd(num: number): boolean;


//. ### Parse
//# parseDate :: String -> Maybe Date
export function parseDate(input: string): Date;

//# parseFloat :: String -> Maybe Number
export function parseFloat(input: string): number;

//# parseInt :: Integer -> String -> Maybe Integer
export function parseInt(input: string): number;

//# parseJson :: TypeRep a -> String -> Maybe a
// export function parseJson<A>(typeRep: TypeRep<A>, input: string): Maybe<A>;
export function parseJson<A>(typeRep: any, input: string): Maybe<A>;


//. ### RegExp
//# regex :: RegexFlags -> String -> RegExp
export function regex(flags: string, input: string): RegExp;

//# regexEscape :: String -> String
export function regexEscape(input: string): string;

//# test :: RegExp -> String -> Boolean
export function test(regex: RegExp, input: string): boolean;

//# match :: RegExp -> String -> Maybe (Array (Maybe String))
export function match(regex: RegExp, input: string): Maybe<Array<Maybe<string>>>


//. ### String
//# toUpper :: String -> String
export function toUpper(input: string): string;

//# toLower :: String -> String
export function toLower(input: string): string;

//# trim :: String -> String
export function trim(input: string): string;

//# words :: String -> Array String
export function words(input: string): string[];

//# unwords :: Array String -> String
export function unwords(input: string[]): string;

//# lines :: String -> Array String
export function lines(input: string): string[];

//# unlines :: Array String -> String
export function unlines(input: string[]): string;
