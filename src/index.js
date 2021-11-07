import express from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

import bodyParser from 'body-parser';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routeObj from './routes/index.js';
import mongoose_driver from './config/database/index.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
mongoose_driver.connect();

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(
    express.urlencoded({
        extended: true,
    })
);

// parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'));

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            multiply: (a, b) => a * b
        }
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Morgan
app.use(morgan('combined'));

import http from 'http';
import { Server } from 'socket.io';

var server = http.Server(app);
const io = new Server(server);

io.on("connection", function(socket) {

    console.log("New: " + socket.id)

    socket.on("client_send_comment_to_coffee_item", function(data) {
        socket.join(data.itemId)
        socket.join(data._id)
        console.log(socket.adapter.rooms)
        io.sockets.in(data.itemId).emit("server_send_comment_to_coffee_item", data)
    })
    
    socket.on("client_send_reply_comment", function(data) {
        socket.join(data.parentCommentId)
        console.log(data.parentCommentId)
        console.log(socket.adapter.rooms)
        io.sockets.in(data.parentCommentId).emit("server_send_reply_comment", data)
    })

})



server.listen(port)


routeObj.route(app);
