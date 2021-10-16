import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;

mongoose.plugin(slug);
const Book = new Schema(
    {
        name: { type: String, required: true},
        description: { type: String},
        image: { type: String },
        no: {type: Number, required: true},
        slug: { type: String, slug: 'name', unique: true },   
    },
    {
        timestamps: true,
    }
);

Book.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all',
})

export default mongoose.model('Book', Book)
