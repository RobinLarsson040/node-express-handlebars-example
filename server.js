let express = require('express');
let hbs = require('hbs');
const fs = require('fs');

let app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now} ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (e) => {
        if (e) {
            console.log(e)
        }
    })
    next();
})

/* app.use((req,res,next)=>{
    res.render('maintance.hbs')
}) */
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
})


app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Index Page',
        name: 'Robin Larsson'
    })
})
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        name: 'Robin Larsson',
        pageTitle: 'About Page'
    });
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        name: 'Robin Larsson',
        pageTitle: 'Portfolio Page'
    });
})

app.get('/bad', (req, res) => {
    res.send('<h1>error 404<h1>')
})

app.listen(port, () => {
    console.log(`Server is up on ${port}`)
});



