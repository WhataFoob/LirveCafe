import News from '../models/News.js'
import { singleMongooseDocumentToObject } from '../../support_lib/mongoose.js';

const NewsController = {

    // GET /news/list
    index(req, res, next) {
        News.find({})
            .then((news) => {
                res.render('news/list/list.hbs', {
                    news: mongooseDocumentsToObject(news)
                });
            }).catch(next);
    },

    // GET: /news/:slug
    show(req, res, next) {
        News.findOne({ slug: req.params.slug })
            .then((book) => {
                res.render('news/item/news_info.hbs', {
                    book: singleMongooseDocumentToObject(book)
                })
            })
            .catch(next);
    },

    // GET: /news/create
    create(req, res, next) {
        res.render('own/news/item/create.hbs');
    },

    // POST : /news/save
    save(req, res, next) {
        req.body.image = 'http://www.davidkrugler.com/s/River-Lights-8318.jpg';
        const news = new News(req.body);
        news.save()
            .then(() => res.redirect('/own/stored/news'))
            .catch(next);
    },

    // [GET] /news/:id/edit
    edit(req, res, next) {
        News.findById(req.params.id)
            .then((news) => {
                res.render('news/edit', {
                    news: singleMongooseDocumentToObject(news)
                })
            })
            .catch(next);
    },

    // PUT /news/:id
    update(req, res, next) {
        News.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next);
    },

    // SOFT DELETE /news/:id
    softDelete(req, res, next) {
        News.delete({_id: req.params.id})
        .then(() => res. redirect('back'))
        .catch(next);
    },

    // DEEP DELETE /news/:id/force
    deepDelete(req, res, next) {
        News.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    },

    // RESTORE News (PATCH) /news/:id/restore
    restore(req, res, next) {
        News.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
};

export default NewsController;