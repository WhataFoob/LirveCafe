
import Promo from '../models/Promo.js';

import { 
    singleMongooseDocumentToObject,
    mongooseDocumentsToObject 
} from '../../support_lib/mongoose.js';

const PromoController = {

    // GET promos/list

    index(req, res, next) {
        Promo.find({})
            .then((promos) => {
                promos = mongooseDocumentsToObject(promos);
                const user = res.locals.user;
                res.render('promos/list/list.hbs', {
                    promos: promos,
                    user: user
                })
            }).catch(next)
    },

    // GET: /promos/:id

    show(req, res, next) {
        Promo.findOne({_id: req.params.id})
            .then((promo) => {
                res.render('promos/item/promo_info.hbs', {
                    promo: singleMongooseDocumentToObject(promo),
                    user: res.locals.user
                })
            })
    },

    // GET: /promos/create

    create(req, res, next) {
        res.render('own/promos/item/create.hbs', {
            user: res.locals.user
        });
    },

    // POST: /promos/save

    save(req, res, next) {
        const promo = new Promo(req.body);
        console.log(promo)
        promo.save()
            .then(() => res.redirect('/own/stored/promos'))
            .catch(next)
    },

    // GET /promos:id/edit

    edit(req, res, next) {
        Promo.findById(req.params.id)
            .then((promo) => {
                res.render("own/promos/item/edit.hbs", {
                    promo: singleMongooseDocumentToObject(promo),
                    user: res.locals.user
                })
            }).catch(next)
    },

    // PATCH /promos/:id
    update(req, res, next) {
        Promo.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next);
    },
    
    // SOFT DELETE /promos/:id
    softDelete(req, res, next) {
        Promo.delete({_id: req.params.id})
            .then(() => res. redirect('back'))
            .catch(next);
    } ,

    // DEEP DELETE /promos/:id/force

    deepDelete(req, res, next) {
        Promo.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    },

    // RESTORE PROMO (PATCH) /books/:id/restore
    restore(req, res, next) {
        Promo.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

export default PromoController;