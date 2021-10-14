import request from "supertest";
import { app } from "../../app";
import {Ticket} from "../../models/ticket";
import mongoose from "mongoose";

it('return 4040 if provided id does not exist', async () => {
    const id = mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            price: 10
        })
        .expect(404)
})
it('returns 401 if the user does not authenticated', async () => {
    const id = mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'title',
            price: 10
        })
        .expect(401)
})
it('return 401 if the user does not the own ticket', async () => {
    const response = await request(app)
        .post('/api/tickets/')
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            price: 10
        })
        .expect(201)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'title2',
            price: 10000
        })
        .expect(401)
})
it('returns 400 if the user provide invalid title or price', async () => {
    const signInPayload = global.signin()
    const response = await request(app)
        .post('/api/tickets/')
        .set('Cookie', signInPayload)
        .send({
            title: 'title',
            price: 10
        })
        .expect(201)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', signInPayload)
        .send({
            price: 10000
        })
        .expect(400)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', signInPayload)
        .send({
            title: 'title2',
        })
        .expect(400)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', signInPayload)
        .send({
            title: 'title2',
            price: -10000
        })
        .expect(400)
})
it('update a ticket if user provide a valid input', async () => {
    const signInPayload = global.signin()
    const response = await request(app)
        .post('/api/tickets/')
        .set('Cookie', signInPayload)
        .send({
            title: 'title',
            price: 10
        })
        .expect(201)

    const responseTicket = await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', signInPayload)
        .send({
            title: 'title2',
            price: 10000
        })
        .expect(201);

    expect(responseTicket.body.title).toEqual('title2');
    expect(responseTicket.body.price).toEqual(10000);
})
