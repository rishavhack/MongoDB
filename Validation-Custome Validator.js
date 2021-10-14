const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to Mongodb'))
.catch(err => console.log('Could not connect to Mongodb..',err))

const courseSchema = new mongoose.Schema({
	name: { type:String, 
		required:true,
		minlength:5,
		maxlength:255,
		//match: /pattern/
	},
	category: {
		type: String,
		required:true,
		enum: ['web','mobile','network']
	},
	author: String,
	tags:{
		type:Array,
		validate: {
			validator: function(v) {
				return  v && v.length > 0
			},
			message: 'A course should have at least one tag.'
		}
	},
	date: {type : Date, default: Date.now},
	isPublished: Boolean,
	price: {
		type : Number,
		required: function() { return this.isPublished},
		min:10,
		max:200
	}
});

const Course = mongoose.model('Course',courseSchema);
async function createCourse() {
	const course = new Course({
	name: 'Backend DB Course',
	category:'web',
	author: 'Rishav',
	tags: null,
	isPublished :true,
	price:10
});

	try {

		const result = await course.save();
		console.log(result);
	} catch(ex) {
		console.log(ex.message)
	}

}


createCourse()
