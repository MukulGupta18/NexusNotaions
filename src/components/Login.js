import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'


const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
              const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                 },
                 body: JSON.stringify({email: credentials.email, password: credentials.password })
              });
              const json = await response.json()
              console.log(json);
              if(json.success){
              // Save the auth token and redirect
              localStorage.setItem('auth-token', json.authtoken);
              props.showAlert("Logged In Successfully", "success")
              navigate ("/");

              }
              else{
                props.showAlert("Invalid details", "danger");
            }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

    return (
        <div className='mt-2'>
            <h1 className="my-2">Login to Continue Your Notes</h1>
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp"/>
                </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password"/>
                </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login