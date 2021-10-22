const express = require("express");
const router = express.Router();

const genres = [
	{id:1,name:'Action'},
	{id:2,name:'Horror'},
	{id:3,name:'Romance'},
]

router.get('/',(req,res) =>  {
	res.send(genres)
})

router.post('/',(req,res) =>  {
	if(Object.keys(req.body).length == 0 ) return res.status(400).send("Invalid Data")
	if(!req.body.hasOwnProperty('name')) return res.status(400).send("Invalid Data")
	const genre = {
		id : genres.length +1,
		name: req.body.name
	}
	genres.push(genre)
	res.send(genre)
})



router.put('/:id',(req,res)=>{
	const genre = genres.find(x => x.id === parseInt(req.params.id))
	if (!genre) res.status(404).send("Not avaiable ID")

	const index =genres.indexOf(genre)
	genres[index].name = req.body.name
	res.send(genre)
})


router.delete('/:id',(req,res)=>{
	const genre = genres.find(x => x.id === parseInt(req.params.id))
	if (!genre) res.status(404).send("Not avaiable ID")

	const index =genres.indexOf(genre)
	genres.splice(index,1)
	res.send(genres)
})

router.get('/:id',(req,res)=>{
	const genre = genres.find(x => x.id === parseInt(req.params.id))
	if (!genre) res.status(404).send("Not avaiable ID")
 
	res.send(genre)
})
module.exports = router