import { response, request } from 'express';

export const login = (req = request, res = request) => {


    res.json({
        msg: "Login OK"
    })

};