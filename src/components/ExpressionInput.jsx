import React, { memo, useEffect, useState } from 'react'

const ExpressionInput = ({number,values,removeExpression,UpdateExpression}) => {
  const [key,setKey] = useState('');
  const [output,setOutput] = useState({
        value : "",
        operator: "",
        score: ""
  })
  function handleChange(e){
    const {value} = e.target;
    if(value != "no") setKey(value);
    else alert("Please Select Valid Rule Type")
  }
  function handleOperatorChange(e){
    const {value} = e.target;
    if(value != "no") setOutput({...output,operator:value});
    else alert("Please Select Valid Rule Type") 
  }

  useEffect(() =>{
    UpdateExpression(number,{key,output});
  },[key,output])

  return (
    <div className=' d-flex flex-column gap-1 p-2 shadow-sm rounded-3 bg-secondary bg-gradient bg-opacity-10 '>
      <div className=' d-flex justify-content-between'>
        <div className=' w-50'>
        <label className=' p-1 fw-bold'>Rule Type</label>
        <select className='form-select' onChange={(e) => handleChange(e)} value={values?.key}>
        <option value="no">-Select Type-</option>
        <option value="age">Age</option>
        <option value="credit_score">Credit Score</option>
        <option value="account_balance">Account Balance</option>
        </select>
        </div>
        <button className='btn btn-danger h-75 px-2 py-0 fw-bold' onClick={(e) => {
            e.preventDefault();
            console.log(number);
            removeExpression(number) 
        }}>X</button>
      </div>
      <div className='p-2 row gap-2'>
        <input type="number" placeholder='Value' className=' form-control col' onInput={(e) => setOutput({...output,value:e.target.value})} value={values?.output.value} />
        <select className=' form-select col' onChange={(e) => handleOperatorChange(e)} value={values?.output.operator}>
          <option value="no" className='no'>-Operator-</option>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
          <option value=">=">&#x2265;</option>
          <option value="<=">&#8804;</option>
          <option value="=">=</option>
        </select>
        <input type="number" placeholder='Score' className=' form-control col' onInput={(e) => setOutput({...output,score:e.target.value})} value={values?.output.score} />
      </div> 
    </div>
  )
}

export default memo(ExpressionInput);