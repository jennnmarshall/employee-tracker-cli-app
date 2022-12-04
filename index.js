const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const art = require("ascii-art");

require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: process.env.DB_USER,
  // MySQL password
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const start = () => {
  art.font("Employee Tracker!", "doom").then((rendered) => {
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
  inquirer
    .prompt([
      {
        message: "What would you like to do?",
        type: "list",
        name: "menu",
        choices: [
          "View all employees",
          "Add employee",
          "Update employee role",
          "Update manager",
          "View all roles",
          "Add role",
          "View all departments",
          "Add department",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      switch (response.menu) {
        case "View all employees":
          viewEmployees();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "Update manager":
          updateManager();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "Add role":
          addRole();
          break;
        case "View all departments":
          viewDepartments();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
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

const viewEmployees = () => {
  connection.query(
    "SELECT employee.id, first_name, last_name, title, salary, name, manager_id FROM ((department JOIN role ON department.id = role.department_id) JOIN employee ON role.id = employee.role_id);",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      menu();
    }
  );
};

// update functions
// update employee/manager

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        message: "Enter employee ID",
        type: "input",
        name: "id",
      },
      {
        message: "Enter new role ID",
        type: "input",
        name: "newRole",
      },
    ])
    .then((response) => {
      connection.query(
        "UPDATE employee SET role_id=? WHERE id=?",
        [response.newRole, response.id],
        function (err, res) {
          if (err) throw err;
          console.log("Employee role updated!");
          menu();
        }
      );
    });
};

const updateManager = () => {
  inquirer
    .prompt([
      {
        message: "Enter employee ID",
        type: "input",
        name: "id",
      },
      {
        message: "Enter new Manager's ID",
        type: "input",
        name: "newManager",
      },
    ])
    .then((response) => {
      connection.query(
        "UPDATE employee SET manager_id=? WHERE id=?",
        [response.newManager, response.id],
        function (err, res) {
          if (err) throw err;
          console.log("Employee manager updated!");
          menu();
        }
      );
    });
};

// add functions
// add dept/employee/role

const addDepartment = () => {
  inquirer
    .prompt([
      {
        message: "Enter the department you would like to add:",
        type: "input",
        name: "newDept",
      },
    ])
    .then((response) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [response.newDept],
        function (err, res) {
          if (err) throw err;
          console.log("New department added!");
          menu();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        message: "Enter the role title you would like to add:",
        type: "input",
        name: "roleTitle",
      },
      {
        message: "Enter the new role's salary:",
        type: "input",
        name: "roleSalary",
      },
      {
        message: "Enter the department ID for this new role:",
        type: "input",
        name: "roleDept",
      },
    ])
    .then((response) => {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [response.roleTitle, response.roleSalary, response.roleDept],
        function (err, res) {
          if (err) throw err;
          console.log("New role added!");
          menu();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        message: "Enter new employee's first name:",
        type: "input",
        name: "firstName",
      },
      {
        message: "Enter new employee's last name:",
        type: "input",
        name: "lastName",
      },
      {
        message: "Enter new employee's role ID:",
        type: "input",
        name: "newRoleId",
      },
      {
        message: "Enter new employee's manager's ID:",
        type: "input",
        name: "newManagerId",
      },
    ])
    .then((response) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          response.firstName,
          response.lastName,
          response.newRoleId,
          response.newManagerId,
        ],
        function (err, res) {
          if (err) throw err;
          console.log("New employee added!");
          menu();
        }
      );
    });
};

start();
