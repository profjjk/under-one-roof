import React from 'react';
import { Link } from "react-router-dom";

function UserCard(props) {

  return (
    <div className="mx-4">
      <div className="row blueBG p-2">
        <h2 className="col-12 white text-center">
          {props.heading}
        </h2>
      </div>
      {props.list.map(listItem => {
        return (
          <div className="row listItem border px-1" key={listItem.id}>
            <p className="col-2 pt-3">{listItem.userName}</p>
            <p className="col-2 pt-3">{listItem.contactPhone}</p>
            <p className="col-2 pt-3">{listItem.contactEmail}</p>
            <p className="col-2 pt-3">{listItem.emergencyName}</p>
            <p className="col-2 pt-3">{listItem.emergencyPhone}</p>
          </div>
        )
      })}
      
      <div>
        <Link to="/Home"><span><button className="btn btn-success">Go to Home</button></span></Link>
      </div>
      
    </div>
  )
}

export default UserCard;