import User from '../models/User.js';

import { 
    singleMongooseDocumentToObject,
    mongooseDocumentsToObject
} from '../../support_lib/mongoose.js';

const AuthMiddleware = {
    requireAuth: function(req, res, next) {
        if (!req.signedCookies) {
            res.redirect('/auth/index');
            return ;
        }

        function checkSignedCookies(item) {
            item._id === req.signedCookies.userId;
        }
        
        User.find({})
            .then(users => {
                users = mongooseDocumentsToObject(users);
                const user = users.find(checkSignedCookies);

                if (!user) {
                    res.redirect('/auth/index');
                    return ;
                }
                next();
            })
    },
    getCurrentUser: function(req, res, next) {

        User.find({_id: req.signedCookies.userId})
            .then(user => {
               
                console.log(user)
                res.locals.user = mongooseDocumentsToObject(user)[0]
                console.log(res.locals)
                next();
            })
    }
}

export default AuthMiddleware;