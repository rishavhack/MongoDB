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
	author: String,
	tags:[String],
	date: {type : Date, default: Date.now},
	isPublished: Boolean,
	price: {
		type : Number,
		required: function() { return this.isPublished}
	}
});

const Course = mongoose.model('Course',courseSchema);
async function createCourse() {
	const course = new Course({
	name: 'Backend DB Course',
	author: 'Rishav',
	tags: ['angular','frontend'],
	isPublished :true,
});

	try {

		const result = await course.save();
		console.log(result);
	} catch(ex) {
		console.log(ex.message)
	}

}


createCourse()
