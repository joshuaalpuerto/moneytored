# Unit Testing

Unit testing is the practice of testing the smallest possible _units_ of our
code, functions. We run our tests and automatically verify that our functions
do the thing we expect them to do. We assert that, given a set of inputs, our
functions return the proper values and handle problems.

This boilerplate uses the [Jest](https://github.com/facebook/jest) test
framework to run tests and make assertions. This library makes writing tests as easy as speaking - you
`describe` a unit of your code and `expect` `it` to do the correct thing.

<!-- TOC depthFrom:2 depthTo:4 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Basics](#basics) - [Jest](#jest)
- [Testing Redux Applications](#testing-redux-applications) - [Reducers](#reducers) - [snapshots](#snapshots) - [Actions](#actions)

## Basics

For the sake of this guide, lets pretend we're testing this function. It's
situated in the `add.js` file:

```javascript
// add.js

export function add(x, y) {
  return x + y
}
```

> Note: The `export` here is ES6 syntax, and you would need an ES6 transpiler
> (e.g. babel.js) to run this JavaScript.

> The `export` makes our function available as a module, which we can `import` and use
> in other files. Continue below to see what that looks like.

### Jest

Jest is our unit testing framework. Its API, which we write tests with, is
speech like and easy to use.

> Note: The official documentation for Jest can be found [here](https://facebook.github.io/jest/).

We're going to add a second file called `add.test.js` with our unit tests
inside.

First, we `import` the function in our `add.test.js` file:

```javascript
// add.test.js

import { add } from './add.js'
```

Second, we `describe` our function:

```javascript
describe('add()', () => {})
```

> Note: `(arg1, arg2) => { }` is ES6 notation for anonymous functions, i.e. is
> the same thing as `function(arg1, arg2) { }`

Third, we tell Jest what `it` (our function) should do:

```javascript
describe('add()', () => {
  it('adds two numbers', () => {})

  it("doesn't add the third number", () => {})
})
```

Now, We're going to test that our little function correctly adds two numbers.
We are going to take some chosen inputs, and `expect` the result `toEqual` the
corresponding output:

```javascript
// [...]
it('adds two numbers', () => {
  expect(add(2, 3)).toEqual(5)
})
// [...]
```

Lets add the second test, which determines that our function doesn't add the
third number if one is present:

```javascript
// [...]
it("doesn't add the third number", () => {
  expect(add(2, 3, 5)).toEqual(add(2, 3))
})
// [...]
```

> Note: Notice that we call `add` in `toEqual`. I won't tell you why, but just
> think about what would happen if we rewrote the expect as `expect(add(2, 3, 5)).toEqual(5)`
> and somebody broke something in the add function. What would this test
> actually... test?

Should our function work, Jest will show this output when running the tests:

```
add()
  ✓ adds two numbers
  ✓ doesn't add the third number
```

Lets say an unnamed colleague of ours breaks our function:

```javascript
// add.js

export function add(x, y) {
  return x * y
}
```

Oh no, now our function doesn't add the numbers anymore, it multiplies them!
Imagine the consequences to our code that uses the function!

Thankfully, we have unit tests in place. Because we run the unit tests before we
deploy our application, we see this output:

```
● add() › adds two numbers

  expect(received).toEqual(expected)

  Expected value to equal:
    5
  Received:
    6

add()
  ✕ adds two numbers
  ✓ doesn't add the third number
```

This tells us that something is broken in the add function before any users get
the code! Congratulations, you just saved time and money!

## Testing Redux Applications

This boilerplate uses Redux, partially because it turns our data flow into
testable (pure) functions. Using the `Github` component,
let's see what testing the actions and the reducer would look like.

This is what our `Github` Redux look like:

```javascript
// GithubRedux.js

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['username'],
  userSuccess: ['avatar'],
  userFailure: null
})

export const GithubTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  avatar: null,
  fetching: null,
  error: null,
  username: null
})

/* ------------- Selectors ------------- */

export const GithubSelectors = {
  selectAvatar: state => state.github.avatar
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state, { username }) =>
  state.merge({ fetching: true, username, avatar: null })

// successful avatar lookup
export const success = (state, action) => {
  const { avatar } = action
  return state.merge({ fetching: false, error: null, avatar })
}

// failed to get the avatar
export const failure = state =>
  state.merge({ fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure
})
```

Lets test the reducer first!

### Reducers

First, we have to import the reducer and the action.

```javascript
// tests/GithubRedux.test.js
import Actions, { reducer, INITIAL_STATE } from '../GithubRedux'
```

Then we `describe` the reducer, and add two tests: we check that it returns the
initial state and that it handles the `toggleNav` action.

```javascript
describe('GithubReducer', () => {
  it('returns the initial state', () => {})

  it('handles the request action', () => {})
})
```

Lets write the tests themselves! Since the reducer is just a function, we can
call it like any other function and `expect` the output to equal something.

To test that it returns the initial state, we call it with the `INITIAL_STATE` we got from the redux file, and an empty action (second argument). The reducer should
return the initial state of the `GithubRedux`, which is

```javascript
{
  avatar: null,
  fetching: null,
  error: null,
  username: null
}
```

Lets put that into practice:

```javascript
describe('GithubReducer', () => {
  it('returns the initial state', () => {
    const state = reducer(INITIAL_STATE)

    expect(state.fetching).toBeNull()
    expect(state.username).toBeNull()
    expect(state.avatar).toBeNull()
  })

  it('handles the request action', () => {})
})
```

This works, but we have one problem: We also have to explicitly write the initial state itself. When
somebody changes the initial state, they will also have to manually update this code to directly reflect it.

Instead, we can leverage Jest's new snapshots feature.

#### Snapshots

Jest has the ability to store serialized snapshots of most basic types of information (objects, arrays, etc). It then compares the stored version when later tests are run, to find any unexpected mismatches.

We can write the test like

```javascript
describe('GithubReducer', () => {
  it('returns the initial state', () => {
    expect(reducer(INITIAL_STATE)).toMatchSnapshot()
  })

  it('handles the request action', () => {})
})
```

Jest is now the one responsible for tracking the definition of the initial state. When somebody changes it in the future, Jest will warn that the snapshot doesn't match and then allow them to update the snapshot with a single command. No more manual updates!

For more details on Jest snapshots, please view [Kent Dodd's feature video](https://egghead.io/lessons/javascript-use-jest-s-snapshot-testing-feature).

This is how our finished reducer test might look like:

```javascript
// tests/GithubRedux.test.js
import Actions, { reducer, INITIAL_STATE } from '../GithubRedux'

describe('GithubReducer', () => {
  it('returns the initial state', () => {
    expect(reducer(INITIAL_STATE)).toMatchSnapshot()
  })

  it('handles the request action', () => {
    expect(Action.request('test')).toMatchSnapshot()
  })
})
```

Lets see how we can test actions next.

### Actions

We have an action `request` that changes the `Github` fetching state.

A Redux action is a pure function, so testing it isn't more difficult than
testing our `add` function from the first part of this guide!

The first step is to import the action to be tested, the constant it should
return and `expect`:

```javascript
// tests/GithubRedux.test.js

test('request', () => {
  const username = 'taco'
  const state = reducer(INITIAL_STATE, Actions.userRequest(username))

  expect(state.fetching).toBe(true)
  expect(state.username).toBe(username)
  expect(state.avatar).toBeNull()
})
```

If our `userRequest` action works correctly, this is the output Jest will show us:

```
Github actions
  userRequest
    ✓ request
```

And that's it, we now know when somebody breaks the `userRequest` action!

_Continue to learn how to test your application with [Component Testing](testing/component-testing.md)!_
