import jwt from 'jsonwebtoken'
import Promise from 'bluebird'

export function isAccessTokenExpired (token, tokenSecret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, (err, decoded) => {
      if (err) {
        // token exist but is expired
        let payload = {
          status: 401,
          data: {
            success: false
          },
          message: 'Token expired'
        }
        return resolve(payload)
      }

      // if everything is good, save to request for use in other routes
      let payload = {
        status: 200,
        data: {
          success: true,
          decoded: decoded
        },
        message: 'Access token is valid'
      }
      return resolve(payload)
    })
  })
}
