module.exports = (req,res,next) => {
  const jwt = require('jsonwebtoken')
  const TOKEN_KEY = ''
  try{
    const token = res.headers.authorization.split(" ")[1]
    const data = jwt.verify(token, TOKEN_KEY)
    res.local.users = data
  }catch(error) {
    res.status(403).send("Not authorized")
  }
}