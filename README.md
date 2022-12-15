# Ethos Connect

### Documentation

For full documentation on Ethos Connect please visit [Ethos Connect](https://ethoswallet.xyz/dev). 


### Setting up local development

From the root folder of the project you are working on (not this project)

```
yarn remove ethos-connect
cd node_modules/react
yarn unlink
yarn link
cd ../react-dom
yarn unlink
yarn link
cd ../..
```

From the root directory of this project:

```
yarn unlink react
yarn unlink react-dom
yarn link
yarn install
yarn link react
yarn link react-dom
yarn build
```

From the root folder of the project you are working on (not this project)

```
yarn link ethos-connect
```

## To reset local

### To reset your UI (consumer of the NPM package)

```
yarn unlink ethos-connect
yarn unlink react
yarn unlink react-dom
yarn add ethos-connect react react-dom
```

### To reset and unlink in the NPM package repo

```
yarn unlink
yarn unlink react
yarn unlink react-dom
yarn add react react-dom
```

You can also reset all your linked packages by running (mac only):

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
