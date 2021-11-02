const HomeController = {
    index: function(req, res, next) {
        res.render('./home/home.hbs', {
            user: res.locals.user
        });
    }
}

export default HomeController;