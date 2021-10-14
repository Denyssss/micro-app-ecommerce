import mongoose from 'mongoose';

export interface ITicketAttr {
    title: string;
    price: number;
    userId: string;
}

interface ITicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

interface ITicketModel extends mongoose.Model<ITicketDoc> {
    build(attr: ITicketAttr): ITicketDoc
}

const userSchema = new mongoose.Schema<ITicketDoc, ITicketModel>({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

userSchema.statics.build = (attr: ITicketAttr) => {
    return new Ticket(attr);
}

const Ticket = mongoose.model<ITicketDoc, ITicketModel>('Ticket', userSchema);

export { Ticket };