const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const handlebarshelp = require('./helpers/handlebars-setup'); // Importa o Handlebars configurado

// Exemplo de como pegar todos os usuarios e imprimir na view login 
// (Antes era index, caso ache que não faça sentido ) a frase anterior
// Pois o usuario foi feito antes do login
const User = require('./models/User');
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;
 

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({extended: false}));

// handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: handlebarshelp // Passa os helpers configurados
}));
app.set('view engine', 'handlebars');

// static folder 
app.use(express.static(path.join(__dirname, 'public')));

// db connection 
db
 .authenticate()
 .then(() => {
    console.log("Conectou ao banco com sucesso");
})
.catch(err =>{
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

