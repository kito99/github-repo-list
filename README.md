# virtua-github-repo-list

Simple Web Components that display repositories from Github, and can be filtered by Web Components-related topics. 
Built using [LitElement](https://lit-element.polymer-project.org/) and TypeScript.

Sample application for Kito Mann's Future-proof your Web Apps with Web Components and LitElement 
[MindMap/Slides](https://www.mindmeister.com/1363423501/presentations-lit-element)  originally presented at 
[RVAJavaScriptConf 2019](https://www.rvajavascript.com/).

## Setup

First, make sure you have TypeScript installed globally.

```
npm install -g typescript
```

Next, install the dependencies.

npm install 

## Development

Since this project uses TypeScript, you need to compile your code first. If you want fast feedback, make sure the TypeScript 
compiler watches your file for changes. You can either configure this in your editor/IDE, or just do it on the command line:

```
tsc --watch
```

This project uses the [ES6 Development Server](https://open-wc.org/developing/es-dev-server.html) for local development. 
This provides the added benefit of translating bare Node-style modules to ES6 Modules for consumption by the browser, 
as well as other features.

To run the development server, run:

```
npm run start
```

## Building

No production build is setup for this project, but you can use ordinary build/bundling tools. See: https://open-wc.org/building/.

## Testing

No tests are currently in this project, but there are several options for testing Web Components. See: https://open-wc.org/testing/#setup.

## Contact

You can find me @kito99 on Twitter or at https://virtua.tech.
