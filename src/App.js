import { useCallback, useReducer, useState } from 'react';
import './App.css';
import ExpressionInput from "./components/ExpressionInput";
import JsonData from './components/JsonData';

const ADD_EXPRESSION = "add_expression";
const REMOVE_EXPRESSION = "remove_expression"
const UPDATE_EXPRESSION = "update_expression"

function expressionReducer(state,action){
    switch(action.type){   
      case ADD_EXPRESSION: {
        return [...state,{
            key: "",
            output: {
                value: '',
                operator: '',
                score: ''
            }
        }];
      }
      case REMOVE_EXPRESSION: {
        return state.filter((val,idx) =>{
            return idx != action.payload
        })
      }
      case UPDATE_EXPRESSION: {
        const rules = [...state]
        rules[action.payload.number] = action.payload.rule;
        return rules;
      }
    }    
}

function App() {
  const [combinator,setCombinator] = useState("");
  const [rules,dispatch] = useReducer(expressionReducer,[{
            key: "",
            output: {
                value: '',
                operator: '',
                score: ''
            }
  }]);

  const addCombintor = (e) => {
    const {value} = e.target;
    if(value != "no") setCombinator(value)
    else alert("Please select valid option")
  }

  const addExpression = (e) => {
    e.preventDefault();
    let data = (rules.length-1 >= 0)? rules[rules.length-1]: null;
    if(data && (!data.key || !data.output.value || !data.output.operator || !data.output.score)){
         alert("Please complete the previous expression first")
    }
    else dispatch({type:ADD_EXPRESSION})
  }

  const removeExpression = useCallback((idx) => {
    dispatch({type:REMOVE_EXPRESSION,payload:idx}) 
  },[]);


  const UpdateExpression = useCallback((number,rule) => {
      dispatch({type:UPDATE_EXPRESSION,payload:{number,rule}})        
  },[]);


  return (
    <div className="App position-relative flex">
         {/* for bg animations*/}
         <ul className='circles'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
         </ul>
        <div className=' position-relative w-100  p-2 d-flex gap-5  align-items-center align-items-lg-start flex-column flex-lg-row'>
          <div className='col-10 col-sm-8 col-md-6 col-lg-5'>
           <p className=' fw-bold fs-3 bg-body-tertiary bg-gradient text-primary  p-1 rounded-2'>Expression Form</p>   
           <form className=' d-flex flex-column gap-2'>
            <div className=' d-flex justify-content-between bg-secondary bg-gradient bg-opacity-10 p-1 rounded-2'>
              <p className=' fw-bold fs-4'>Connector Type</p>
              <select className='form-select w-50' onChange={addCombintor} value={combinator}>
                 <option value="no">--Select Type--</option>
                 <option value="and">AND</option>
                 <option value="or">OR</option>
              </select>
            </div>  
              <div className='d-flex flex-column gap-2 expressions_containor'>
                  {
                    rules.map((val,idx) => <ExpressionInput number={idx} values={val} removeExpression={removeExpression} key={idx} UpdateExpression={UpdateExpression} /> )
                  }  
              </div>
            <button className='btn btn-dark mt-1 w-50 fw-medium' onClick={(e) => addExpression(e)}>Add Expression</button> 
           </form>
          </div>
          <div className=' p-2 json col-10 col-sm-8 col-md-6 col-lg-5 bg-secondary bg-gradient bg-opacity-25 position-relative'>
          <p className=' position-sticky top-0 fw-bold fs-3 bg-body-tertiary text-primary  p-1 rounded-2'>JSON Output</p>
            <p className='mt-1'>{"{"}</p>
            <p>&nbsp;&nbsp;&nbsp;{`"rules": [`}</p>
              <div className='json_data '>
                {rules.map((val) => <JsonData val={val} />)} 
              </div> 
            <p>&nbsp;&nbsp;&nbsp;{'],'}</p>  
            <p>&nbsp;&nbsp;&nbsp;"combinator" : {combinator? <span>"{combinator}"</span> : <span>""</span>  }</p>  
            <p>{"}"}</p>
          </div>    
        </div>    
    </div>
  );
}

export default App;
