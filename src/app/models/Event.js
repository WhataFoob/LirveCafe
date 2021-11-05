import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

const {Schema} = mongoose;

const Event = new Schema(
    {   
        username: {type: String, required: true},
        eventBooker: {type: String, required: true},
        name: {type: String, required: true},
        description: {type: String},
        image: {type: String, default: "http://www.davidkrugler.com/s/River-Lights-8318.jpg"},
        no_seating: {type: Number, requiresd: true},
        email: {type: String, required: true},
        total: {type: Number, requiresd: true},
        promoId: {type: String},
        eventStartDate: {type: Date, required: true},
        eventEndDate: {type: Date, required: true},
        foodAndDrinkList: {type: Array},
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