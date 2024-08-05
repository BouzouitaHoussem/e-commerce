import React, { useEffect, useState } from "react";
import { addProducts } from "../services/productService.js";
import { useNavigate } from "react-router-dom";
import {
  getAllProduct,
  deleteProduct,
  updateProduct,
} from "../services/productService.js";
import Update from "./Update.jsx";

function Seller() {
  const navigate = useNavigate();
  const [adminProducts, setAdminProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    getAllProduct()
      .then((res) => {
        setAdminProducts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const handleChangeImageUrl = (e) => {
    setImageUrl(e.target.value);
  };
  

  const handleClickDelete = (id) => {
    deleteProduct(id)
      .then((res) => {
        console.log("item deleted");
      })
      .catch((err) => alert("Item was not deleted", err));
  };

  const handleUpload = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "drbgxo3ua",
        uploadPreset: "first project",
        sources: ["local", "url", "camera"],
        showAdvancedOptions: false,
        cropping: false,
        multiple: false,
        defaultSource: "local",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  };

  const handleClick = () => {
    addProducts(name, description, imageUrl, price, quantity)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => alert("the product is not added", err));
  };
  const handleUpdateClick = (product) => {
    console.log(product);
    setCurrentProduct(product);
    setShowUpdate(true);
  };

  return (
    <div className="container">
      <div className="admin__container">
        <header>
          <h1>Seller Dashboard</h1>
        </header>
        Product Name:
        <input onChange={handleChangeName} />
        Price:
        <input onChange={handleChangePrice} />
        Description:
        <input onChange={handleChangeDescription} />
        Quantity:
        <input onChange={handleChangeQuantity} />
        Image:
        <button onClick={handleUpload}>Upload Image</button>
        <img
          src={imageUrl}
          style={{ width: "100px", height: "100px" }}
        />
        <div className="modify__btn">
          <button className="add__btn" onClick={handleClick}>
            Add
          </button>
        </div>
      </div>

      <main className="item__table">
      
        <h2>Products</h2>
        <div className="item__details">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminProducts.map((product, index) => (
                <tr  key={index}>
                  <td>
                    <img
                      className="item__img"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td className="product__description__backoffice">
                    {product.description}
                  </td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                 
                  <td>
                    <div className="delete__add__btn">
                      <button
                        className="add__btn"
                        onClick={() => handleUpdateClick(product)}
                      >
                        Update
                      </button>
                      <button
                        className="add__btn"
                        onClick={() => handleClickDelete(product.id)}
                      >
                        Delete
                      </button>
                     
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Update
        show={showUpdate}
        handleClose={() => setShowUpdate(false)}
        product={currentProduct}
      />
    </div>
  );
}

export default Seller;
