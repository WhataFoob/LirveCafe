import User from '../models/User.js';
import { 
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
                users: mongooseDocumentsToObject(users);
                const user = users.find(checkSignedCookies);

                if (!user) {
                    res.redirect('/auth/index');
                    return ;
                }
                next();
            })
    }
}

export default auth_middleware;