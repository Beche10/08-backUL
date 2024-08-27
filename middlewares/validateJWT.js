import { request, response } from 'express';
import jwt from 'jsonwebtoken';



export const validateJWT = ( req = request, res = response, next ) => {

 const token = req.header('x-token');

 if(!token){
    return res.status(401).json({
        msg: 'No hay token en la petición.'
    })
 }


 console.log(token);

 next();
}