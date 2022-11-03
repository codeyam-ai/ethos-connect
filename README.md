# Setting up local development

From the root folder of the project you are working on (not this project)

```
yarn remove ethos-connect-staging
cd node_modules/react
yarn link
cd ../react-dom
yarn link
cd ../..
```

From the root directory of this project:

```
yarn link
yarn install
yarn link react
yarn link react-dom
yarn build
```

From the root folder of the project you are working on (not this project)

```
yarn link ethos-connect-staging
```

## To reset local

### To reset your UI (consumer of the NPM package)

```
yarn unlink ethos-connect-staging
yarn unlink react
yarn unlink react-dom
yarn add ethos-connect-staging react react-dom
```

### To reset and unlink in the NPM package repo

```
yarn unlink
cd node_modules/react
yarn unlink
cd ../../node_modules/react-dom
yarn unlink
cd ../..
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
