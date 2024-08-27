import jwt from "jsonwebtoken";

export const generateJWT = ( uid = '' ) => {
  return new Promise((resolve, reject) => {
     
    const payload = { uid };

    jwt.sign( )




  })
}
