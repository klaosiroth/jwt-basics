const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
  const { username, password } = req.body

  // check username, password in post(login) request
  console.log(username, password)

  // validate username and password if exist create new JWT
  if (!(username && password)) {
    // res.status(400).json({ message: 'please provide your username and password' })
    throw new CustomAPIError('please provide your username or password', 400)
  }
  console.log('passed: ', username, password)

  // setup authentication so only the request with JWT can access the dasboard
  // just for demo, normally provided by DB!!!!
  const id = Date.now().toString()

  // try to keep payload small, better experience for user
  // secret key: in production should be long, complex and unguessable string value!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  // send back to fron-end
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    message: `hello, natthaphon`,
    secret: `here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
