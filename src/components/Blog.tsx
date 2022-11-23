import React from "react";
import styled from "styled-components";
// https://github.com/sb2nov/resume/blob/master/sourabh_bajaj_resume.tex
const Wrapper = styled.div`
  flex-direction: row;
  margin: 1em;
  color: black;
  background: #f0f0f0;
  border: 4px;
  justify-content: start;
`;

export class Blog extends React.Component {
  getPost() {
    return `Add Typescript to your Create React App project 
    1) Create a tsconfig.json file. 

    2) Add @types definitions for all the libraries that you are using into your package.json file.
    
    I added these directly into package.json, copy-pasting from "dependencies" to devDependies"

    package.json shows library such as "react-dom": "^16.8.6" in "dependencies".
    Add the type definition "@types/react-dom": "^16.8.6" to "devDependencies".

    You can also add the @types on the command line with npm or yarn
    npm install --save typescript @types/node @types/react @types/react-dom @types/jest etc...
    yarn add typescript @types/node @types/react @types/react-dom @types/jest
    3) Rename all files to .tsx (I had issues if I re-named to .ts)
    
Solving errors:    
REDUX_DEVTOOLS_EXTENSTION on window object 
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() || compose;
    
TypeScript error: Parameter 'state' implicitly has an 'any' type. 

// Add "strict": false to "compilerOptions" in the tsconfig.json file
  
React Router error: can't use Route or WithRouter outside <Router/>

I was using a <ScrollToTop /> component that used WithRouter() to move the window back up (instead of staying stuck in the middle of a page after
clicking on a link). Removed it and will find a solution later.

Unrelated: Installed eslint and prettier VSCode extensions, added prettier
and eslint-plugin-prettier to devDependencies in package.json, created an
.eslintrc file and then VS Code Files -> Preferences -> Settings and set "formatOnSave" to true 
by checking the box. 

Use git bash for "npm install, npm start, npm run build, and npm run deploy" to dpeloy to 
gh pages; there's an error when using the Node.js command prompt (path variable?)

React Router - the component re-render is blocked despite a location
change because the shouldComponentUpdate (which decides whether to re-render if the new state/props are different from the current state/props) doesn't detect
a change after navigating to a new Link. 
1) Find a solution to this update-blocking: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
`;
  }

  getPostTwo = () => {
    return `
    TIL series:

    Optimistic UI with Apollo Client

    "yarn build" and then "yarn run deploy", a script that just runs ""gh-pages -d build" to deploy from any branch with gh-pages. 
    gh-pages creates the "gh-pages branch" from the built code, up to you to push commits up to Github using the usual git flow 
    "git add .", "git commit -m "My msg", "git push origin X-branch".

    Puppeteer

    GH Pages routing for CRA app: https://github.com/facebook/create-react-app/issues/1765
    
Use process.env.PUBLIC_URL in React Router's <Route /> and <Link /> 
when deploying via Github Pages so that development and production routing works correctly

<Link to={process.env.PUBLIC_URL + '/'}>

<Route path={process.env.PUBLIC_URL + '/'}>

    `;
  };

  getPostThree = () => {
    return `
    Site wasn't compiling locally; had to bump react-scripts, add env variables and re-download Node
    `;
  };

  getPostFour = () => {
    return `
    https://github.com/jakearchibald/idb#examples
    
    https://blog.logrocket.com/detailed-look-basic-sqljs-features/

    https://github.com/jlongster/absurd-example-project

    https://jlongster.com/future-sql-web

    https://github.com/sql-js/sql.js

    https://github.com/jlongster/absurd-sql

    https://github.com/sql-js/react-sqljs-demo/blob/master/src/App.js

    First I want to set up a basic sql.js database (which doesn't persist)
    and after follow James Long's absurd-sql project.

    Need to download the .wasm file, and went to the LogRocket blog post to 
    first download it. Add it to project. 

    Follow the blog post and do "yarn add @jlongster/sql.js absurd-sql", well
    here add with npm to my package.json I think.
    `;
  };

  mapToPost = (text: string): JSX.Element => {
    // Split by regex of 2 spaces or more
    let paragraphs: string[] = text.split(/\s{2,}/);
    let results: JSX.Element[] = paragraphs.map(p => {
      return <p> {p} </p>;
    });
    return <Wrapper>{results}</Wrapper>;
  };

  render() {
    const postOne: string = this.getPost();
    const postTwo: string = this.getPostTwo();
    const postThree: string = this.getPostThree();
    const postFour: string = this.getPostFour();
    return (
      <>
        {this.mapToPost(postOne)}
        {this.mapToPost(postTwo)}
        {this.mapToPost(postThree)}
        {this.mapToPost(postFour)}
      </>
    );
  }
}
