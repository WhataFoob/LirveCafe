import mongoose, { mongo } from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';
import mongooseEmail from 'mongoose-type-email';

const Schema = mongoose.Schema;

const User = new Schema(
    {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        email: {type: mongoose.SchemaTypes.Email, required: true},
        phone: {type: String, required: true},
        username: {type: String},
        password: {type: String, required: true},
        avatar: {type: String},
        star_no: {type: Number, default: 0},
        hidden: {type: Boolean},
    },
    {
        timestamps: true,
    }
);

mongoose.plugin(slug);
User.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})

export default mongoose.model('User', User);