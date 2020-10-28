var express = require('express'), cors = require('cors'), app = express();

app.use(express.json());
app.use(cors());
app.listen(3000, () => console.log('Server running on port 3000'));

var noticias = [
    'Literatura Paris',
    'Futbol Barcelona',
    'Futbol Barranquilla',
    'Politica Montevideo',
    'Economia Santiago de Chile',
    'Cocina Mexico DF',
    'Finanzas Nueva York'
];

app.get('/get', (req, res, next) => {
    res.json(noticias.filter((c) => c.toLocaleLowerCase().indexOf(req.query.q.toString().toLocaleLowerCase())> -1));
});

var misFavoritos = [];
app.get('/favs', (req, res, next) => {
    console.log(req.body);
    misFavoritos.push(req.body.nuevo);
    res.json(misFavoritos);
});
