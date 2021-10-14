import express from 'express';
import {NotAuthorizedError, NotFoundError, requireAuth, validateRequest} from '@dsticketing/common';
import { Ticket } from "../models/ticket";
import {body} from "express-validator";


const router = express.Router();

router.put('/api/tickets/:id',
    requireAuth,
    [
        body('title').notEmpty().withMessage('title is required'),
        body('price').isFloat({ gt: 0 }).withMessage('title is required')
    ],
    validateRequest,
    async (req, res, ) => {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            throw new NotFoundError()
        }

        if (ticket.userId !== req.currentUser.id) {
            throw new NotAuthorizedError()
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price
        });
        await ticket.save();

        res.status(201).send(ticket);
});

export { router as putTicketRouter };