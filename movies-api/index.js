import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import moviesRouter from './api/movies';   
import utilitiesRouter from './api/utilities';
import movieRouter from './api/movie';   
import actorRouter from './api/person';  

dotenv.config();

// eslint-disable-next-line no-unused-vars
const errHandler = (err, req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};


const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use(express.static('public'));


app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter); 
app.use('/api/utilities', utilitiesRouter);
app.use('/api/movie', movieRouter);
app.use('/api/person', actorRouter);
app.use(errHandler);


app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
