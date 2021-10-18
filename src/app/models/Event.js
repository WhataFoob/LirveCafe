import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

const {Schema} = mongoose;

const Event = new Schema(
    {   
        name: {type: String, required: true},
        description: {type: String},
        image: {type: String, default: "http://www.davidkrugler.com/s/River-Lights-8318.jpg"},
        no: {type: Number, requires: true},
        drinkList: [Number],
        foodList: [Number],
        slug: {type: String, slug: 'name', unique: true}
    },
    {
        timestamps: true
    }
);

mongoose.plugin(slug);
Event.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
});

export default mongoose.model('Event', Event);