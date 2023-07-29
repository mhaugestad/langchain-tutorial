# Setup
Some more setup is required for this part;

Firstly we install langchain and dotenv as follows:

```npm install -S langchain```
```npm install -S dotenv```
```npm install -S puppeteer```

Then in order to be able to do modular imports in node we need to add "type": "module" to the package.json file, which should now look like this:

```
{
  "dependencies": {
    "dotenv": "^xx.x.x",
    "langchain": "^x.x.xxx",
    "puppeteer": "^x.x.x"
  },
  "type": "module"
}
```
Then all our js files need to be renamed to .mjs, and can be run from the command line with the following command:

```
node -r dotenv/config --experimental-modules filename_of_file_I_want_to_run.mjs
```
