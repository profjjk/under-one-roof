import React, { useEffect } from 'react';
import API from '../utils/API';
import { useExpenseContext } from '../utils/GlobalState';
import ExpensesTbl from '../components/ExpensesTbl';
import { ADD_EXPENSE, SET_EXPENSES } from '../utils/redux/constants/actions';
import AuthService from '../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';

const Expenses = () => {
    const dispatch = useDispatch();
    const { id: HomeId } = AuthService.getCurrentUser();
    const { expenses } = useSelector(state => state.expenses);

    const getExpenses = (data) => {
        API.getExpenses(HomeId)
            .then(expenses => {
                sortExpenses(expenses.data)
                dispatch({
                    type: SET_EXPENSES,
                    expenses: expenses.data
                });
            })
    }

    useEffect(() => {
        getExpenses(HomeId);
    }, []);

    // Data Manipulation Function
    const sortExpenses = (data) => {
        data.sort(function (a, b) {
            return b.expenseAmount - a.expenseAmount;
        });
    }

    // Data Add Function
    const submit = async e => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        let expenseData = {
            expenseName: formData.name,
            expenseAmount: formData.amount,
            expenseDate: Date.now(),
            expenseType: formData.type,
            paid: formData.paid === "on",
            paidBy: formData.paidBy,
            HomeId: HomeId
        }
        API.addExpense(expenseData)
            .then(() => {
                dispatch({
                    type: ADD_EXPENSE,
                    expense: expenseData
                });
            })
    };

    return (
        <main className="justify-content-center">
            <section className="m-0 col-lg-9 col-md-11 mt-5 mx-auto">
                <h3 className="logo my-3 text-center red">All Expenses</h3>
                <div className="table-responsive">
                    <table className="table table-dark"
                           border="1"
                           style={{textAlign: 'center'}}>
                        <thead>
                            <tr>
                                <th>Expense Name</th>
                                <th>Expense Amount</th>
                                <th>Expense Type</th>
                                <th>Expense Paid?</th>
                                <th>Expense Paid By</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {expenses.map(expense => (
                            <ExpensesTbl expenseName={expense.expenseName}
                                         expenseAmount={expense.expenseAmount}
                                         expenseType={expense.expenseType}
                                         paid={expense.paid === 0 ? "Y" : "N"}
                                         paidBy={expense.paidBy}
                                         id={expense.id}/>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="row expense-form">
                <div className="card col-lg-8 col-md-12"
                     id="bottomcard">
                    <h2 className="medium text-center">Expense Management</h2>
                    <div className="row mt-4 d-flex justify-content-center">
                        <div className="col-xl-6 col-lg-10">
                            <h3 className="small bold">Add New Expense:</h3>
                            <form className="form-group"
                                  onSubmit={submit}>
                                <input className="form-control mb-2 small"
                                       required
                                       name={"name"}
                                       placeholder="Name of Expense"/>
                                <input className="form-control mb-2 small"
                                       required
                                       name={"amount"}
                                       placeholder="Expense Amount"/>
                                <input className="form-control mb-3 small"
                                       required
                                       name={"type"}
                                       placeholder="Expense Type, enter Rent, Utilities, or Other"/>
                                <div className="form-check mb-3 ml-2">
                                    <input className="form-check-input"
                                           type="checkbox"
                                           value=""
                                           name={"paid"}
                                           id="paidCheckBox"
                                           style={{height: '25px', width: '25px'}}/>
                                    <label className="form-check-label small ml-4"
                                           htmlFor="paidCheckBox">Paid?</label>
                                </div>
                                <input className="form-control mb-2 small"
                                       name={"paidBy"}
                                       placeholder="Paid by ..."/>
                                <button className="btn btn-success small mt-3 mb-5"
                                        type="submit">Save Expense
                                </button>
                            </form>
                        </div>
                        {/*<div className="col-xxl-6 col-xl-10">*/}
                        {/*    <h3 className="medium text-center">Largest Expenses:</h3>*/}
                            {/*<table className="table"*/}
                            {/*       border="1" {...getTableProps()}*/}
                            {/*       style={{textAlign: "center"}}>*/}
                            {/*    <thead className="table-header">*/}
                            {/*    {headerGroups.map(headerGroup => (*/}
                            {/*        <tr {...headerGroup.getHeaderGroupProps()}>*/}
                            {/*            {headerGroup.headers.map(column => (*/}
                            {/*                <th {...column.getHeaderProps(column.getSortByToggleProps())}>*/}
                            {/*                    {column.render("Header")}*/}
                            {/*                    <span>*/}
                            {/*                                {column.isSorted*/}
                            {/*                                    ? column.isSortedDesc*/}
                            {/*                                        ? "🔽"*/}
                            {/*                                        : "🔼"*/}
                            {/*                                    : ""}*/}
                            {/*                            </span>*/}
                            {/*                </th>*/}
                            {/*            ))}*/}
                            {/*        </tr>*/}
                            {/*    ))}*/}
                            {/*    </thead>*/}

                            {/*    <tbody {...getTableBodyProps()}>*/}
                            {/*    {rows.map(row => {*/}
                            {/*        prepareRow(row)*/}
                            {/*        return (*/}
                            {/*            <tr {...row.getRowProps()}>*/}
                            {/*                {row.cells.map(cell => {*/}
                            {/*                    return (*/}
                            {/*                        <td {...cell.getCellProps()} >*/}
                            {/*                            {cell.render("Cell")}*/}
                            {/*                        </td>*/}
                            {/*                    )*/}
                            {/*                })}*/}
                            {/*            </tr>*/}
                            {/*        )*/}
                            {/*    })}*/}
                            {/*    </tbody>*/}
                            {/*</table>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </section>
        </main>

    )
}

export default Expenses;