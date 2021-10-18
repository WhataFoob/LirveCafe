import Event from '../models/Event.js';
import { 
    singleMongooseDocumentToObject,
    mongooseDocumentsToObject
} from '../../support_lib/mongoose.js';

const EventController = {

    // GET /events/list

    index(req, res, next) {
        Event.find({})
            .then((events) => {
                res.render('events/list', {
                    events: mongooseDocumentsToObject(events)
                })
            }).catch(next);
    },
    
    // GET /events/:slug
    show(req, res, next) {
        Event.findOne({slug: req.params.slug})
            .then((event) => {
                res.render('events/event_detail' , {
                    event: singleMongooseDocumentToObject(event)
                })
            }).catch(next)
    },

    // GET /events/create
    create(req, res, next) {
        res.render('events/create')
    },

    //POST /events/save
    save(req, res, next) {
        req.body.image = "http://www.davidkrugler.com/s/River-Lights-8318.jpg";
        const event = new Event(req.body);
        event.save()
            .then(() => res.redirect('/me/stored/events'))
            .catch(next)
    },

    // GET /events/:id/edit
    edit(req, res, next) {
        Event.findOne({_id: req.params.id})
            .then((event) => {
                res.render('events/edit', {
                    event: singleMongooseDocumentToObject(event)
                })
            })
            .catch(next)
    },

    // PUT /events/:id
    update(req, res, next) {
        Event.updateOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    },

    // SOFT DELETE /books/:id
    softDelete(req, res, next) {
        Event.delete({_id: req.params.id})
        .then(() => res. redirect('back'))
        .catch(next);
    },

    // DEEP DELETE /books/:id/force
    deepDelete(req, res, next) {
        Event.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    },

    // RESTORE BOOK (PATCH) /books/:id/restore
    restore(req, res, next) {
        Event.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }


}; 

export default EventController;