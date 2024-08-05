const { Cart, Cartitem, Product} = require("../database.js")


const addItemtoCart = async (req, res)=>{
    try {
        const {userId, productId, quantity }= req.body
        const cart = await Cart.findOne({ where : {userId}})
        if(!cart) {
            cart= await Cart.create({userId})
        }

        const newcartitem= await Cartitem.create({
            cartId: cart.id,
            productId,
            quantity

        })

        res.status(200).json(newcartitem)
    }

    catch (error) {
        console.error(error)
        res.status(500).send("error in adding the item")
    }
}

const deletefromcart = async (req, res) => {
    const id = req.params.id

    try {
        const deleted = Cartitem.destroy({ where : {id : id}})
        res.status(200).send(" item deleted successfully")
    }
    catch (error) {
        console.error(error)
        res.status(500).send("error deleting the product")
    }
}

const updateCartitem = async (req, res) => {
    const { id } = req.params
    const { quantity } = req.body
  
    try {
      const [updated] = await Cartitem.update(
        { quantity },
        { where: { id } }
      )
        res.status(200).send(" item updated successfully")
     
    } 
    catch (error) {
      console.error(error);
      res.status(500).send("error updating the prodcut")
    }
  }

  const getAllcartitems= async (req, res)=>{
    try {
      const items = await Cartitem.findAll()
      res.json(items)
  }
  catch (error) {
      console.error(error)
      res.status(500).send ("error fetching the products")
  }
  }


  const displayProductofcart = async (req, res) => {
    try {
      const userId = req.params.id
  
   
      const cart = await Cart.findOne({
        where: { userId },
        include: {
          model: Cartitem,
          include: {
            model: Product,
          },
        },
      })
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const cartItems = cart.cartitems || []
  
    
      const response = cartItems.map(cartItem => ({
        id: cartItem.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        product: cartItem.product, 
      }));
  
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching cart items:", error)
      res.status(500).json({ error: "Error fetching cart items" })
    }
  }
  
 
  
  


module.exports= {
    addItemtoCart,
    deletefromcart,
    updateCartitem,
    displayProductofcart,
    getAllcartitems
}