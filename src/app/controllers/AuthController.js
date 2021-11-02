import User from '../models/User.js'
import { 
    mongooseDocumentsToObject
} from '../../support_lib/mongoose.js';

const AuthController = {

    // GET auth/index
    index: function(req, res, next) {
        res.render('auth/index');
    },

    // POST auth/login

    login: function(req, res, next) {
        const {key, password} = req.body;
        console.log(req.body)
        const errors = [];

        const checkLogin = function(item) {
            if (password !== item.password) {
                return false;
            }

            if (key !== item.username && 
                key !== item.phone &&
                key !== item.email    
            ) return false;

            return true;
        }

        User.find({})
            .then((users) => {
                users = mongooseDocumentsToObject(users);
                if (users.filter(checkLogin).length) {
                    res.cookie('userId', users.filter(checkLogin)[0]._id, {
                        signed: true
                    })
                    res.redirect('/');
                } else {
                    errors.push('username or phone or email or password is not correct');
                    res.render('auth/index', {
                       errors: errors,
                       values: req.body
                    });
                }
            })




    }
}

export default  AuthController;