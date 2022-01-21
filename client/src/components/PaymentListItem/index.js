import React from "react";

export default function PaymentListItem(props) {
    let nam = {};
    nam = props.name[0];
    
    let names = 0;

    let namesArr; let amountArr; let emptArr;
    if (!nam) {
        emptArr = [];
    } else {
        namesArr = Object.keys(nam);
        amountArr = Object.values(nam);
        names = namesArr.length;
    }   

    let output;

    if (names === 1){
        output = <h6>{namesArr[0]}: <span><p>${amountArr[0]}</p></span></h6>;
    } else if (names === 2) {
        output = 
            <div className="row">
                <p className="col-5 small text-center">{namesArr[0]} <br/> <span className="red">${amountArr[0]}</span></p>
                <p className="col-5 small text-center">{namesArr[1]} <br/> <span className="red">${amountArr[1]}</span></p>
            </div>;
    } else if (names === 3) {
        output = 
            <div className="row">
                <p className="col-4 small text-center">{namesArr[0]} <br/> <span className="red">${amountArr[0]}</span></p>
                <p className="col-4 small text-center">{namesArr[1]} <br/> <span className="red">${amountArr[1]}</span></p>
                <p className="col-4 small text-center">{namesArr[2]} <br/> <span className="red">${amountArr[2]}</span></p>
            </div>;
    } else if (names === 4) {
        output = 
            <div className="row">
                <p className="col-3 small text-center">{namesArr[0]} <br/> <span className="red">${amountArr[0]}</span></p>
                <p className="col-3 small text-center">{namesArr[1]} <br/> <span className="red">${amountArr[1]}</span></p>
                <p className="col-3 small text-center">{namesArr[2]} <br/> <span className="red">${amountArr[2]}</span></p>
                <p className="col-3 small text-center">{namesArr[3]} <br/> <span className="red">${amountArr[3]}</span></p>
            </div>;
    } else {
        output = <h6 className="text-center red">No Payments Yet</h6>;
    }

    return (
        <div className="w-100">
            {output}
        </div>
    )   
}