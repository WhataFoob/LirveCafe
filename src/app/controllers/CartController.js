import Book from '../models/Book.js';
import Cart from '../models/Cart.js';
import Promo from '../models/Promo.js';

import { 
    singleMongooseDocumentToObject,
    mongooseDocumentsToObject
} from '../../support_lib/mongoose.js';

const CartController = {


    addBookToCart(req, res, next) {
        const itemId = req.body.itemId;
        const username = req.body.username;
        var userCart = [];
        var data = {};
        Promise.all([Cart.findOne({username: username}), Book.findOne({_id: itemId})])
            .then(([cart, book]) => {
                if (!cart) {
                    userCart.push({book: singleMongooseDocumentToObject(book), quantity: 1})
                    data = {username: username, itemList: userCart}
                    const cart = new Cart(data);
                    console.log(cart)
                    return cart.save(data)
                } else {
                    cart = singleMongooseDocumentToObject(cart);
                    userCart = cart.itemList;
                    var flag = false;
                    for (var i = 0; i < userCart.length; i++) {
                        
                        if (userCart[i].book._id.toString() === itemId) {
                            userCart[i].quantity = userCart[i].quantity + 1;
                            flag = true;
                            break;
                        }
                    }

                    data = {username: username, itemList: userCart}

                    if (!flag) {
                        userCart.push({book: singleMongooseDocumentToObject(book), quantity: 1})
                    }

                    return Cart.updateOne({username: username}, {itemList: userCart})            
                }
            }).then(() => {
                res.send(data)
            }).catch(next)
       
    },
    
    showCart(req, res, next) {
        const username = req.params.username;
        Cart.findOne({username: username})
            .then((cart) => {
                cart = singleMongooseDocumentToObject(cart)
                
                var total = cart.itemList.reduce(function(acc, item) {
                    return acc + parseInt(item.book.price) * parseInt(item.quantity)
                }, 0)

                return Promise.all([Promo.find({ condition: { $lte: total} }), Cart.findOne({username: username})])
            })
            .then(([promoList, cart]) => {
                if (!promoList) promoList = []
                else promoList = mongooseDocumentsToObject(promoList)
                console.log(promoList, 'Promo list')
                cart = singleMongooseDocumentToObject(cart)
                res.render('carts/index.hbs', {cart, promoList})
            })
    },

    addByOne(req, res, next) {
        const data = req.body;
        console.log(data)
        Cart.findOne({username: data.username})
            .then((cart) => {
                cart = singleMongooseDocumentToObject(cart)
                const userCart = cart.itemList;
                for (var item of userCart) {
                    if (item.book._id.toString() === data.bookId) {
                        item.quantity += 1
                    }
                }
                return Cart.updateOne({username: data.username}, {itemList: userCart})
            }).then(() => res.send("Ok"))
            .catch(next)
    },

    subtractByOne(req, res, next) {
        const data = req.body;
        Cart.findOne({username: data.username})
            .then((cart) => {
                cart = singleMongooseDocumentToObject(cart)
                const userCart = cart.itemList;

                for (var i = 0; i < userCart.length; i++) {
                    var item = userCart[i];
                    if (item.book._id.toString() === data.bookId) {
                        item.quantity -= 1
                    }
                    if (item.quantity == 0) userCart.splice(i, 1);
                }
                   
                return Cart.updateOne({username: data.username}, {itemList: userCart})
            }).then(() => res.send("Ok"))
            .catch(next)
    },

    addPromoToCart(req, res, next) {
        const data = req.body;
        Promise.all([
            Cart.findOne({_id: data.cartId}),
            Promo.findOne({_id: data.promoId}),

        ])
    }

}

export default CartController;