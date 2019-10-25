const routes = require('express').Router();

const axios = require('../../client/node_modules/axios')


function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCurrency(){
	let all = [
		"RUB",
		'USD',
		"EUR"
	]
	return all[randomIntFromInterval(0,all.length-1)]
}

function getProducts(){
	return [
		{
			id: 1,
			name: 'Car',
			quantity: 1,
			currency: getCurrency(),
			price: randomIntFromInterval(1500, 2400) 
		},	
		{
			id: 2,
			name: 'Phone',
			quantity: 1,
			currency: getCurrency(),
			price: randomIntFromInterval(80, 210) 
		},	
		{
			id: 3,
			name: 'House',
			quantity: 1,
			currency: getCurrency(),
			price: randomIntFromInterval(10000, 25000) 
		}
	]
} 

routes.get('/get', (req, res) => {
	res.status(200).json({ products: getProducts() });
});

routes.post('/calculate', (req, res) => {
	let selectedProducts = JSON.parse(JSON.stringify(req.body.items))
	axios.get('https://www.cbr-xml-daily.ru/daily_json.js').then(resData=>{
		let valutes = resData.data.Valute
		let calculatedTotals = []
		let selectedProducts = []
		let totalRub = 0

		req.body.items.forEach(product=>{
			let currencyProps = valutes[product.currency]
			if(currencyProps){
				let productPriceInRub = product.quantity * product.price/currencyProps.Nominal * currencyProps.Value 
				totalRub += productPriceInRub
			} else {
				totalRub += product.quantity * product.price
			}
		})

		Object.keys(valutes).forEach(key=>{
			let { Nominal, Value, CharCode }  = valutes[key]
			calculatedTotals.push({
				valute: CharCode,
				total: totalRub/Value/Nominal
			})
		})

		calculatedTotals.push({
			valute: 'RUB',
			total: totalRub
		})
		res.json({ calculations: calculatedTotals })
	})
});

module.exports = routes;