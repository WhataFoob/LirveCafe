import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;

mongoose.plugin(slug);
const Book = new Schema(
    {
        title: { type: String, required: true},
        author: { type: String},
        description: { type: String},
        image: { type: String },
        body: {type: String, required: true},
        no: {type: Number, required: true},
        slug: { type: String, slug: 'title', unique: true },
        meta: {
            votes: {type: Number, default: 0},
            favs: {type: Number, default: 0}
        }   
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
