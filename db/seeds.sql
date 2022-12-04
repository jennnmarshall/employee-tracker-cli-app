INSERT INTO department (name)
VALUES ('Department of Commerce and Labor'), ('Public Relations'), ('Human Resources'), ('Legal'), ('Interns');

INSERT INTO role (title, salary, department_id)
VALUES ('Commissioner', 150000, 1), ('Senior Board Member', 100000, 1), ('Board Member', 75000, 1), 
('Press Secretary', 100000, 2), ('HR Director', 100000, 3), ('Senior Counsel', 120000, 4), ('Intern', 25000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ('Dolores', 'MacGowan', 1, NULL), ('Josh', 'Zimmerman', 2, 1), ('Mikey', 'Reggiano', 2, 1),
('Hallelujah', 'Goodwin', 3, 1), ('Naiah', 'Culligan', 5, NULL), ('Sidonius', 'Fern', 4, 1), 
('Matt', 'Murdank', 6, 1), ('Archie', 'Emerson', 7, 4);