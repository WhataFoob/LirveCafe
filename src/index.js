import express from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';
import handlebars from 'express-handlebars';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import routeObj from './routes/index.js';
import db from './config/database/index.js';

const app = express();
db.connect();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(methodOverride('_method'));

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

routeObj.route(app);
app.listen(port, () => {
    console.log(`Server is running at port: {port}`);
})



