import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Login() {
  let navigate=useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault(); //Synthetic Event
    //console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
    const response = await fetch("https://foodflow-backend.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
  //console.log(json);

    
    if(json.success)
    {
      //The localStorage.setItem() method is used to store data in the browser's localStorage. It takes two parameters: the key and the value.
      //In this case, the key is set as "authToken", and the value is retrieved from the json object using json.authToken.
    //  console.log("In login comp email is :", credentials.email);
      localStorage.setItem("userEmail", (credentials.email));
      localStorage.setItem("authToken", json.authToken);
    //  console.log(localStorage.getItem("authToken"));
      navigate("/");

    }
    else // this success part is given in backend of createuser endpoint
    {
      alert("Enter valid credentials!!");
    }

  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }
  
  return (
    <>
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover', filter: "brightness(90%)"}}>
        <div>
        <Navbar />
      </div>
      <div className='container'>

        <form className='w-50 p-2 m-auto mt-5 bg-dark rounded'  onSubmit={handleSubmit}  style={{color:"rgb(206 192 192)"}}>
          
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} style={{backgroundColor:"rgb(24 23 23)",color:"rgb(206 192 192)"}}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} style={{backgroundColor:"rgb(24 23 23)",color:"rgb(206 192 192)"}}/>
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new User</Link>
        </form>

      </div>
      </div>
      
    </>
  )
}
