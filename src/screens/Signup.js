import React, {useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Signup() {
  const navigate= useNavigate();
const [credentials, setCredentials]= useState({name: "",email: "", password: "", geolocation: ""});
    const handleSubmit= async(e)=>{
       e.preventDefault(); //Synthetic Event
      // console.log(JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation}));
       const response= await fetch("https://foodflow-backend.onrender.com/api/createuser",{
        method:"POST",
        headers :{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation})
       });
       const json= await response.json();
      // console.log(json);
       
       if(!json.success) // this success part is given in backend of createuser endpoint
       {
        alert("Enter valid credentials!!");
       }
       else{
        navigate("/login");
       }
      
    }

    const onChange=(event)=>{
     setCredentials({...credentials, [event.target.name]: event.target.value});
    }
    
  return (
    <>
<div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>    
    <div>
      <Navbar></Navbar>
    </div>
    <div className='container'>

      <form className='w-50 m-auto mt-5 bg-dark p-3 rounded' onSubmit={handleSubmit} style={{color:"rgb(206 192 192)"}}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} style={{backgroundColor:"rgb(24 23 23)",color:"rgb(206 192 192)"}} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} style={{backgroundColor:"rgb(24 23 23)",color:"rgb(206 192 192)"}}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} style={{backgroundColor:"rgb(24 23 23)",color:"rgb(206 192 192)"}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation} onChange={onChange} style={{backgroundColor:"rgb(24 23 23)",color:"rgb(206 192 192)"}}/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
</form>

</div>
</div>
    </>
  )
}
