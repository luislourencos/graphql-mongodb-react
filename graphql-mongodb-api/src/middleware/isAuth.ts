import { verify } from "jsonwebtoken";
import 'dotenv/config';
const SECRET = process.env.SECRET

export const isAuth =(req:any,res:any,next:any)=> {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    const [_,token]= authHeader.split(' ');
    if(!token|| token === '') {
        req.isAuth = false;
        return next();
    }
    let decodedToken;

    try {
        decodedToken = verify(token,SECRET||'')
    } catch (error) {
        req.isAuth = false;
        return next();
    }
    const {id}:any = decodedToken
    req.isAuth = true;
    req.userId = id;
    return next();

}