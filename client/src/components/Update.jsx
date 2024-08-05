import React, { useEffect, useState } from "react";
import { updateProduct } from "../services/productService";

function Update({ show, handleClose, product }) {
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // useEffect(() => {
  //   console.log(product);
  // }, []);
  useEffect(() => {
    if (product) {
      setPrice(product.price);
      setQuantity(product.quantity);
    }
  }, [product]);

  if (!show) {
    return null;
  }
  const handleClickUpdate = (product) => {
    console.log(product);
    updateProduct(product.id, price, quantity)
      .then((res) => {
        console.log("Updating product with ID:", product.id);
        console.log("New price:", price, "New quantity:", quantity);
        console.log("item updated", res);
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="update__container">
      <div className="update__wrapper">
        <header className="update__header">
          <h1 className="update__close__btn">Update Product</h1>
        </header>
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        Price:
        <input
          placeholder="price..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        Quantity:
        <input
          placeholder="quantity..."
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <div className="modify__btn">
          <button
            className="add__btn"
            onClick={() => handleClickUpdate(product)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Update;
