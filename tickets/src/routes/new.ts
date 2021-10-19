import express from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@dsticketing/common';
import { Ticket } from "../models/ticket";
import {TicketCreatedPublisher} from "../events/publishers/ticket-created-publisher";
import {natsWrapper} from "../nats-wrapper";


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
        await new TicketCreatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
        });
        res.status(201).send(ticket);
});

export { router as createTicketRouter };