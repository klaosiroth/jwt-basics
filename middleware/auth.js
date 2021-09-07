const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  // check auth header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('no token provided', 401)
  }

  const token = authHeader.split(' ')[1]
  console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }

    next()
  } catch (error) {
    throw new CustomAPIError('not unauthorized to access this route', 401)
  }
}

module.exports = authenticationMiddleware
