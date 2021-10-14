// noinspection DuplicatedCode
import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY) throw Error('add JWT_KEY');

    if (!process.env.MONGO_URI) throw Error('add MONGO_URI');

    try {
        await mongoose.connect(process.env.MONGO_URI,{
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
