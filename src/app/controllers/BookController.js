import Book from '../models/Book.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js'

import Comment from '../models/Comment.js';
import Reply from '../models/Reply.js';

import { 
    singleMongooseDocumentToObject,
    mongooseDocumentsToObject 
} from '../../support_lib/mongoose.js';

const BookController = {
    // GET /books/list
    index(req, res, next) {
        Book.find({})
            .then((books) => {
                res.render('books/list/list.hbs', {
                    books: mongooseDocumentsToObject(books),
                    user: res.locals.user
                });
            }).catch(next);
    },

    // GET: /books/:slug
    show(req, res, next) {
        Book.findOne({ slug: req.params.slug })
            .then((book) => {
                res.render('books/item/book_info.hbs', {
                    book: singleMongooseDocumentToObject(book),
                    user: res.locals.user
                })
            })
            .catch(next);
    },

     // GET: /book/buy/:id
     showPayForm(req, res, next) {
        console.log(req.params.id)
        Book.findOne({_id: req.params.id})
            .then((book) => {
                book = singleMongooseDocumentToObject(book)
                res.render('buy/buyOneItem.hbs', {
                    book: book,
                    user: res.locals.user
                })
            })
    },

     // GET: /book/buys/:id
    showAllCartPayForm(req, res, next) {
        console.log(req.params.id)
        Cart.findOne({_id: req.params.id})
            .then((cart) => {
                cart = singleMongooseDocumentToObject(cart)
                var total = cart.reduce(function(acc, item) {
                    return acc + parseInt(item.book.price) * parseInt(item.quantity);
                }, 0)
                res.render('buy/buyAllCart.hbs', {
                    cart: cart,
                    user: res.locals.user,
                    total: total
                })
            })
    },
    
    // POST: /book/buy

    buy(req, res, next) {
        const order = new Order(req.body)  
       
        order.save()
            .then(() => {
                res.send({
                    order: singleMongooseDocumentToObject(order),
                    user: res.locals.user
                })
            }).catch(next);
    },

    // POST: /book/buys

    buyAllCart(req, res, next) {
        const order = new Order(req.body)  
       
        order.save()
            .then(() => {
                res.send({
                    order: singleMongooseDocumentToObject(order),
                    user: res.locals.user
                })
            }).catch(next);
    },

    // GET: /books/create
    create(req, res, next) {
        res.render('own/books/item/create.hbs',{
            user: res.locals.user
        });
    },

    // POST : /books/save
    save(req, res, next) {
        
        req.body.image = '/' + req.file.path.split('\\').slice(2).join('/'); 
        const book = new Book(req.body);
        book.save()
            .then(() => res.redirect('/own/stored/books'))
            .catch(next);
    },

    // [GET] /books/:id/edit
    edit(req, res, next) {
        Book.findById(req.params.id)
            .then((book) => {
                res.render('own/books/item/edit.hbs', {
                    book: singleMongooseDocumentToObject(book),
                    user: res.locals.user
                })
            })
            .catch(next);
    },

    // PATCH /books/:id
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
    },
};

export default BookController;