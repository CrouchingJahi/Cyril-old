# Cyril
Finance management desktop app created in Node, Electron, and React

This project uses Gulp, so in order to develop with it, you must have gulp-cli installed (`npm install -g gulp-cli` or `yarn global add gulp-cli`)  
Build dependencies using `npm install` or `yarn`  
Build app using `gulp build`
Run app in live reload mode using `gulp serve` - app will automatically restart when a source file is changed  
Run app normally using `npm start`  
- - -
## Developer's Guide

#### Merge Process
On Github, click the "Projects" tab on the top bar to reach the board. When you decide to work on something, pick the issue and assign it to yourself, and move the card on the board.  
Your work should go into another branch, then you can push it up and use a merge request to get it into master.  
#### Folder Structure
```
.
├── app
|   ├── images
|   ├── ui
|   ├── services
|   └── index.html
|   └── main.js
├── src
|   ├── jsx
|   |   ├── common
|   |   |   └── *.jsx
|   |   ├── (page)
|   |   |   └── *.jsx
|   |   └── app.jsx
|   ├── backend
|   |   └── *.js
|   ├── style
|   |   └── *.scss
|   └── index.html
├── test
|   ├── ui
|   └── services
├── gulpfile.js
└── package.json
```

The app folder contains the generated code for both the frontend (ui folder) and backend (services folder). It also contains the images folder, main.js for starting Electron, and a copy of index.html. Rarely will anything in this folder need to be directly edited.  
The src folder contains most of the code for the app. The UI code goes into the jsx folder, the backend code into the backend folder, and the styles into the style folder. The source index.html is also here in case you need to change it.  
The test folder will be separated into ui, and services. Jest will be used as the test framework since it works well with React but can also be used with other Javascript code.
#### Naming Conventions
Since this is such a small app, there is not as much of a need to have organizing standards. These are the only rules I've come up with so far:  
* Frontend .jsx files should be named with the convention `(page)/(type)_(name).jsx`, such as `summary/Component_PieChart.jsx`. Common components that are shared between pages go into the 'common' folder.  
* .scss files don't really need to be separated into folders. You can just throw them in the "style" folder named by page. All component styling can be put into the page's style file.  
* The backend files also don't need to be separated into folders. They can just be named by whatever function they perform.  
