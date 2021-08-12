const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req,res,next) => {
 res.send({quote: getRandomElement(quotes)}) 
})

app.get('/api/quotes', (req,res,next) => {
  if(!req.query.person){
    res.send({ quotes: quotes})
    return
  }
  const authorQuotes = quotes.filter(
    quote => quote.person === req.query.person
  )
  res.send({quotes : authorQuotes})
})

app.post('/api/quotes', (req,res,next) => {

  const newQuotes = {
    quote: req.query.quote,
    person: req.query.person
  }
  if(newQuotes){
  quotes.push(newQuotes)
  res.status(201).send({quote: newQuotes})
  }else{
    res.status(400).send()
  }
})

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`)
})
