# virtua-github-repo-list

Simple Web Components that display repositories from Github, and can be filtered by Web Components-related topics. 
Built using [Lit](https://lit.dev/) and TypeScript.

Sample application for Kito Mann's [Future-proof your Web Apps with Web Components and LitElement presentation](https://kitomann.com/#/sessions/14/future-proof-your-web-apps-with-web-components-and-litelement).

![Demo](/demo.gif?raw=true "Github Repo Lister")

## Setup

This project requires [Node](https://nodejs.org) for building.
See [.nvmrc](.nvmrc) for the expected version.
(If you're using [nvm](https://github.com/nvm-sh/nvm), you can just run `nvm use` to switch to the correct version)/

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

This project uses the [Web Dev Server](https://modern-web.dev/docs/dev-server/overview/) for local development. 
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

Check out https://kitomann.com for more information about the author, and links to social networks.
