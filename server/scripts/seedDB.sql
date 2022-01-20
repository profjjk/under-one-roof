use under_one_roof;

INSERT INTO household.expenses (expenseName, expenseAmount, expenseDate, expenseType, createdAt, updatedAt, paid, paidBy, HomeId) 
VALUES ("rent", 1500, "2021-02-02 19:54:05", "rent", "2021-02-02 19:54:05", "2021-02-02 19:54:05", false, "0", 1);

INSERT INTO household.expenses (expenseName, expenseAmount, expenseDate, expenseType, createdAt, updatedAt, paid, paidBy, HomeId) 
VALUES ("cable", 100, "2021-02-02 19:54:05", "utilities", "2021-02-02 19:54:05", "2021-02-02 19:54:05", false, "0", 1);

INSERT INTO household.expenses (expenseName, expenseAmount, expenseDate, expenseType, createdAt, updatedAt, paid, paidBy, HomeId) 
VALUES ("electric", 50, "2021-02-02 19:54:05", "utilities", "2021-02-02 19:54:05", "2021-02-02 19:54:05", true, "Dave", 1);

INSERT INTO household.users (firstName, lastName, contactEmail, contactPhone, emergencyName, emergencyRelationship, emergencyPhone, createdAt, updatedAt, HomeId)
VALUES ("Dave", "Grohl", "test@test.com", "123-456-7894", "Mama Grohl", "Mama", "123-456-7894",  "2021-02-02 19:54:05",  "2021-02-02 19:54:05", 1);

INSERT INTO household.users (firstName, lastName, contactEmail, contactPhone, emergencyName, emergencyRelationship, emergencyPhone, createdAt, updatedAt, HomeId)
VALUES ("Erling", "Haaland", "test@test.com", "125-456-7894", "Alf Inge Haaland", "Father", "223-456-7894",  "2021-02-02 19:54:05",  "2021-02-02 19:54:05", 1);

INSERT INTO household.chores (choreName, choreDescription, choreFrequency, createdAt, updatedAt, HomeId, assignee)
VALUES ("New Chore", "Do work", 1, "2021-02-02 19:54:05", "2021-02-02 19:54:05", 1, "Dave");

