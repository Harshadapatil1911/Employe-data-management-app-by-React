import React, { useEffect, useReducer } from "react";
import "./styles.css";
import Data from "./data";

function App() {


  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return {
          ...state,
          employeeData: state.employeeData.map((value, index, array) =>
            value.id === action.payload.id ? { ...value, isadded: true } : value
          ),
          teamList: [...state.teamList, action.payload],
        };
      case "sort":
        return {
          ...state,
          teamList: state.teamList.sort((a, b) => a.age - b.age),
        };

      case "remove":
        return {
          ...state,
          employeeData: state.employeeData.map((value, index, array) =>
            value.id === action.payload.id
              ? { ...value, isadded: false }
              : value
          ),
          teamList: state.teamList.filter(
            (value, index, array) => value.id !==  action.payload.id
          ), // array
        };

        case "avg":
      
          return {
           
            employeeData: state.employeeData,
            teamList: state.teamList,
           
            averageAge:action.payload

           
          }

      default:
        return state;
    }
  };

  const initialState = {
    employeeData: Data,
    teamList: [],
   
    averageAge:0
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.employeeData);
  console.log("team", state.teamList);

  // function averageAge(){
  //   dispatch({type:"averageAge"})
  // }

  useEffect(()=>{
        const total = state.teamList.reduce((acc, value)=> acc + value.age ,0)
          const tempaverageAge = Math.floor(total/ state.teamList.length )
          dispatch({type:"avg",payload:tempaverageAge})
          console.log(tempaverageAge);
  },[state.teamList])
  return (
    <>
      <div className="main">
        <div className="left">
          <h1 
          style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            color:'red'
          }}>Employees</h1>
          {state.employeeData.map((ele, index, array) => {
            return (
              <div className="emp" key={index}>
                <p>
                  {ele.first_name} {ele.last_name}
                </p>
                <p>{ele.age}</p>

                {ele.isadded ? (
                  <button disabled>Add</button>
                ) : (
                  <button
                    onClick={() => {
                      dispatch({ type: "add", payload: ele });
                    }}
                    
                  >
                   
                    add
                  </button>
                )}

              </div>
               
            );
          })}
        </div>

        <div className="right">
          <h1
          style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            color:'red'
          }}>Teams</h1>
         

          {state.teamList.map((ele, index, array) => {
            return (
              <div className="emp" key={index}>
                <p>
                  {ele.first_name} {ele.last_name}
                </p>
                <p>{ele.age}</p>

                <button
                  onClick={() => {
                    dispatch({ type: "remove", payload: ele });
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <p style={{
            
            fontFamily:'monospace',
            fontSize:'40px',
            fontStyle:'bold',
            fontWeight:'600'
          }}>Average of age :{state.averageAge} </p>
           <button
            onClick={() => {
              dispatch({ type: "sort" });
            }}
          
          >
            Sort By age
          </button>
        </div>
      </div>
    </>
  );
}

export default App;