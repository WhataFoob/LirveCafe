import bookRoute from './book.js';
import coffeeRoute from './coffee.js';
import eventRoute from './event.js';
import newsRoute from './news.js';
import userRoute from './user.js'; 
import ownRoute from './own.js'; 
import authRoute from './auth.js';
import testRoute from './test.js';

const routeObj = {
    route: function (app) {
        app.use('/books', bookRoute);
        app.use('/coffee', coffeeRoute);
        app.use('/events', eventRoute);
        app.use('/news', newsRoute);
        app.use('/users', userRoute);
        app.use('/own', ownRoute);
        app.use('/auth', authRoute);
        app.use('/', testRoute);
    },
}
export default routeObj;
