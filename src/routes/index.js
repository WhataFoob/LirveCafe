import bookRoute from './book.js';
import coffeeRoute from './coffee.js';
import eventRoute from './event.js';
import newsRoute from './news.js';
import userRoute from './user.js'; 
import ownRoute from './own.js'; 
import authRoute from './auth.js';
import homeRoute from './test.js';
import checkUser from '../app/middleware/AuthMiddleware.js';

const routeObj = {
    route: function (app) {
        app.use('/books', checkUser.getCurrentUser, bookRoute);
        app.use('/coffee', checkUser.getCurrentUser, coffeeRoute);
        app.use('/events', checkUser.getCurrentUser, eventRoute);
        app.use('/news', checkUser.getCurrentUser, newsRoute);
        app.use('/users', checkUser.getCurrentUser, userRoute);
        app.use('/own', checkUser.getCurrentUser, ownRoute);
        app.use('/auth', checkUser.getCurrentUser, authRoute);
        app.use('/', checkUser.getCurrentUser, homeRoute);
    },
}
export default routeObj;
