const express = require(`express`);
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');


const app = express();
const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};

app.use(cors(corsOptions));

// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());
// Body parser, reading data from body into req.body
app.use(express.json());


// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requsts from this IP, please try again in 1 hour',
});
app.use('/', limiter);


// // Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// // Data sanitization against XSS
app.use(xssClean());

// 2) ROUTES

app.use('/users', userRouter);


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find${req.originalUrl} on this server!`, 404));
  
});

app.use(globalErrorHandler);

module.exports = app;