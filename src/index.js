const express = require('express');
const handlebars = require('express-handlebars');
var bodyParser = require('body-parser')
const path = require('path');
const IssueController = require('./Controllers/IssueController');

const app = express();
const port = process.env.PORT || 3000;
const db = require('./db');
db.connect();

app.engine('hbs', handlebars({
  extname: '.hbs',
  //helpers: require(path.join(__dirname + '/public/js/hbsHelper.js'))
}));

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async function (req, res) {
  const data = await IssueController.AllRecord();
  var limit = 5;

  if(!req.query.name_repo) {
    var repository = [];
    data.forEach(element => {
      repository.push(element.repository);  
    });
    repository = repository.filter(function(elem, pos) {
      return repository.indexOf(elem) == pos;
    })
    
    res.render('home', { repository: repository, webhook: process.env.WEBHOOK });
  }
  else {
    if (req.query.limit) {
      limit = req.query.limit;
    }
    const data = await IssueController.QueryRecord({ repository: req.query.name_repo }, limit);
    res.send(data);
  }
})

app.post('/', async function (req, res) {
  if(!req.body.id) 
    res.status(404).send('Not found');
  else {
    const data = await IssueController.QueryRecord({ _id: req.body.id }, 1);
    if (data == null)
      res.status(204).send('No Content');
    else res.send(data[0]);
  }
})

console.log('App listening on port ' + port);
app.listen(port);

