const inquirer = require('inquirer')
const { Pool } = require('pg');


const employee_db = new Pool(
  {
    user: "postgres",
    password: "angelwings3690",
    host: "localhost",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

function main(){
inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do",
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
            name: "selection",
        },
        
    ])
    .then((data) => {
        let tracker
        if (data.selection==='View All Employees'){
            tracker = employeeTable()
        }else if (data.selection==='Add Employee'){
            tracker = addEmployee()
        }else if (data.selection==='Update Employee Role'){
            tracker = updateEmployeeRole()
        }else if (data.selection==='View All Roles'){
            tracker = roleTable()
        }else if (data.selection==='Add Role'){
            tracker = addRole()
        }else if (data.selection==='View All Departments'){
            tracker = departmentsTable()
        }else if (data.selection==='Add Department'){
            tracker = addDepartment()
        }else if (data.selection==='Quit'){
            return (console.log('YAY'))
        }})};
        main()
    function addEmployee(){
        inquirer
        .prompt([
            {
                type: "input",
                message: "What is the first name",
                name: "firstName",
            },
            {
                type: "input",
                message: "What is the last name",
                name: "lastName",
            },
            {
                type: "list",
                message: "What is the employee role",
                choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
                name: "employeeRole",
            }
        ])
        .then((data)=>{
            employee_db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)', [data.firstName, data.lastName, '1'])
            main()
        })
        };
    function employeeTable(){
        employee_db.query('SELECT * FROM employee', (err, {rows}) => {
            if (err) {
              console.log(err);
            }
            console.table(rows); 
            main()
        })
    }

    function addRole(){
        inquirer
        .prompt([
            {
                type: "input",
                message: "What is the role",
                name: "role",
            },
            {
                type: "input",
                message: "What is the salary",
                name: "salary",
            },
            {
                type: "list",
                message: "What is the department",
                choices: ['Sales', 'Finance', 'Legal', 'Engineering'],
                name: "department",
            }
        ])
        .then((data)=>{
            employee_db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) ', [data.role, data.salary, '1'])
            main()
        })
        };

    function roleTable(){
            employee_db.query('SELECT * FROM role', (err, {rows}) => {
                if (err) {
                  console.log(err);
                }
                console.table(rows); 
                main()
            })
        }
    function addDepartment(){
            inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the department",
                    name: "department",
                },
            ])
            .then((data)=>{
                employee_db.query('INSERT INTO department (name) VALUES ($1) ', [data.department])
                main()
            })
            };
    function departmentsTable(){
                employee_db.query('SELECT * FROM department', (err, {rows}) => {
                    if (err) {
                      console.log(err);
                    }
                    console.table(rows); 
                    main()
                })
            }