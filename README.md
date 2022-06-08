# To Do

- Update all params and types

# Setting up local development

From the root directory of this project:

```
yarn link
yarn install
cd node_modules/react
yarn link
cd ../../node_modules/react-dom
yarn link
yarn build:watch
```

The last line of the previous commands will watch for changes and the UI will automatically update after you link.

Then, from the root directory of the UI project

```
yarn link ethos-react2
yarn link react
yarn link react-dom
yarn dev
```
