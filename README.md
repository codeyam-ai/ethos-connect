# todo
- Dynamically change the magic link redirect URL by following [this guide](https://github.com/supabase/supabase/discussions/600#discussioncomment-1879317)
- Move all files to TS and fully test
- Write instructions on how to edit NPM package locally
- get tsc watch to make local edits easier

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