import React from 'react'
// import Delete from './logo192.png'
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div> 
        <div className='m-5 w-100 text-center fs-3' style={{color:"rgb(193 185 185)"}}>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }
const handleCheckOut = async()=>{
  let userEmail =localStorage.getItem("userEmail");
  //console.log("This is users email :",userEmail);
  let response = await fetch ("https://foodflow-backend.onrender.com/api/orderData", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json"
    },
    body: JSON.stringify({
      order_data: data,
      email: userEmail,
      order_date: new Date().toDateString()
    })
  });
  //console.log("Order Response:", response.status);
if (response.status===200)
{
  dispatch({type: "DROP"});
}
}


  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {/* {console.log(data)} */}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table '>
          <thead className=' text-success fs-4'>
            <tr style={{color: "rgb(0 132 8)"}}>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody style={{color:"rgb(206 192 192)"}}>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"> <i class="fa fa-trash" aria-hidden="true" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}></i>   </button> </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2' style={{color:"rgb(206 192 192)"}}>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' style={{color:"black"}} onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}