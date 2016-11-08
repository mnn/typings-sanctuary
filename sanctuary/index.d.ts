// Type definitions for Sanctuary
// Project: typings-sanctuary
// Definitions by: monnef <http://monnef.tk>

// template: http://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html

export as namespace S;

type SanctuaryType = any;
type SanctuaryModule = any; // TODO: should be same as namespace S

//# create :: { checkTypes :: Boolean, env :: Array Type } -> Module
export function create(properties: {checkTypes: boolean, env: SanctuaryType[]}): SanctuaryModule;

//# env :: Array Type
export function env(): SanctuaryType[];

//. ### Classify
//# type :: a -> String
export function type(input: any): string;

//# is :: TypeRep a -> b -> Boolean
export function is(typeRep: any, toTest: any): boolean;

//. ### Combinator
//# I :: a -> a
//# K :: a -> b -> a
//# A :: (a -> b) -> a -> b
//# T :: a -> (a -> b) -> b
//# C :: (a -> b -> c) -> b -> a -> c
//# B :: (b -> c) -> (a -> b) -> a -> c
//# S :: (a -> b -> c) -> (a -> b) -> a -> c


//. ### Function
//# flip :: ((a, b) -> c) -> b -> a -> c
//# lift :: Functor f => (a -> b) -> f a -> f b
//# lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
//# lift3 :: Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d


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

// declare global {
//   interface Array<T> extends Semigroup<T> {
//   }
// }

interface MaybeSemigroup<T extends Semigroup<T>> extends Maybe<T> {
  concat(other: MaybeSemigroup<T>): MaybeSemigroup<T>;
  concat(other: Maybe<T>): Maybe<T>;
}

interface Maybe<A> {
  // TODO: not sure if TypeScript allows it
//# Maybe#@@type :: String

//# Maybe#isNothing :: Boolean
  isNothing: boolean;

//# Maybe#isJust :: Boolean
  isJust: boolean;

//# Maybe#chain :: Maybe a ~> (a -> Maybe b) -> Maybe b
  chain: <B>(fn: (a: A) => Maybe<B>) => Maybe<B>;

//# Maybe#empty :: Maybe a ~> Maybe a
//# Maybe#equals :: Maybe a ~> b -> Boolean
//# Maybe#extend :: Maybe a ~> (Maybe a -> a) -> Maybe a
//# Maybe#filter :: Maybe a ~> (a -> Boolean) -> Maybe a
//# Maybe#map :: Maybe a ~> (a -> b) -> Maybe b
//# Maybe#of :: Maybe a ~> b -> Maybe b
//# Maybe#reduce :: Maybe a ~> ((b, a) -> b) -> b -> b
//# Maybe#sequence :: Applicative f => Maybe (f a) ~> (a -> f a) -> f (Maybe a)
//# Maybe#toBoolean :: Maybe a ~> Boolean
//# Maybe#toString :: Maybe a ~> String
//# Maybe#inspect :: Maybe a ~> String
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
//# or :: Alternative a => a -> a -> a
//# xor :: (Alternative a, Monoid a) => a -> a -> a


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
//# slice :: Integer -> Integer -> [a] -> Maybe [a]
//# at :: Integer -> [a] -> Maybe a
//# head :: [a] -> Maybe a
//# last :: [a] -> Maybe a
//# tail :: [a] -> Maybe [a]
//# init :: [a] -> Maybe [a]
//# take :: Integer -> [a] -> Maybe [a]
//# takeLast :: Integer -> [a] -> Maybe [a]
//# drop :: Integer -> [a] -> Maybe [a]
//# dropLast :: Integer -> [a] -> Maybe [a]
//# reverse :: [a] -> [a]
//# indexOf :: a -> [a] -> Maybe Integer
//# lastIndexOf :: a -> [a] -> Maybe Integer


//. ### Array
//# append :: a -> Array a -> Array a
//# prepend :: a -> Array a -> Array a
//# find :: (a -> Boolean) -> Array a -> Maybe a
//# pluck :: Accessible a => TypeRep b -> String -> Array a -> Array (Maybe b)
//# reduce :: Foldable f => (a -> b -> a) -> a -> f b -> a
//# reduce_ :: Foldable f => ((a, b) -> a) -> a -> f b -> a
//# unfoldr :: (b -> Maybe (Pair a b)) -> b -> Array a
//# range :: Integer -> Integer -> Array Integer


//. ### Object
//# prop :: Accessible a => String -> a -> b
//# get :: Accessible a => TypeRep b -> String -> a -> Maybe b
//# gets :: Accessible a => TypeRep b -> Array String -> a -> Maybe b
//# keys :: StrMap a -> Array String
//# values :: StrMap a -> Array a
//# pairs :: StrMap a -> Array (Pair String a)


//. ### Number
//# negate :: ValidNumber -> ValidNumber
//# add :: FiniteNumber -> FiniteNumber -> FiniteNumber
//# sum :: Foldable f => f FiniteNumber -> FiniteNumber
//# sub :: FiniteNumber -> FiniteNumber -> FiniteNumber
//# inc :: FiniteNumber -> FiniteNumber
//# dec :: FiniteNumber -> FiniteNumber
//# mult :: FiniteNumber -> FiniteNumber -> FiniteNumber
//# product :: Foldable f => f FiniteNumber -> FiniteNumber
//# div :: FiniteNumber -> NonZeroFiniteNumber -> FiniteNumber
//# min :: Ord a => a -> a -> a
//# max :: Ord a => a -> a -> a


//. ### Integer
//# even :: Integer -> Boolean
//# odd :: Integer -> Boolean


//. ### Parse
//# parseDate :: String -> Maybe Date
//# parseFloat :: String -> Maybe Number
//# parseInt :: Integer -> String -> Maybe Integer
//# parseJson :: TypeRep a -> String -> Maybe a


//. ### RegExp
//# regex :: RegexFlags -> String -> RegExp
//# regexEscape :: String -> String
//# test :: RegExp -> String -> Boolean
//# match :: RegExp -> String -> Maybe (Array (Maybe String))


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
