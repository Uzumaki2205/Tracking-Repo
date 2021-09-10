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

app.use(bodyParser.json());
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
    
    res.render('home', { repository: repository });
  }
  else {
    if (req.query.limit) {
      limit = req.query.limit;
    }
    const data = await IssueController.QueryRecord({ repository: req.query.name_repo }, limit);
    res.send(data);
  }
})

app.get('/get', async function (req, res) {
  const data = await IssueController.QueryRecord({ repository: req.query.name_repo });
  res.send(data);
})
 
console.log('App listening on port ' + port);
app.listen(port);

