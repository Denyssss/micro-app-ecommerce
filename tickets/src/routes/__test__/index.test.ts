import request from "supertest";
import { app } from "../../app";
import {Ticket} from "../../models/ticket";
import {response} from "express";

const createTicket = () => {
    const title = 'some title';
    const price = 10;

    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price
        })
        .expect(201)
}

it('return list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();
    await createTicket();


    const response = await request(app)
        .get('/api/tickets')
        .expect(200);

    expect(response.body.length).toEqual(4);
})
