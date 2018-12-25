/**
 * Pizza delivery prompt example
 * run example by writing `node pizza.js` in your console
 */

'use strict';
const inquirer = require('inquirer');
const {ncp} = require('ncp');
const fs = require('fs');
const {exec} = require('child_process');
const ora = require('ora');
const spinner = new ora();
//const process = require('child_process');
/**
 * Basic constants for operations
 */

 const TSAppInDirPath = './templates/ts/app';
 const TSAppOutDirPath = './';
 const AppDirName = 'sample';

var questions = [
  {
    type: 'input',
    name: 'applicationName',
    message: 'Suggest name for your app',
    default: `${AppDirName}`
  },
  {
    type: 'list',
    name: 'scriptType',
    message: 'Would you like to include typescript ?',
    default:'Typescript will make life easy',
    choices: ['Typescript', 'ES6'],
    filter: val => val.toLowerCase()
    
  }
];
function updatePackageJSON (){
  const targetPath = this.targetPath;
  const packageJSON =`${this.targetPath}/package.json`;
  const appName = this.answers.applicationName;
  startSpinner('Configuring your app');
  fs.readFile(packageJSON, {encoding: 'utf-8'}, function(err,data){
    
    if (!err) {
        const temp = JSON.parse(data);
        temp.name = appName;
           
        fs.writeFile(packageJSON,JSON.stringify(temp,null,4),(err)=>{
          if (err) throw err;
          else{
          stopSpinner();
            try{
                process.chdir(`./${targetPath}`);
                startSpinner('Installing Dependencies');
                exec('npm install',(error, stdout,stderr) => {
                  if (error !== null) {
                        console.log('exec error: ' + error);
                  }
                  stopSpinner();
                })
              } catch (e) {
                console.log('Exception', e);
              }
          }
        })
    } else {
        console.log(err);
    }
});
}
const updateWebpack = () => {
 // to write more config for webpack customization
}
const startSpinner = (text) => {
  spinner.start(text);
  setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = text;
  }, 1000);
}
const stopSpinner = (text) => {
spinner.succeed();
}
const createAppClone = async () => {
    
    inquirer.prompt(questions).then((answers) => {
      const ctx ={
        targetPath:`${TSAppOutDirPath}${answers.applicationName}`,
        answers
      }
      ncp(TSAppInDirPath,ctx.targetPath,(err)=>{
        startSpinner('Crafting Application');
        if (err) throw err;
        stopSpinner()
        updatePackageJSON.call(ctx);
        
      });
    });
}
createAppClone();