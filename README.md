# react-notes-list

Note.js - Prioritize Your Notes
With Note.js you can list all your notes and prioritize them. All notes will stay saved on the device you created them.

[react-notes](https://react-notes.netlify.com)

![Notes Image](https://react-notes.netlify.app/notes.129b31f5.png)

## Run

To get the project running you should run the following commands:

```bash
npm install
npm start
```

To stop the service just press `control+c`.

To build the project you should run the following commands:

```bash
npm run build
```

## Favicon

[Favicon](https://favicon.io/)

## Concepts

### Babel

Babel

### JSX

JSX

### SCSS

```css
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
```

### Props and State

The main responsibility of a Component is to translate raw data into rich HTML. With that in mind, the props and the state together constitute the raw data that the HTML output derives from.

You could say props + state is the input data for the render() function of a Component, so we need to zoom in and see what each data type represents and where does it come from.

Before separating props and state, let's also identify where they overlap.

- Both props and state are plain JS objects
- Both props and state changes trigger a render update
- Both props and state are deterministic. If your Component generates different outputs for the same combination of props and state then you're doing something wrong.

#### Props

props (short for properties) are a Component's configuration, its options if you may. They are received from above and immutable as far as the Component receiving them is concerned.

A Component cannot change its props, but it is responsible for putting together the props of its child Components.

#### State

The state starts with a default value when a Component mounts and then suffers from mutations in time (mostly generated from user events). It's a serializable representation of one point in time—a snapshot.

A Component manages its own state internally, but—besides setting an initial state—has no business fiddling with the state of its children. You could say the state is private.

\* We didn't say props are also serializable because it's pretty common to pass down callback functions through props.

#### Changing Props and State

| Changing                                     | Props | State |
| -------------------------------------------- | ----- | ----- |
| Can get initial value from parent Component? | Yes   | Yes   |
| Can be changed by parent Component?          | Yes   | No    |
| Can set default values inside Component?     | Yes   | Yes   |
| Can change inside Component?                 | No    | Yes   |
| Can set initial value for child Components?  | Yes   | Yes   |
| Can change in child Components?              | Yes   | No    |

\* Note that both _props_ and _state_ initial values received from parents override default values defined inside a Component.

#### Should this Component have State

_state_ is optional. Since _state_ increases complexity and reduces predictability, a Component without _state_ is preferable. Even though you clearly can't do without state in an interactive app, you should avoid having too many _Stateful Components._

##### Component types

- **Stateless Component** — Only _props_, no _state._ There's not much going on besides the `render()` function and all their logic revolves around the _props_ they receive. This makes them very easy to follow (and test for that matter). We sometimes call these _dumb-as-f\*ck Components_ (which [turns out](http://www.urbandictionary.com/define.php?term=dumb%20as%20fuck) to be the only way to misuse the F-word in the English language).
- **Stateful Component** — Both _props_ and _state._ We also call these _state managers_. They are in charge of client-server communication (XHR, web sockets, etc.), processing data and responding to user events. These sort of logistics should be encapsulated in a moderate number of _Stateful Components_, while all visualization and formatting logic should move downstream into as many _Stateless Components_ as possible.

### Error boundaries

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
