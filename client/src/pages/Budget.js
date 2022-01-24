import React, { useEffect } from "react";
import { useExpenseContext } from "../utils/GlobalState";
import { GET_EXPENSES, ADD_EXPENSE } from "../utils/actions";
import { RadialChart, XAxis, XYPlot, YAxis, VerticalBarSeries, LabelSeries } from "react-vis";
import PaymentList from "../components/PaymentList";
import AuthService from "../services/auth.service";
import { useTable, useSortBy } from "react-table";
import API from "../utils/API";
import dayjs from "dayjs";
import "./style.css";

const Budget = () => {
    // Getting data from state and page
    const currentUser = AuthService.getCurrentUser();
    const [state, dispatch] = useExpenseContext();

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

    // Data Clean-up Functions
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
            expenseType: formData.type,
            paid: formData.paid,
            paidBy: formData.paidBy,
            expenseDate: Date.now(),
            HomeId: HomeId
        }
        API.addExpense(expenseData)
        .then(results => {
            dispatch({
                type: ADD_EXPENSE,
                expenses: results.data
            });
        })
    };

    const pieDataFormat = (data) => {
        let rentSum = 0;
        let utilitiesSum = 0;
        let otherSum = 0;

        if (data.expenses.length < 0) {
            for (let i = 0; i < data.expenses.length; i++) {
                if (data.expenses[i].expenseType.toLowerCase() === "rent") {
                    rentSum += parseInt(data.expenses[i].expenseAmount);
                } else if (data.expenses[i].expenseType.toLowerCase() === "utilities") {
                    utilitiesSum += parseInt(data.expenses[i].expenseAmount);
                } else {
                    otherSum += parseInt(data.expenses[i].expenseAmount);
                }
            }
        }

        const pieChart = [];
        pieChart.push({angle: rentSum, label: rentSum});
        pieChart.push({angle: utilitiesSum, label: utilitiesSum});
        pieChart.push({angle: otherSum, label: otherSum});
        return pieChart;
    };

    const barDataFormat = (data) => {
        // Create totals variables
        let rentOwed = 0;
        let rentPaid = 0;
        let utilitiesOwed = 0;
        let utilitiesPaid = 0;
        let otherOwed = 0;
        let otherPaid = 0;

        for (let i=0; i < data.expenses.length; i++) {
            if (data.expenses[i].expenseType === "rent" || data.expenses[i].expenseType === "Rent") {
                rentOwed += parseInt(data.expenses[i].expenseAmount);
                if (data.expenses[i].paid === true) {
                    rentPaid += parseInt(data.expenses[i].expenseAmount);
                }
            } else if (data.expenses[i].expenseType == "utilities" || data.expenses[i].expenseType == "Utilities") {
                utilitiesOwed += parseInt(data.expenses[i].expenseAmount);
                if (data.expenses[i].paid === true) {
                    utilitiesPaid += parseInt(data.expenses[i].expenseAmount);
                }
            } else {
                otherOwed += parseInt(data.expenses[i].expenseAmount);
                if (data.expenses[i].paid === true) {
                    otherPaid += parseInt(data.expenses[i].expenseAmount);
                }
            }            
        }

        let totalOwed = [{x: "Rent", y: rentOwed}, {x: "Utilities", y: utilitiesOwed}, {x: "Other", y: otherOwed}];
        let totalPaid = [{x: "Rent", y: rentPaid}, {x: "Utilities", y: utilitiesPaid}, {x: "Other", y: otherPaid}];
        let exportedData = {totalOwed: totalOwed, totalPaid: totalPaid};

        return exportedData;
    };
    
    const barLabelData = (data) => {
        let totalOwed = data.totalOwed;
        let totalPaid = data.totalPaid;
        let labelData = totalOwed.map ((d, idx) => ({
            x:d.x,
            y: Math.max(totalOwed[idx].y, totalPaid[idx].y)
        }));

        return labelData
    };

    const pieData = pieDataFormat(state);
    const barData = barDataFormat(state);
    const barLabels = barLabelData(barData); 

    let labelData = barLabels;

    const totalOwedFormat = (data) => {
        let owed = 0;
        
        for (let i =0; i< data.totalOwed.length; i++) {
            owed += parseInt(data.totalOwed[i].y);
        }

        return owed;
    };
    
    const totalPaidFormat = (data) => {
        let paidTot = 0;
        
        for (let j =0; j< data.totalPaid.length; j++) {
            paidTot += parseInt(data.totalPaid[j].y);
        }

        return paidTot;
    };

    const totalOwed = totalOwedFormat(barData);
    const totalPaid = totalPaidFormat(barData);

    const getRowData = (data) => {
        let rowData = [];
        let rowObj = {};
        for ( let i=0; i < data.expenses.length; i++) {
            let keys = Object.keys(data.expenses[i]);
            keys.shift();
            keys.pop();
            keys.pop();
            keys.pop();
            keys.push("Edit");
            keys.push("Delete");

            let values = Object.values(data.expenses[i]);
            values.shift();
            values.pop();
            values.pop();
            values.pop();
            values.push("<button id='edit' className='btn btn-success mx-auto'></button>");
            values.push("<button id='delete' className='btn btn-success mx-auto'></button>");
            values[2] = dayjs(values[2]).format("MMM DD");

            keys.forEach((key, k) => rowObj[key] = values[k]);
            
            rowData.push(rowObj);
            rowObj = {};
        }
        return rowData;
    }   

    const rowData = getRowData(state);

    const data = React.useMemo(
        ()=> rowData,
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: "Expense",
                accessor: "expenseName"
            },
            {
                Header: "Amount",
                accessor: "expenseAmount"
            },
            {
                Header: "Date",
                accessor: "expenseDate"
            },
            {
                Header: "Type",
                accessor: "expenseType"
            },
            {
                Header: "Paid By",
                accessor: "paidBy"
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data }, useSortBy)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
            <div className="container-fluid px-5">
                <div className="row-fluid">
                    <div className="col md-12">
                        <h1 className="logo mt-5 ml-4 text-center red">Overall Roommate Budget Page</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="card col-xl-5 col-lg-8">
                        <h2 className="medium text-center">Total Budget</h2>
                        <div className="row my-4 d-flex justify-content-center">
                            <div className="col-lg-7 chart d-flex justify-content-center">
                                <RadialChart
                                data={pieData}
                                radius={125}
                                width={300}
                                height={300} />
                            </div>
                            <div className="col-lg-8">
                                <h4 className="medium text-center">Breakdown of Expenses:</h4>
                                <div className="card">
                                    <h6 className="small">Total Rent: ${labelData[0].y}  <span><img className="img-fluid" src="/assets/Rent.png" alt="rent slice color"></img></span></h6>
                                    <h6 className="small">Total Utilities: ${labelData[1].y}  <span><img className="img-fluid" src="/assets/Utilities.png" alt="utilities slice color"></img></span></h6>
                                    <h6 className="small">Total Other Expenses: ${labelData[2].y}  <span><img className="img-fluid" src="/assets/Other.png" alt="rent slice color"></img></span></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card col-xl-5 col-lg-8">
                        <h2 className="medium mb-4 text-center">Roommate Budget and Payments</h2>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                            <XYPlot xType="ordinal" height={400} width={400} xDistance={100}>
                                <XAxis />
                                <YAxis />
                                <VerticalBarSeries className="vertical-bar-series-example" data={barData.totalOwed} />
                                <VerticalBarSeries className="vertical-bar-series-example" data={barData.totalPaid} />
                            </XYPlot>
                            </div>
                            <div className="col-lg-8">
                                <h4 className="small bold text-center my-4">Breakdown of Payments:</h4>
                                <div className="card my-0">
                                    <h6 className="small">Paid: ${totalPaid}  <span><img src="/assets/Rent.png" alt="rent slice color"></img></span></h6>
                                    <h6 className="small">Total: ${totalOwed} <span><img src="/assets/Utilities.png" alt="utilities slice color"></img></span></h6>
                                </div>
                                <br />
                                <div>
                                    <h4 className="small bold text-center">Sum of Roommate Payments:</h4>
                                        <PaymentList data={state} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="card col-lg-8 col-md-12" id="bottomcard">
                        <h2 className="medium text-center">Expense Management</h2>
                        <div className="row mt-4 d-flex justify-content-center">
                            <div className="col-xl-6 col-lg-10">
                                <h3 className="small bold">Add New Expense:</h3>
                                <form className="form-group" onSubmit={submit}>
                                    <input className="form-control mb-2 small" required name={"name"} placeholder="Name of Expense"/>
                                    <input className="form-control mb-2 small" required name={"amount"} placeholder="Expense Amount" />
                                    <input className="form-control mb-3 small" required name={"type"} placeholder="Expense Type, enter Rent, Utilities, or Other" />
                                    <div className="form-check mb-3 ml-2">
                                        <input className="form-check-input" type="checkbox" value="" name={"paid"} id="paidCheckBox" style={{height: '25px', width: '25px'}} />
                                        <label className="form-check-label small ml-4" for="paidCheckBox">Paid?</label>
                                    </div>
                                    <input className="form-control mb-2 small" name={"paidBy"} placeholder="Paid by ..." />
                                    <button className="btn btn-success small mt-3 mb-5" type="submit">Save Expense</button>
                                </form>
                            </div>
                            <div className="col-xxl-6 col-xl-10">
                                <h3 className="medium text-center">Largest Expenses:</h3>
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
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        )
};

export default Budget;