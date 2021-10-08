import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY) throw Error('add JWT_KEY');

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(3000, () => {
            console.log('Listening on port 3000!!!!!!!!');
        });

    } catch (err) {
        console.log(err);
    }
}

start();
