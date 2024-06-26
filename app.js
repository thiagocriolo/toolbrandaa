const express = require('express');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// EJS setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware para layout padrão
app.use(function(req, res, next) {
    // Renderiza a view usando main.ejs como layout padrão
    res.renderWithLayout = function(view, data = {}) {
        res.render(view, {
            ...data,
            layout: 'main' // Define o layout como main.ejs
        });
    };
    next();
});

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connection
db.authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar", err);
    });

// routes
app.get('/', (req, res) => {
    res.render('login');
});

// Users routes
app.use('/users', require('./routes/users'));

// projetos routes
app.use('/projetos', require('./routes/projetos'));

// fases routes
app.use('/fases', require('./routes/fases'));

// usuariosDoProjeto routes
app.use('/usuariosDoProjeto', require('./routes/usuariosDoProjeto'));

// cards routes
app.use('/cards', require('./routes/cards'));

// cards routes
app.use('/comentarios', require('./routes/comentarios'));

app.listen(PORT, function () {
    console.log(`O express está rodando na porta ${PORT}`);
});
