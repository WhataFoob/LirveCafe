import Book from '../models/Book.js';
import { singleMongooseDocumentToObject } from '../../support_lib/mongoose.js';

const BookController = {
    // GET /books/list
    index(req, res, next) {
        Book.find({})
            .then((books) => {
                res.render('books/list', {
                    books: mongooseDocumentsToObject(books)
                });
            }).catch(next);
    },

    // GET: /books/:slug
    show(req, res, next) {
        Book.findOne({ slug: req.params.slug })
            .then((book) => {
                res.render('books/book_detail', {
                    book: singleMongooseDocumentToObject(book)
                })
            })
            .catch(next);
    },

    // GET: /books/create
    create(req, res, next) {
        res.render('books/create');
    },

    // POST : /books/save
    save(req, res, next) {
        req.body.image = 'https://img.freepik.com/free-psd/book-cover-mockup_125540-572.jpg?size=626&ext=jpg';
        const book = new Book(req.body);
        book.save()
            .then(() => res.redirect('/own/stored/books'))
            .catch(next);
    },

    // [GET] /books/:id/edit
    edit(req, res, next) {
        Book.findById(req.params.id)
            .then((book) => {
                res.render('books/edit', {
                    book: singleMongooseDocumentToObject(book)
                })
            })
            .catch(next);
    },

    // PUT /books/:id
    update(req, res, next) {
        Book.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next);
    },

    // SOFT DELETE /books/:id
    softDelete(req, res, next) {
        Book.delete({_id: req.params.id})
        .then(() => res. redirect('back'))
        .catch(next);
    },

    // DEEP DELETE /books/:id/force
    deepDelete(req, res, next) {
        Book.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    },

    // RESTORE BOOK (PATCH) /books/:id/restore
    restore(req, res, next) {
        Book.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
};  

export default BookController;