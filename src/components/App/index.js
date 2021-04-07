import './App.css';
import schema from "../../utils/schema";
import holyGhost from '../../holyGhost.svg';
import { useState } from "react";
import InputWithError from "../InputWithError/";

function App() {
  const initialValues = {
    name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: ""
  };

  let [values, setValues] = useState(initialValues);

  let [errors, setErrors] = useState(initialValues);

  let [submitted, setSubmitted] = useState(false);
  const handleInputChange = (event) => {
    let name = event.target.name;
    setValues((values) => ({
      ...values,
      [name]: event.target.value,
    }));
  };

  const transformErrors = (err) => {
    let errorsObj = {}
    err.inner.forEach((e) => {
      errorsObj[e.path] = e.message;
    });
    return errorsObj;
  };

  const handleSubmit = (e) => {
    console.log(values)
    schema.validate(values, { abortEarly: false })
    .then((value) => {
      setErrors(initialValues)
      setValues(initialValues);
      setSubmitted(true);
    })
    .catch((err) => {
      const errorObj = transformErrors(err);
      setErrors(errorObj);
    });
  };

  return (
    <div className="App">
      <img src={holyGhost} alt="logo" className={`logo ${submitted ? 'big' : 'small'}`}/>
      <InputWithError type="text" name="name" placeholder="Name" onChange={handleInputChange} error={errors.name} value={values.name}/>
      <InputWithError type="email" name="email" placeholder="Email" onChange={handleInputChange} error={errors.email} value={values.email}/>
      <InputWithError
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleInputChange}
        error={errors.username}
        value={values.username}
        description="10,177 usernames are already taken"
      />
      <InputWithError type="password" name="password" placeholder="Password" onChange={handleInputChange} error={errors.password} value={values.password}/>
      <InputWithError type="password" name="passwordConfirm" placeholder="PasswordConfirm" onChange={handleInputChange} error={errors.passwordConfirm} value={values.passwordConfirm}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
