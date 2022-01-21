import React, { useEffect } from 'react';
import API from '../utils/API';
import { useExpenseContext } from '../utils/GlobalState';
import ExpensesTbl from '../components/ExpensesTbl';
import { GET_EXPENSES } from '../utils/actions';
import AuthService from '../services/auth.service';

const Expenses = () => {
    // Getting data from state and page
    const [state, dispatch] = useExpenseContext();
    const currentUser = AuthService.getCurrentUser();

    let HomeId = currentUser.id;

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

    useEffect(() => {
        getExpenses(HomeId);
    }, [state]);

    // Data Manipulation Function
    const sortExpenses = (data) => {
        data.sort(function (a, b) {
            return b.expenseAmount - a.expenseAmount;
        });
    }

    return (

        <div className="row justify-content-center">
            <section className="m-0 col-lg-9 col-md-11 mt-5">
                <h3 className="logo my-3 text-center red">All Expenses</h3>
                <div className="table-responsive">
                    <table className="table table-dark"
                           border="1"
                           style={{textAlign: 'center'}}>
                        <tr>
                            <th>Expense Name</th>
                            <th>Expense Amount</th>
                            <th>Expense Type</th>
                            <th>Expense Paid?</th>
                            <th>Expense Paid By</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {state.expenses.map(expense => (
                            <ExpensesTbl expenseName={expense.expenseName}
                                         expenseAmount={expense.expenseAmount}
                                         expenseType={expense.expenseType}
                                         paid={expense.paid}
                                         paidBy={expense.paidBy}
                                         id={expense.id}/>
                        ))}
                    </table>
                </div>
            </section>
        </div>

    )
}

export default Expenses;