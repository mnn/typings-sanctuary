#!/usr/bin/env runhaskell
module Pipe where

import           Data.Char
import           Data.List
import           Flow

windows :: Int -> [a] -> [[a]]
windows n = tails .> map (take n) .> filter (\xs->length xs == n)

gen :: Int -> [String]
gen n = map genOne [1..n]
  where
    genOne :: Int -> String
    genOne i = let
      typeVars = (['A'..'Y'] |> take i |> map (: []))
      typeVarsWithZ = typeVars ++ ["Z"]
      mainFnSig = intersperse ", " typeVarsWithZ |> concat
      constructSignature xs = let a = xs!!0; b = xs!!1 in "(" ++ map toLower a ++ ": " ++ a ++ ")=>" ++ b
      fnSigs = typeVarsWithZ |> windows 2 |> map constructSignature |> intersperse ", " |> concat
        in "export function pipe<" ++ mainFnSig ++ ">(functions: [" ++ fnSigs ++"]): (a: A)=>Z;"

main :: IO ()
main = mapM_ putStrLn $ gen 25
