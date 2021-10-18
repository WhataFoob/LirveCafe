const validate = {
    postSignup: function(req, res, next) {
        const errors = [];

        if (!req.body.firstname) {
            errors.push("Firstname is required")
        }
        if (!req.body.lastname) {
            errors.push("Lastname is required");
        }
        if (!req.body.email) {
            errors.push("Email is required");
        }
        if (!req.body.phone) {
            errors.push("Phone is required");
        }
        if (!req.body.password) {
            errors.push("Password is required");
        }

        if (errors.length) {
            res.render('users/create', {
                errors: errors,
                values: req.body
            });
            return ;
        }
        next();
    },
    postLogin: function(req, res, next) {
        const errors = [];

        if (!req.body.key) {
            errors.push("Key is required");
        }
        if (!req.body.password) {
            errors.push("Password is required");
        }

        if (errors.length) {
            res.render('users/login', {
                errors: errors,
                values: req.body
            });
            return ;
        }
        
        next();
    }
}

export default validate;