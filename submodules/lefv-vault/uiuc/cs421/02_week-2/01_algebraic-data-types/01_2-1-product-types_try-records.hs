-- add and mylookup using records

data Definition k v = Definition { key :: k, value :: v }
   deriving (Show)

-- k is the type of keys,
-- v is the type of values.

add :: k -> v -> [Definition k v] -> [Definition k v]
add k v xx = (Definition k v):xx

-- Here we have to use `Eq a =>` to indicate that equality is defined for the type of keys.

mylookup :: Eq k => k -> [Definition k v] -> v
mylookup a (x:xs) | key x == a  = value x
                  | otherwise   = mylookup a xs
