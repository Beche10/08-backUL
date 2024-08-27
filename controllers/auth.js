import { response, request } from 'express';

export const login = (req = request, res = response) => {
    res.json({
        msg: "Login OK"
    });
};
