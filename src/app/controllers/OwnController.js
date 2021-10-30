import Coffee from '../models/Coffee.js';
import Book from '../models/Book.js';
import News from '../models/News.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

import { mongooseDocumentsToObject } from '../../support_lib/mongoose.js';

const OwnController = {
    
    // 1. coffee warehouse

    // GET own/stored/coffee
    storedCoffee(req, res, next) {
        Promise.all([Coffee.find({}), Coffee.countDocumentsDeleted()])
            .then(([coffee, deletedCount]) => {
                res.render('own/drink/list/store.hbs', {
                    deletedCount,
                    coffee: mongooseDocumentsToObject(coffee)
                })
            }).catch(next);
    },

    // GET own/trash/coffee
    trashCoffee(req, res, next) {
        Coffee.findDeleted({})
            .then((coffee) => {
                res.render('own/drink/list/trash.hbs', {
                    coffee: mongooseDocumentsToObject(coffee)
                })
            }).catch(next);
    },

    // 2. book warehouse

    // GET own/stored/books
    storedBooks(req, res, next) {
        Promise.all([Book.find({}), Book.countDocumentsDeleted()])
            .then(([books, deletedCount]) => {
                res.render('own/books/list/store.hbs', {
                    deletedCount,
                    books: mongooseDocumentsToObject(books)
                })
            }).catch(next);
    },

    // GET own/trash/books
    trashBooks(req, res, next) {
        Book.findDeleted({})
            .then((books) => {
                res.render('own/books/list/trash.hbs', {
                    books: mongooseDocumentsToObject(books)
                })
            }).catch(next);
    },

    // 3. user

    // GET own/stored/users
    storedUsers(req, res, next) {
        Promise.all([User.find({}), User.countDocumentsDeleted()])
            .then(([users, deletedCount]) => {
                res.render('own/users/list/store.hbs', {
                    deletedCount,
                    users: mongooseDocumentsToObject(users)
                })
            }).catch(next);
    },

    // GET own/trash/users
    trashUsers(req, res, next) {
        User.findDeleted({})
            .then((users) => {
                res.render('own/users/list/trash.hbs', {
                    users: mongooseDocumentsToObject(users)
                })
            }).catch(next);
    },

    // 4. News warehouse

    // GET own/stored/news
    storedNews(req, res, next) {
        Promise.all([News.find({}), News.countDocumentsDeleted()])
            .then(([news, deletedCount]) => {
                res.render('own/news/list/store.hbs', {
                    deletedCount,
                    news: mongooseDocumentsToObject(news)
                })
            }).catch(next);
    },

    // GET own/trash/news
    trashNews(req, res, next) {
        News.findDeleted({})
            .then((news) => {
                res.render('own/news/list/store.hbs', {
                    news: mongooseDocumentsToObject(news)
                })
            }).catch(next);
    },

     // 5. Events warehouse

    // GET own/stored/events
    storedEvents(req, res, next) {
        Promise.all([Event.find({}), Event.countDocumentsDeleted()])
            .then(([events, deletedCount]) => {
                res.render('users/list/store.hbs', {
                    deletedCount,
                    events: mongooseDocumentsToObject(events)
                })
            }).catch(next);
    },

    // GET own/trash/events
    trashEvents(req, res, next) {
        Event.findDeleted({})
            .then((events) => {
                res.render('users/list/trash.hbs', {
                    events: mongooseDocumentsToObject(events)
                })
            }).catch(next);
    }



};

export default OwnController;