const pizzas = require('../database/Pizzas.json');

module.exports = {
	index: (req, res)=>{
		res.render("index",{pizzas});
	},
	show: (req, res) => {

		// Capturando a pizza com o id passado na rota
		let pizza = pizzas.find(
			pizza => pizza.id == req.params.id
		);

		// Capturando a posição da pizza no array
		let pos = pizzas.indexOf(pizza);

		// determinando o id da próxima pizza e da anterior
		let idPrev = null;
		let idNext = null;

		if(pos > 0){
			idPrev = pizzas[pos -1].id;
		}

		if(pos < pizzas.length - 1){
			idNext = pizzas[pos + 1].id;
		}

		// Retornando a pizza para o usuário
		if(pizza){
			res.render("pizza",{pizza, idNext, idPrev});
		} else {
			res.render("erros/pizzaNaoEncontrada",{id:req.params.id});
		}
	},
	search: (req, res) => {		
		// Capturar a info digitada pelo usuario
		let { busca } = req.query;
		
		// Encontrar as pizzas buscadas
		let pizzasEncontradas = pizzas.filter(pizza => pizza.nome.toLowerCase().includes(busca.toLowerCase()));

		// Retornar a view (index) passando as pizzas encontradas
		res.render("index",{ pizzas: pizzasEncontradas });
	},
	add: (req, res) => {
		let { id }  = req.body;
		res.send(`Pizza de id ${id}.`);
	}
}