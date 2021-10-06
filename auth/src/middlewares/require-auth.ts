import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Global = WebAssembly.Global;

interface JWTPayload {
    id: string;
    user: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: JWTPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next()
    }


    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY) as JWTPayload;
        req.currentUser = payload;
    } catch (err) {}

    next();
};