const express = require(`express`);
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


app.use('/users', userRouter);


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find${req.originalUrl} on this server!`, 404));
  
});

app.use(globalErrorHandler);

module.exports = app;