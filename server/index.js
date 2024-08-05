const express = require('express');
const productrouter=require("./routes/products.js")
const usersrouter= require("./routes/users.js")
const cartitemrouter = require("./routes/cartitem.js")
const cookieParse = require ("cookie-parser")
const cors= require("cors")
const app = express();
const PORT = 3000;

app.use(express.json())
app.use(cors())
app.use(cookieParse())
app.use("/products", productrouter)
app.use("/users", usersrouter)
app.use("/cart", cartitemrouter)
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
