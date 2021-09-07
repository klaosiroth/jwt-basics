const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
  const { username, password } = req.body

  // check username, password in post(login) request
  console.log(username, password)

  // validate username and password
  if (!(username && password)) {
    // res.status(400).json({ message: 'please provide your username and password' })
    throw new CustomAPIError('please provide your username or password', 400)
  }

  res.send('login')
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
