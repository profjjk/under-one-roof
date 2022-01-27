import React from "react";
import PaymentListItem from "../PaymentListItem";

export default function PaymentList(props, { expenses }) {
    const roomies = [];

    const cleanData = (data) => {
        const roomObj = {};

        for( const i=0; i< expenses.length; i++) {
            let key = expenses[i].paidBy;
            let amount =0;
            for (const j=0; j< expenses.length; j++) {
                if (expenses[j].paid === true && expenses[j].paidBy === key) {
                    amount += parseInt(expenses[j].expenseAmount);
                }
            }

            if(key !== "0" && key !== "") {
                roomObj[key] = amount;
                roomies.push(roomObj);
            }
        }
    }

    if (expenses) {
        cleanData(expenses);
    }

    return (
        <div className="d-flex justify-content-center border">
                <PaymentListItem name={roomies} />
        </div>
    )
}