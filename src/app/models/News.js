import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;

const News = new Schema(
    {
        title: {type: String, required: true},
        image: {type: String, default: "https://dailyvoinuoc.com/wp-content/uploads/2016/10/big-sale.jpg"},
        description: {type: String},
        hidden: {type: Boolean},
        slug: {type: String, slug: 'title', unique: true},
        endTime: {type: Date, default: Date.now() + 60*60*24*7}
    },
    {
        timestamps: true    
    }
);

mongoose.plugin(slug)
News.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethos: 'all'
});

export default mongoose.model(News);