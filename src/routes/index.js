import testRoute from './test.js';

const routeObj = {
    route: function (app) {
        app.use('/', testRoute)
    },
}
export default routeObj;
