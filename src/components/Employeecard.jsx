import React from "react";
import './Employeecard.css'

const EmployeeCard = ({ name, age, isAdded, btnType, btnAction, id }) => {

  function clickHandler() {
    btnAction(id);
  }

  return (
    <div className="employee-card-container">
     
     <div className="datastyle">
     <p >{name}</p>
      <p>{age}</p>
      {btnType === "add" ? (
        isAdded === false && <button onClick={clickHandler}>{btnType}</button>
      ) : (
        <button onClick={clickHandler}>{btnType}</button>
      )}
      </div> 

     
    </div>
  );
};

export default EmployeeCard;