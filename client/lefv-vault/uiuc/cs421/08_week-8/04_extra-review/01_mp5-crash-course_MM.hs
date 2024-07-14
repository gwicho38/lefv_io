-- DATA TYPES FOR MP5

{--
    type EvalState a = StateT Env (Except Diagnostic) a
 
    EvalState` is a state encapsulating the evaluation result of type `a` and
    the environment of type `Env`, except when a `Diagnostic` is thown along the
    evaluation

   type Env = H.HashMap String Val

   data Val = Symbol String
           | Boolean Bool
           | Number Int
           | Nil     
           | Pair Val Val   
           | PrimFunc ([Val] -> EvalState Val)  -- Primitive func impl'ed in Haskell
           | Func [String] Val Env              -- Closure
           | Macro [String] Val                 -- Macro
           | Void                               -- No value

    * PAY ATTENTION TO THE CONSTRUCTORS HERE, MAKES IT EASIER TO PATTERN MATCH AND DO THE REST*


 (We also have Diagnostic)


(Reminder for the main part of our program, our eval signatures)
-- eval :: Val -> EvalState Val
-- evalList :: [Val] -> EvalState Val

--}




-- MONAD OPERATIONS THAT ARE GOOD TO KNOW/REMEMBER
{--

return :: Monad m => a -> m a
    -- takes a "ground value" and lifts it into the monad
    -- probably will be good when we're return a monad 
    --    e.g. when we have a Val and we're needing to return a EvalState Val 

(<$>) / fmap :: Functor m => (a -> b) -> m a -> m b
    -- take a "ground level" (a->b) function with a Functor (our monad) of a, then puts the result
       in a Functor
    -- E.g. If we're doing something with a Val that's in a monad then need to put it back in a monad


(<*>) :: Applicative m => m (a -> b) -> m a -> m b 
    -- takes an Applicative with an (a->b) function in it, an Applicative (our monad) with an a in it, 
       and puts the result in an Applicative 
    -- E.g. If the thing we need to do to a Val is also in a monad


liftM2 :: Monad m => (a -> b -> c) -> m a -> m b -> m c

mapM :: Monad m => (a -> m b) -> [a] -> m [b]
 (in this case we have a list of a, but mapM can handle any Traversable t, such as Vector)
  if we have a list of Vals and we need to do some transformation and get them back in a monad

--}



-- EVALSTATE FUNCTIONS

{--
get :: EvalState Env
-- "gets"/retrieves the environment from out of the monad

Example: 
do 
    curEnv <- get

--}


{-- put :: Env -> EvalState()
-- "puts"/replaces the environmental state in the monad

Example: 
do
    curEnv <- get
    --some other stuff
    put curEnv

--}

{-- modify :: (Env -> Env) -> EvalState ()

Modify the environment with some (Env -> Env) (H.insert perhaps?)

Example:
do
    modify $ H.insert "x" (Number 3)

--}


-- HASHMAP FUNCTIONS
-- Coming from import qualified Data.HashMap.Strict as H 
--          (HashMap, insert, lookup, empty, fromList, union)




-- OTHER MP FUNCTIONS


{--
flattenList :: Val -> Either ([Val], Val) [Val]

    Either
    - gets us to an actual list of vals to work off of
    - Or lets us know that it was an invalid list
--}

{--
getBinding :: Val -> EvalState (String, Val)

Useful for let, since we're dealing with Val most of the time and we'll have a Pair, but our 
environment is (String, Val) 

--} 


{-- 
getListOf2 :: Val -> EvalState (Val, Val)

Useful in special form `cond`, since each clause is expected to be exactly a two-element list
--}

{-- getList :: Val -> EvalState [Val]

Useful to evaluate a value representing a list into an actual list

--}


{--
-- REMINDER THAT THESE THINGS EXIST, DEPENDING ON HOW YOU LIKE TO IMPLEMENT
-- zip :: [a] -> [b] -> [(a,b)]
-- map :: (a -> b) -> [a] -> [b]
-- (x:xs)
-- ('a':x:xs)
-- let 
--   var1 = def1
--   var2 = def2
-- ....
-- in (rest of thing)

--}



-- DO NOTATION!
-- https://en.wikibooks.org/wiki/Haskell/do_notation#Example:_user-interactive_program
-- https://hackage.haskell.org/package/base-4.18.0.0/docs/System-IO.html


nameDo :: IO ()
nameDo = do 
    putStr "What is your first name? " --putStr :: String -> IO ()
    first <- getLine -- getLine :: IO String
    putStr "And your last name? " --putStr :: String -> IO ()
    last <- getLine --getLine :: IO String
    let full = first ++ " " ++ last
    putStrLn ("Pleased to meet you, " ++ full ++ "!") --putStrLn :: String -> IO ()






