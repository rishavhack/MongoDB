const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
		minlength: 5,
		maxlength:50
	}
});

const Genre =  mongoose.model('Genre',genreSchema)



router.get('/',async (req,res) =>  {
	const genres = await Genre.find().sort('name');
	res.send(genres)
})

router.get('/:id',async (req,res)=>{

	const genre = await Genre.findById(req.params.id)
	if (!genre) res.status(404).send("Not avaiable ID")
 
	res.send(genre)
})

router.post('/',async (req,res) =>  {
	if(Object.keys(req.body).length == 0 ) return res.status(400).send("Invalid Data")
	if(!req.body.hasOwnProperty('name')) return res.status(400).send("Invalid Data")
	let genre = new Genre({
		name: req.body.name
	})
	const result = await genre.save();
	res.send(result)
})



router.put('/:id',async (req,res)=>{
	const genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},{
		new:true
	})
	if (!genre) res.status(404).send("Not avaiable ID")

	res.send(genre)
})





module.exports = router