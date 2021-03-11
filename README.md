# Under One Roof

## Project Summary:
=================================================================

This is a full stack web application that allows for a household to create a unique account, add roommates as users with important contact information, create a chore list and fairly delegate them out, add expenses and dynamically update a household budget, and add events for important dates and reminders. Each user has their own homepage that aggregates the information pertinent to them. The stack used is Sequelize, Express, React, and Node.

[DeployedSite]()

![IMAGE](https://github.com/profjjk/under-one-roof/blob/main/client/public/assets/README/UnderOneRoofDEMO.gif)
<br>

## Table of Contents:
=================================================================

* [Technologies Used](##technologies-used:)
* [Installation](##installation:)
* [Process](##process:)
    - [SignUp Validation with React](###signup-validation-with-react)
    - [Login Validation with React](###login-validation-&-jwt-creation)
* [Authors](##authors:)
* [License](##license:)
* [Acknowledgements](##acknowledgements:)

## Technologies Used:
=================================================================

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Bootstrap](https://getbootstrap.com/)
- [JavaScript](https://www.javascript.com/)
- [jQuery](https://jquery.com/)
- [JSON](https://www.json.org/json-en.html)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [react-calendar](https://www.npmjs.com/package/react-calendar)
- [react-dayjs](https://www.npmjs.com/package/react-dayjs)
- [react-dom](https://reactjs.org/docs/react-dom.html)
- [react-router-dom](https://reactrouter.com/web/guides/quick-start)
- [react-scripts](https://www.npmjs.com/package/react-scripts)
- [react-table](https://www.npmjs.com/package/react-table)
- [react-validation](https://www.npmjs.com/package/react-validation)
- [react-vis](https://uber.github.io/react-vis/)
- [JWT](https://jwt.io/)
- [Day.js](https://day.js.org/)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [Visual Studio Code](https://code.visualstudio.com/)

## Installation:
=================================================================

On the server side, run these command lines in the terminal:

```
npm i axios bcryptjs cors dayjs express if-env jsonwebtoken mysql2 path react react-table react-vis sequelize
```

On the client side, run these command lines

```
npm i @testing-library/jest-dom @testing-library/react @testing-library/user-event dayjs moment react react-calendar react-dayjs react-dom react-router-dom react-scripts react-table react-validation sequelize web-vitals
```

## Process:
=================================================================
<!-- This is a root HTML IMAGE link if you want to use it to add more photos to the assets/README/ directory -->
<!-- ![IMAGE](https://github.com/profjjk/under-one-roof/blob/main/client/public/assets/README/) -->

### SignUp Validation with React

We used the react-validation library to validate forms. It is not easy to validate forms in react due to the one-way flow of data. We can't affect forms from the inputs in an easy way. React-validation provides several components which are 'connected' to the form via the input's method attached by the Form component.

![IMAGE](https://github.com/profjjk/under-one-roof/blob/main/client/public/assets/README/RequiredFieldsSignUp.png)

![IMAGE](https://github.com/profjjk/under-one-roof/blob/main/client/public/assets/README/SignUpFormValidation.png)

```javascript
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The address or nickname must be between 3 and 40 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
```

![IMAGE](https://github.com/profjjk/under-one-roof/blob/main/client/public/assets/README/SuccessfulSignUp.png)

For the SignUp page, we used the message response from this form validation to trigger a ternary operator. A failed response returns an alert-danger with the message. A successful response returns a success alert with the message and redirect link to the Login page.

```javascript
{message && (
<div className="form-group">
    <div
    className={ successful ? "alert alert-success" : "alert alert-danger" }
    role="alert"
    >
    {message}
    </div>
    <div className="d-flex justify-content-center">
    <a href="/login">
        <img src="/assets/img/Login/loginICON-72.png" alt="Login button image" />
    </a>
    </div>
</div>
)}
```
<br>

### Login Validation & JWT Creation

![IMAGE](https://github.com/profjjk/under-one-roof/blob/main/client/public/assets/README/LoginValidation.jpg)

In this example, we validate the login credentials on the server side and grant a JWT for authentication only if the user is found with a corresponding hashed password. This token has a 24hr expiration for access.

```javascript
exports.signin = (req, res) => {
    // Sign in from Database
    Home.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            }); 
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
```


### Expense Model & Budget/Expenses Pages

To run a shared budget and payments analysis within our application, we needed to add a model instance in our database that could contain details about an expense. This model also includes a boolean paid descriptor, and if the instance of the model has been paid, there needs to be an associated paid by name.

We instantiated this model as belonging to the Home model, which is our overarching login model.  With this relationship, we are able to restrict the data that is presented to an individiual home to only their own data.

```javascript
const currentUser = AuthService.getCurrentUser();

// Data Retrieval Functions
const getHomeId = () => {
    const HomeId = currentUser.id;
    return HomeId;
}

let HomeId = getHomeId();

const getExpenses = (data) => {
    let id = data;
    API.getExpenses(id)
    .then(results => {
        sortExpenses(results.data)
        dispatch({
            type: GET_EXPENSES,
            expenses: results.data
        });
    })       
}

useEffect (async () =>  {
  await getExpenses(HomeId);
}, []);
```

Beyond this, we used react-vis to populate our pie and bar charts on the Budget page, which required formatting our stately variable data into the highly specific parameters for the react-vis built in components.

```javascript
const pieDataFormat = (data) => {
  // Create totals variables
  let rentSum = 0;
  let utilitiesSum = 0;
  let otherSum = 0;

  for (var i = 0; i < data.expenses.length; i++) {
      if (data.expenses[i].expenseType === "rent" || data.expenses[i].expenseType === "Rent") {
          rentSum += parseInt(data.expenses[i].expenseAmount);
      } else if (data.expenses[i].expenseType === "utilities" || data.expenses[i].expenseType == "Utilities") {
          utilitiesSum += parseInt(data.expenses[i].expenseAmount);
      } else {
          otherSum += parseInt(data.expenses[i].expenseAmount);
      }
  }

  const pieChart = [];
  pieChart.push({angle: rentSum, label: rentSum});
  pieChart.push({angle: utilitiesSum, label: utilitiesSum});
  pieChart.push({angle: otherSum, label: otherSum});
  return pieChart;
};
const pieData = pieDataFormat(state);


<div className="col-lg-7 chart d-flex justify-content-center">
  <RadialChart
  data={pieData}
  radius={125}
  width={300}
  height={300} />
</div>
```

Finally to create the reactive table at the bottom of the Budget page, we utilized the react-table package to create a clean manipulable table.

```javascript
<table className="table" border="1" {...getTableProps()} style={{textAlign: "center"}}>
  <thead className="table-header">
      {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>(
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      <span>
                          {column.isSorted 
                              ? column.isSortedDesc
                                  ? "🔽"
                                  : "🔼"
                              : ""}
                      </span>
                  </th>
              ))}
          </tr>
      ))}
  </thead>
  <tbody {...getTableBodyProps()}>
      {rows.map(row => {
          prepareRow(row)
          return (
              <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                      return (
                          <td {...cell.getCellProps()} >
                              {cell.render("Cell")}
                          </td>
                      )
                  })}
              </tr>
          )
      })}
  </tbody>
</table> 
```

## Authors

- Ryan Kirkland
    - [GitHub](https://github.com/RyanKirkland86)
    - [LinkedIn](https://www.linkedin.com/in/ryan-kirkland-619942200/)
- Jordan Kelly
    - [GitHub](https://github.com/profjjk)
    - [LinkedIn](https://www.linkedin.com/in/the-real-jordan-kelly/)
- Shaun Limbeek
    - [GitHub](https://github.com/slimbeek6)
    - [LinkedIn](https://www.linkedin.com/in/shaun-limbeek/)


## License

This Project is licensed under the MIT License.
<br>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Acknowledgements

A special thanks to our instructors Jerome, Mahi, and Manuel for all of your help and support. You guys are the best!
- [UC Berkeley](https://bootcamp.berkeley.edu/coding/)