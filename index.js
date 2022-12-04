const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const art = require('ascii-art');
const { response } = require('express');

require("dotenv").config();

const connection = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const start = () => {
    art.font("Employee Tracker!", 'doom')
       .then((rendered)=>{
           console.log(rendered);
           menu();
       });
  };

// view all employees; viewEmployees
// add employee; addEmployee
// update employee role; updateEmployee
// update manager; updateManager
// view all roles; viewRoles
// add role; addRole
// view all departments; viewDepartments
// add department; addDepartment

const menu = () => {
    inquirer.prompt([
        {
            message: 'What would you like to do?',
            type: 'list',
            name: 'menu',
            choices: [
                'View all employees', 
                'Add employee',
                'Update employee role',
                'Update manager',
                'View all roles',
                'Add role',
                'View all departments',
                'Add department',
                'Exit',
            ],
        },
    ]) .then((response => {
        switch(response.menu) {
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateEmployee();
                break;
            case 'Update manager':
                updateManager();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add role':
                addRole();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Exit':
                connection.end();
                break;                                
        }
    }));
};

// simple views
const viewDepartments = () => {
  connection.query("SELECT id, name FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
};

const viewRoles = () => {
  connection.query("SELECT id, title, salary FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
};

  start();