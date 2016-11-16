export interface Sanctuary {
  Just: <A>(x: A) => Maybe<A>;
}

export interface Maybe<A> {
  of: <B>(value: B) => Maybe<B>;
}

type SanctuaryType = any;

interface SanctuaryModule {
  create(properties: {checkTypes: boolean, env: SanctuaryType[]}): Sanctuary;
  env: SanctuaryType[];
}
