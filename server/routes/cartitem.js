const express= require("express")
const cartitemrouter = express.Router()

const {addItemtoCart, deletefromcart, updateCartitem, displayProductofcart, getAllcartitems}= require("../controllers/cartitem")

cartitemrouter.post("/add", addItemtoCart)
cartitemrouter.delete("/delete/:id", deletefromcart)
cartitemrouter.put("/update/:id", updateCartitem)
cartitemrouter.get("/getcartbyuser/:id", displayProductofcart)
cartitemrouter.get("/getAll", getAllcartitems)


module.exports=cartitemrouter