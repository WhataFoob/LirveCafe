import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const {Schema} = mongoose;

const Cart = new Schema(
    {
        username : {type: String, required: true},
        itemList: {type: Array}
    }, {
        timestamps: true
    }
)

Cart.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

export default mongoose.model('Cart', Cart);







