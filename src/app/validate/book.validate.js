const validate = {
    postCreateBook: function(req, res, next) {
        const errors = [];
        
        if (!req.body.title) {
            errors.push("Title is required")
        }

        if (!req.body.author) {
            errors.push("Author is required")
        }

        if (!req.body.description) {
            errors.push("Description is required")
        }

        if (!req.file) {
            errors.push("Image is required")
        }
        if (!req.body.body) {
            errors.push("Content is required")
        }
        if (!req.body.no) {
            errors.push("Number of pages is required")
        }

        if (errors.length) {
            res.render('books/create', {
                errors: errors,
                values: req.body
            }) 
            return ;
        }
        next();
    }
}

export default validate;