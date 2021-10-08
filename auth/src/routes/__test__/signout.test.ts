import request from "supertest";
import { app } from "../../app";


it('clear the cookie after signout', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: 'p@assword123'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined()
})

