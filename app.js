// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const UserData = require('./models/userDB');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Get all items
app.get('/', (req, res) => {
  UserData.find()
    .then(items => {
      res.render('index', { items });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

// Render the form to add a new item
app.get('/userData/new', (req, res) => {
  res.render('new');
});

// Create a new item
app.post('/userData', async (req, res) => {
  const { username, phone, email } = req.body;

  try {
    await UserData.create({ username, phone, email });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete an item
app.delete('/userData/:id', async (req, res) => {
    const itemId = req.params.id;
  
    try {
      await UserData.findOneAndDelete({ _id: itemId });
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    }
  });

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('404: Not Found');
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
