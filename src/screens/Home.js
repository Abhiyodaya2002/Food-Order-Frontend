import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useDispatchCart, useCart } from '../components/ContextReducer'

export default function Home() {
 const [search, setSearch]= useState('');
 const [foodItem, setFoodItem] =useState([]);
 const [foodCat, setFoodCat] =useState([]);

 const loadData =async()=>{
    let response= await fetch("https://foodflow-backend.onrender.com/api/foodData",{
        method: "POST" ,
       headers: {
        "Content-Type": "application/json"
       }
    })

    response =await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
   // console.log(response[0], response[1]);
 }

 useEffect(()=>{
    loadData();
 }, []);

    return (
        <div style={{backgroundColor: "rgb(34, 34, 34)"}}>
            <div>
                <Navbar />
            </div>

            {/* We are writing the carousel code here and not in separate component because we given a search bar on carousel and that is directly linked with the elements of home page. Hence when it is given to a separate component, it will not work. */}
            <div>  
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div className='carousel-caption' style={{zIndex: "10"}}>
    <div class="d-flex justify-content-center">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{ setSearch(e.target.value)}}/>
      {/* <button class="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>

    </div>
    <div className="carousel-item active">
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." style={{filter: "brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." style={{filter: "brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." style={{filter: "brightness(30%)"}}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
            </div>

            <div className='container' >
                {
                    foodCat.length >0 ?
                    foodCat.map((data)=>{
                        return(
                            <div className='row mb-3'>
                              <div key={data._id} className='fs-3 m-3' style={{color:"rgb(193 185 185)"}}>
                                {data.CategoryName}
                              </div>
                                <hr  style={{color:"rgb(193 185 185)"}}/>
                               
                                {
                                    foodItem.length >0?
                                    foodItem.filter((item)=>{
                                       return (item.CategoryName===data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                                    }).map((filterItems)=>{
                                       return (
                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 '>
                                        <Card foodItem={filterItems} options={filterItems.options[0]}  ></Card>
                                        </div>
                                       )
                                    }): <div style={{color:"rgb(193 185 185)"}}>No such data found</div>
                                }
                                 </div>
                        )
                    }): "no data"
                }
              
             </div>

            <div  style={{color:"rgb(193 185 185)"}}>
                <Footer />
            </div>

        </div>
    )
}
