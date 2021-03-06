const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const limiter = require('./middlewares/rate-limiter');
const { MONGO_URL_DEV } = require('./constants/dev-env');

require('dotenv').config();

const { NODE_ENV, MONGO_URL, PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV);

app.use('/', require('./routes'));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен Порт: ${PORT}`);
});
