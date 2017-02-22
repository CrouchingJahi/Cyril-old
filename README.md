# Cyril
Finance management desktop app created in Node, Electron, and React.  
Developed using Node 6.9.4. no other version is tested to work with this application.

This project uses Gulp, so in order to develop with it, you must have gulp-cli installed (`npm install -g gulp-cli` or `yarn global add gulp-cli`)  
- Build dependencies using `npm install` or `yarn`  
- Build app using `npm run build` or `gulp build`  
- Run app in live reload mode using `npm run serve` or `gulp serve` - app will automatically restart when a source file is changed  
-OR-  
 Run app normally using `npm start`

Because of some of the dependencies, you may see an error along the lines of being unable to find the bindings file for node_expat.node. In this case, try globally installing `node-expat`.
---
## NPM Commands  
`npm run build` - Same as using `gulp build`  
`npm run serve` - Same as using `gulp serve`  
`npm test` - Runs the test suite. To check coverage, visit the "coverage" folder that will be generated in the project directory.

---
## Gulp Commands  
This project uses Gulp for its build processes. These are the commands available in this project:  
- `gulp clean`
 - Clears all code that has been generated by other gulp processes. Currently, this is only the CSS.
- `gulp build`
 - Generates all code that's necessary for the app to run. Currently, this is only the CSS.
- `gulp build:css`
 - Compiles all the sass in the `app/style` folder into `app/ui/cyril.css`.
- `gulp serve`
 - Starts an instance of electron.
- `gulp dev`
 - Runs `grunt serve`. Also, if a change is detected in the code, the electron window restarts.
- `gulp`
 - The default task performs a sequence of `clean`, `build`, then `dev`.

## Developer's Guide  

#### Patterns
The frontend code and the backend code cannot directly communicate. It'll cause errors if you, for instance, try to import something from `app/services` to anything in `app/ui`. The way the backend and frontend communicate is through their respective communication components - The frontend uses `app/ui/services/Services` and the backend uses `app/services/API`.  

#### Merge Process
On Github, click the "Projects" tab on the top bar to reach the board. When you decide to work on something, pick the issue and assign it to yourself, and move the card on the board.  
Your work should go into another branch, then you can push it up and use a merge request to get it into master.  
#### Folder Structure
```
.
├── app
|   ├── images
|   ├── style
|   |   └── *.scss
|   ├── ui
|   |   ├── common
|   |   |   └── *.jsx
|   |   ├── (page)
|   |   |   └── *.jsx
|   |   └── cyril.jsx
|   ├── services
|   |   └── *.js
|   └── index.html
|   └── main.js
├── test
|   ├── ui
|   └── services
├── gulpfile.js
└── package.json
```

The app folder contains the code for both the frontend (ui folder) and backend (services folder). It also contains the images folder, main.js for starting Electron, and index.html.  
The test folder will be separated into ui, and services. Jest will be used as the test framework since it works well with React but can also be used with other Javascript code.  
#### Naming Conventions
Since this is such a small app, there is not as much of a need to have organizing standards. These are the only rules I've come up with so far:  
* Frontend .jsx files should be organized with the convention `(page)/(name).jsx`, such as `summary/PieChart.jsx`. Common components that are shared between pages go into the 'common' folder.  
* .scss files don't really need to be separated into folders. You can just throw them in the "style" folder named by page. All component styling can be put into the page's style file.  
* The backend files also don't need to be separated into folders. They can just be named by whatever function they perform.  
