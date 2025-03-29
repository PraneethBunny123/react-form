// This component is just login page to handle input feilds via state and not refs

import { useState } from "react";

export default function StateLogin() {
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    password: ''
  })

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  })

  const emailIsValid = didEdit.email && !enteredValue.email.includes('@')

  //const emailIsValid = enteredValue.email !== '' && !enteredValue.email.includes('@') //validatiion on every key stroke

  function handleSubmit(event) {
    event.preventDefault()
    console.log(enteredValue.email)

    setEnteredValue({
        email: '',
        password: ''
    })
  }

  function handleInputChange(identifier, value) {
    setEnteredValue(prevValue => ({
      ...prevValue,
      [identifier]: value
    }))

    //To discard error when user again starts typing in the input feild even after he lost focus and retypes again (We change the state to false on every key stroke here to do that)
    setDidEdit(prevValue => ({
        ...prevValue,
        [identifier]: false
    }))
  }

  function handleInputBlur(identifier) {
    setDidEdit(prevValue => ({
        ...prevValue,
        [identifier]: true
    })) 
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email"
            onBlur={() => handleInputBlur('email')}
            onChange={(event) => handleInputChange('email', event.target.value)} 
            value={enteredValue.email}
          />
          <div className="control-error">{emailIsValid && <p>Please enter a valid email</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            name="password"
            onChange={(event) => handleInputChange('password', event.target.value)} 
            value={enteredValue.password} 
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
