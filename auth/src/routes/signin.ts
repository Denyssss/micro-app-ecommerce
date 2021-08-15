import express from "express";
import { body } from "express-validator";
import { requestValidator } from "../middlewares/request-validator";

const router = express.Router();

router.post('/api/users/signin',
    [
        body("email").isEmail().isEmpty().withMessage('provide valid emile'),
        body("password").isEmpty().withMessage('provide valid password'),
    ],
    requestValidator,
    (req, res) => {
        res.send('Hello There');
    }
)

export { router as signinRouter };