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
cd ../..
yarn watch
```

The last line of the previous commands will watch for changes and the UI will automatically update after you link.

Then, from the root directory of the UI project

```
yarn link ethos-wallet
yarn link react
yarn link react-dom
yarn dev
```

If something messes up, you can reset all your linked packages by running (mac only):
```
rm -rf cd ~/.config/yarn/*
```
Or, for windows powershell:
```
Remove-Item C:\Users\<USERNAME>\AppData\Local\Yarn\Data\link\* -Recurse -Force
```

# Publishing
When you're ready to publish your changes, update the `package.json` file with a new version number following [Semantic Versioning guidelines](https://zellwk.com/blog/semantic-versioning/). Then run:
```
npm publish
```
This will run the `prepublishOnly` script and publish the new version to NPM.