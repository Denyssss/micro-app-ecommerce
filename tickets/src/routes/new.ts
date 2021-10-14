import express from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@dsticketing/common';
import { Ticket } from "../models/ticket";


const router = express.Router();

router.post('/api/tickets',
    requireAuth,
    [
        body('title').notEmpty().withMessage('title is required'),
        body('price').isFloat({ gt: 0 }).withMessage('title is required')
    ],
    validateRequest,
    async (req, res, ) => {
    const { title, price } = req.body;
        const ticket = Ticket.build({ title, price, userId: req.currentUser.id });
        await ticket.save();
        res.status(201).send(ticket);
});

export { router as createTicketRouter };