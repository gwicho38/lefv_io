-- add and mylookup using lists.
-- a is the type of keys,
-- b is the type of values.
-- In real Hakell programming we might have used `k` and `v` for the names of the types
-- as well as the names of the variables, but this can be confusing for new Haskell programmers.

add :: a -> b -> [(a,b)] -> [(a,b)]
add k v xx = (k,v):xx

-- Here we have to use `Eq a =>` to indicate that equality is defined for the type of keys.

mylookup :: Eq a => a -> [(a,b)] -> b
mylookup a ((k,v):xx) | a == k    = v
                      | otherwise = mylookup a xx
