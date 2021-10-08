import request from "supertest";
import { app } from "../../app";

it('returns a 400 if email does not exist', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: 'p@assword123'
        })
        .expect(400);
});

it('returns a 400 if password is invalid', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: 'p@assword123'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: 'p'
        })
        .expect(400);
})

it('sets a cookie after successful signin', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: 'p@assword123'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: 'p@assword123'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});
