const HomeController = {
    index: function(req, res, next) {
        res.render('./home/home.hbs');
    }
}

export default HomeController;