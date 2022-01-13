import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import { geocode } from '../../utils.mjs';

//Initialize Express App
const app = express();

//Default Port
const port = process.env.PORT || 3000;

//Define paths for Express config
const __dirName = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirName, '../public');
const viewsDir = path.join(__dirName, '../templates/views');
const partialsDir = path.join(__dirName, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

//Setup Static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
	res.render('index', {
		title: `StormWeather`
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help'
	});
});

app.get('/weather', async (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide a correct address!'
		});
	}

	const data = await geocode(req.query.address);
	res.send({
		address: data.location,
		current: data.data
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term!'
		});
	}

	console.log(req.query);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('error', {
		error: 'Help article not found'
	});
});

app.get('*', (req, res) => {
	res.render('error', {
		error: '404 Page not Found!'
	});
});

//What port to listen
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
