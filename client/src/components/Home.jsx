import React, { useEffect, useState } from "react";
import { getAllProduct } from "../services/productService";
import {jwtDecode}from "jwt-decode";
import axios from "axios";
function Home() {
  const [products, setProducts] = useState([]);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProd, setSelectedProd] = useState("");

  useEffect(() => {
    getAllProduct()
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addProductToCart= (id)=> {
    const token = localStorage.getItem("user")
    const decodedToken = jwtDecode(token)
    console.log("decodedtoken", decodedToken)
    const userID = decodedToken.userId
      axios.post(`http://localhost:3000/cart/add`, {
        userId: userID,
        productId: id
      }).then(()=>console.log("item added to cart successfully")).catch((error)=>{
        console.log("error adding the item", error)
      })
  }

  return (
    
    <div className="home">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>

     
      <div className="home__container">
        <img className="photo" src="https://img.freepik.com/free-photo/abstract-smooth-empty-grey-studio-well-use-as-background-business-report-digital-website-template-backdrop_1258-55967.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722729600&semt=ais_hybrid" alt="hero" />

        <div className="home__one__product">
          {products.map((prod, index) => (
            <div className="home__row" key={index}>
              <div className="home__details">
                <img className="home__img" src={prod.imageUrl} />
                <p>{prod.name}</p>
                <p>{prod.price}$</p>
                
                <button className=" add__item" onClick={()=>{addProductToCart(prod.id)}}>add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Home;
