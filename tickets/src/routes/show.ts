import express from 'express';
import { NotFoundError } from '@dsticketing/common';
import { Ticket } from "../models/ticket";


const router = express.Router();

router.get('/api/tickets/:id',async (req, res, ) => {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            throw new NotFoundError()
        }
        res.status(200).send(ticket);
});

export { router as getTicketRouter };