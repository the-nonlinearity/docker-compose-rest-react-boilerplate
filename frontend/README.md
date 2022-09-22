# ReactJS Frontend with Authentication

## Index

- [About](#about)
- [Built using](#built-using)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing dependencies](#installing-dependencies)
- [Project setup](#project-setup)
  - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
  - [Lints and fixes files](#lints-and-fixes-files)
  - [Run your unit tests](#run-your-unit-tests)
- [Route types](#route-types)
  - [Public route](#public-route)
  - [Hybrid route](#hybrid-route)
  - [Private route](#private-route)
- [Control visibility of components](#control-visibility-of-components)

## About

This repository was created to assist in the authentication implementation process in React **JS applications with JWT and refresh token**. All components and contexts have **unit tests** and a **basic HTML structure without CSS**. The project has features to **secure routes** and **control the visibility of components** based on permissions, the entire implementation process is in this document.

Feel free to use it as a template and make any changes you deem necessary.

## Built using

- [React JS](https://reactjs.org): JavaScript library
- [TypeScript](https://www.typescriptlang.org): JavaScript With Syntax For Types.
- [Jest](https://jestjs.io): JavaScript Testing Framework
- [React Testing Library](https://testing-library.com): Testing utilities

## Getting started

### Prerequisites

You need to install [Node.js](https://nodejs.org) or [Yarn](https://yarnpkg.com) on your machine.

### Installing dependencies

```bash
npm install
# or
yarn install
```

## Project setup

### Compiles and hot-reloads for development

```bash
# start app open development mode
yarn start
# or
npm run start
```

### Lints and fixes files
```bash
# show errors
yarn lint
# or
npm run lint

# fix errors
yarn lint:fix
# or
npm run lint:fix
```

### Run your unit tests

```bash
# run tests
yarn test
# or
npm run test

# run tests on watch mode
yarn test:watch
# or
npm run test:watch

# run tests on coverage mode
yarn test:coverage
# or
npm run test:coverage

# run tests on coverage with watch mode
yarn test:coverage:watch
# or
npm run test:coverage:watch
```

## Route types

The route components are based on `<Route />` component of [react-router-dom](https://reactrouter.com/web/guides/quick-start) and receive same props.

### Public route

The route can only be accessed if a user is not authenticated. If accessed after authentication, the user will be redirected `/` route.

```js
import { Switch } from 'react-router-dom'
import { PublicRoute } from 'src/routes/PublicRoute'

const SampleComponent = () => <div>Sample component</div>

export const Routes = () => (
  <Switch>
    <PublicRoute
      path="/login"
      component={SampleComponent}
    />
  </Switch>
)
```

### Hybrid route

The route can be accessed whether a user is authenticated or not.

```js
import { Switch } from 'react-router-dom'
import { HybridRoute } from 'src/routes/HybridRoute'

const SampleComponent = () => <div>Sample component</div>

export const Routes = () => (
  <Switch>
    <HybridRoute
      path="/register"
      component={SampleComponent}
    />
  </Switch>
)
```

### Private route

The route can only be accessed if a user is authenticated. Use permission props to access control.

```js
import { Switch } from 'react-router-dom'
import { PrivateRoute } from 'src/routes/PrivateRoute'

const SampleComponent = () => <div>Sample component</div>

export const Routes = () => (
  <Switch>
    {/*
      allow route access if the user has the permissions
      `users.list` and `users.create`
    */}
    <PrivateRoute
      path="/users"
      component={SampleComponent}
      permissions={['users.list', 'users.create']}
    />
  </Switch>
)
```

## Control visibility of components

Use the `CanAccess` component and pass `permissions` props to control the visibility of a component.

```js
import { CanAccess } from 'src/components/CanAccess'

export function NavBar () {
  return (
    <>
      {/*
        the component is shown if the user has the permissions
        `users.list` and `metrics.list`
      */}
      <CanAccess permissions={['users.list', 'metrics.list']}>
        {/* YOUR COMPONENT HERE */}
      </CanAccess>
    </>
  )
}
```
