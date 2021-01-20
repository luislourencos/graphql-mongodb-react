## Configuration for spec in typescript

`npm install chai mocha ts-node @types/chai @types/mocha --save-dev`
# Add script

`"test": "env TS_NODE_COMPILER_OPTIONS='{\"module\": \"commonjs\" }' mocha -r ts-node/register './src/*spec.ts'"`