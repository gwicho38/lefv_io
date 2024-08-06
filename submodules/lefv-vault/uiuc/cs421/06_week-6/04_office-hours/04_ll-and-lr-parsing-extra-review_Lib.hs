module Lib
    ( Exp(..)
    , parse
    ) where

import Text.Regex.TDFA

isInt :: String -> Bool
isInt i = i =~ "[0-9]+"

-- Grammar
--
-- E -> + E E
--    | int
--    | var
--    | let var E E

data Exp = PlusExp Exp Exp
         | IntExp Integer
         | VarExp String
         | LetExp String Exp Exp
    deriving (Show,Eq)

--words :: String -> [String]
--words breaks a string up into a list of words, which were delimited by white space (as defined by isSpace).
-- This function trims any white spaces at the beginning and at the end.
parse xx = parseE (words xx)

parseE :: [String] -> (Exp, [String])
parseE ("+":xs) = 
  let (e1, r1) = parseE xs
      (e2, r2) = parseE r1
  in (PlusExp e1 e2, r2)
parseE ("let":xs) = 
  let ((VarExp e1), r1) = parseE xs
      (e2, r2) = parseE r1
      (e3, r3) = parseE r2
  in (LetExp e1 e2 e3, r3)
parseE (x:xs) | isInt x = (IntExp (read x), xs)
              | otherwise = (VarExp x, xs)

