# <img src="./header.svg">

##### Yet Another Redux Forms Library

##### Manage form state in React/Redux applications with reactive updates and field level validation. Heavily inspired by [MobX React Form](https://github.com/foxhound87/mobx-react-form)

[![npm](https://img.shields.io/npm/v/yarfl.svg)]()
[![Build Status](https://travis-ci.org/axelyung/yarfl.svg?branch=master)](https://travis-ci.org/axelyung/yarfl)
[![GitHub license](https://img.shields.io/github/license/axelyung/yarfl.svg)]()
[![Downloads](https://img.shields.io/npm/dt/yarfl.svg)]()
[![Downloads](https://img.shields.io/npm/dm/yarfl.svg)]()

[![NPM](https://nodei.co/npm/yarfl.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yarfl/)

## Warning: experimental, not ready for production

## Features

- Easy and JSON-serializable configuration.
- Reactive updates with input binding.
- Reactive validation with error messages.
- Supports both sync and async validation.
- Array fields.
- Nested fields.
- Easily integrated with component libraries (Material Ui, React Widgets, React Select, etc).
- Adheres to functional and immutable design principles.
- Written in Typescript.

## Documentation

See the complete documentation [here](https://axelyung.github.io/yarfl)

## Demo

There is a working live demo of this library's implementation [here](https://axelyung.github.io/yarfl-examples) with accompanying [source code](https://github.com/axelyung/yarfl-examples).

## Why?

Neither [Redux Form](https://github.com/erikras/redux-form) nor [React Redux Form](https://github.com/davidkpiano/react-redux-form) (the two most popular React/Redux form libraries) provide an easy way of creating serializable form configurations. Furthermore, both libraries require the use of their own form and/or input components leading to unnecessary complexity. This library attempts to solve the first issue by dynamically creating a reducer function from serializable configurations and the second by exposing an API that does not *require* the need for special React components. The benefit is that more of the forms' functionality can be abstracted to the configuration rather than having to create individual form/field components.

## Getting started

From the [getting started](https://axelyung.github.io/yarfl/getting-started.html) section of the documentation.

1. Install dependencies (`redux`, `react`, `react-redux`, `redux-thunk` are peer dependencies):

    ```bash
    yarn add redux react react-redux redux-thunk yarfl
    ```

2. Define a config object with a `fields` property describing what fields should be part of the Redux state and how they should be validated. The `rules` string describes which rules from [validatorjs](https://github.com/skaterdav85/validatorjs#available-rules) the field should be validated against (optional).

    ```javascript
    //config.js
    export const myFormConfig = {
        name: 'myForm',
        fields: {
            name: {
                rules: 'required'
            },
            email: {
                rules: 'required|email'
            },
            age: {
                rules: 'required|min:18'
            }
        }
    }
    ```

3. Create a reducer, initial state and a connector by passing the `config` object to the `init` function and then simply create the Redux store as you normally would:

    ```javascript
    // store.js
    import { init } from 'yarfl';
    import { createStore, applyMiddleware } from 'redux';
    import thunk from 'redux-thunk';
    import { myFormConfig } from './config'

    // create a reducer, initial state and a connector
    const { reducer, initialState, connect } = init(myFormConfig);

    // redux-thunk is a peer dependency of yarfl
    const enhancers = applyMiddleware(thunk)

    const store = createStore(reducer, initialState, enhancers);

    export { store, connect }
    ```

4. Set up the [`Provider`](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#provider-store) as you normally would with React Redux. To connect a React component with the store from the previous step use the `connect` method that we created with `init` in step three. This `connect` method doesn't require `mapStateToProps` or `mapDispatchToProps` arguments, this is taken care of by Yarfl automatically. Just pass the React component as its first and only argument.

    ```jsx
    // App.js
    import React from 'react';
    import { Provider } from 'react-redux';
    import { store } from './store.js'
    import MyFormComponent from './MyFormComponent.js';

    class App extends React.Component {
        render() {
            return (
                <Provider store={store}>
                    <MyFormComponent />
                </Provider>
            )
        }
    }
    ```
    ```jsx
    // MyFormComponent.js
    import React from 'react';
    import { connect } from './store.js';

    class MyFormComponent extends React.Component {
    ...
    }

    export default connect(MyComponent)
    ```

5. When connected, a form prop of the name specified in the config object (in our case `myForm`) is passed to the React component. The `myForm` prop is an object containing a handful of properties and methods to interact with the store.

    ```jsx
    class MyComponent extends React.Component {
        render () {
            const { select, valid, errors } = this.props.myForm;
            /**
            * The 'select' function accepts a key string and
            * returns an object containing the name field
            * object from the store with a 'bind' function.
            */
            const nameField = select('name');
            return (
                <form>
                    <div>
                        {/*
                            The 'bind' function returns an object of properties
                            that can be spread on an input element effectively
                            binding that component to update and track the state.
                        */}
                        <label>{nameField.label}</label><br/>
                        <input {...nameField.bind()} />
                    </div>
                    {/*
                        The 'valid' property describes if all fields
                        registered in the Redux store pass their
                        validation rules.
                    */}
                    <button type="submit" disabled={!valid} />
                    <div>
                        {/*
                            The 'errors' array contains the first error
                            message (if any) for all registered fields.
                        */}
                        <label>All errors:</label>
                        <ul>
                            {errors.map(err => <li>{err}</li>)}
                        </ul>
                    </div>
                </form>
            )
        }
    }
    ```

    The `bind` method returns an object containing input attributes (with `"value"`) from the store and `onChange`, `onBlur` and `onFocus` handlers to dispatch update actions.

    ```javascript
    const bindProps = select('name').bind();

    /*
    bindProps = {
        value: '',
        default: '',
        id: 'name',
        name: 'name',
        type: 'text',
        label: 'Name',
        className: '',
        placeholder: 'Name',
        disabled: false,
        autoFocus: false,
        onChange: (e: InputEvent, value?: any) => void,
        onBlur: () => void,
        onFocus: () => void,
    }
    */
    ```

    Using the spread syntax will attach all the props to the input element, but you are free to choose which properties you want to use or create new ones from `bind`'s return values:

    ```jsx
    render() {
        const { select } = this.props;
        const { id, value, onChange } = select('email').bind();
        return (
            ...
            <input
                id={`${id}-is-the-id`}
                name="custom-email-name"
                value={value}
                onChange={(e, value) => {
                    console.log('About to dispatch...')
                    onChange(e);
                    console.log('Dispatch complete!')
                }}
            />
            ...
        )
    }
    ```

6. To initiate more than one form just add more config objects as input parameters from the `init` function from step three.

    ```javascript
    import { loginFormConfig, newUserConfig, ... } from './configs'

    // pass one or more config objects to init
    const { reducer, initialState, connect } = init(loginFormConfig, newUserConfig, ...);
    ```
