import express from "express";
import { body } from "express-validator";
import { requestValidator } from "../middlewares/request-validator";
import { User } from '../models/user'
import { BadRequestError } from "../errors/BadRequestError";
import jwt from 'jsonwebtoken';
import {Password} from "../services/password";

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email').isEmail().withMessage('provide valid emile'),
        body('password').trim().notEmpty().withMessage('provide valid password'),
    ],
    requestValidator,
    async (req, res) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            throw new BadRequestError('invalid credentials')
        }

        const passwordMatching = await Password.compare(existingUser.password, password)

        if (!passwordMatching) {
            throw new BadRequestError('invalid credentials')
        }

        const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY);

        req.session = { jwt: token };

        res.status(200).send(existingUser);
    }
)

export { router as signinRouter };