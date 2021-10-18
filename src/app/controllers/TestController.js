const TestController = {
    index: function(req, res, next) {
        res.render('./test.hbs');
    }
}

export default TestController;