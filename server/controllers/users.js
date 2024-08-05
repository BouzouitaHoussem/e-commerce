const {User} = require("../database.js")
const bcrypt = require ("bcrypt")
const jwt = require ("jsonwebtoken")
const isEmailValid= (email) => {
 const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email);

}

const signUpUser = async (req, res)=>{
    const { first_name, last_name, email, password, address, role } = req.body
    try {
        if(isEmailValid(email)) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newuser= await User.create({
            first_name,
            last_name,
            email, 
            password: hashedPassword,
            address,
            role
        })
        const token = jwt.sign({ userId: newuser.id }, 'this is my secret key for our first senior project', {
            expiresIn: 3600,
            })

       
        res.status(201).json({token})

        }
        
        else {
            res.send("Please enter a valid email")
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send("error adding a user")
    }
}

const loginUser = async (req,res) => {
    const { email, password } = req.body

    try {
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordmatch = await bcrypt.compare(password, user.password);
        if (!passwordmatch) {
        return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, 'this is my secret key for our first senior project', {
        expiresIn: 3600,
        })
       
        res.status(200).json({ token });
        } 
      catch (error) {
        res.status(500).json({ error: 'Login failed' });
        }
        }


module.exports= {
    signUpUser,
    loginUser,
   
}