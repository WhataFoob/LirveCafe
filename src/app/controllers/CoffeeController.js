import Coffee from '../models/Coffee.js';
import Comment from '../models/Comment.js';
import Reply from '../models/Reply.js';

import { 
    singleMongooseDocumentToObject,
    mongooseDocumentsToObject
} from '../../support_lib/mongoose.js';

const CoffeeController = {

    // GET /coffee/list
    index(req, res, next) {
        Coffee.find({})
            .then((coffee) => {
                res.render('drink/list/list.hbs', {
                    coffee: mongooseDocumentsToObject(coffee)
                });
            }).catch(next);
    },

    // GET /coffee/:slug
    show(req, res, next) {
        
        Coffee.findOne({slug: req.params.slug})
            .then((coffee) => {
                coffee = singleMongooseDocumentToObject(coffee)
                Comment.find({itemId: coffee._id})
                    .then((commentList) => {
                        res.render('drink/item/coffee_info.hbs', {
                            coffee: coffee,
                            commentList: mongooseDocumentsToObject(commentList)
                        })
                    })
               
            }).catch(next);
    },

    // GET: /coffee/create
    create(req, res, next) {
        res.render('own/drink/item/create.hbs')
    },

    // POST /coffee/save
    save(req, res, next) {
        req.body.image = '/' + req.file.path.split('\\').slice(2).join('/'); 
        const coffee = new Coffee(req.body);
        coffee.save()
            .then(() => res.redirect('/own/stored/coffee'))
            .catch(next);
    },

    // GET /coffee/:id/edit
    
    edit(req, res, next) {
        Coffee.findOne({_id: req.params.id})
            .then((coffee) => {
                res.render('own/drink/item/edit.hbs', {
                    coffee: singleMongooseDocumentToObject(coffee),
                })
            }).catch(next);
    },

    // PATCH /coffee/:id
    update(req, res, next) {
        if (req.file)
            req.body.image = '/' + req.file.path.split('\\').slice(2).join('/');
        Coffee.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next);
    },

    // SOFT DELETE /coffee/:id
    softDelete(req, res, next) {
        Coffee.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    },

    // DEEP DELETE /coffee/:id/force
    deepDelete(req, res, next) {
        Coffee.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    },

    // PATCH /coffee/:id/restore
    restore(req, res, next) {
        Coffee.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    },

    // POST /coffee/do-comment

    doComment(req, res, next) {
       
        const comment = new Comment(req.body);
        comment.save()
            .then(() => res.send(singleMongooseDocumentToObject(comment)))
            .catch(next)
    },

    // POST /coffee/reply-comment

    replyComment(req, res, next) {
        const reply = new Reply(req.body);

        Comment.findOne({_id: req.body.parentCommentId})
            .then((comment) => {
                const replyList = comment.replyList
                replyList.push(reply);
                comment.replyList = replyList;
                return new Promise(function(resolve) {
                    comment.save()
                    resolve()
                })
            })
            .then(function() {
                return new Promise(function(resolve) {
                    reply.save()
                    resolve()
                })
            })
            .then(() => {
                res.send("Reply comment Successfully")
            })
            .catch(next)
    }
}

export default CoffeeController;