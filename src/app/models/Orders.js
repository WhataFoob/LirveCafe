import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

const {Schema} = mongoose;

const Orders = new Schema(
    {
        username: { type: String, required: true },
        name: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String },
        phone: { type: String, required: true},
        itemList: { type: Array},
        total: { type: Number, min: 0, required: true },
        promoId: { type: String }
    },
    {
        timestamps: true    
    }
);

mongoose.plugin(slug)
Orders.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethos: 'all'
});

export default mongoose.model('Ordesr', Orders);