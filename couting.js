
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to Mongodb'))
.catch(err => console.log('Could not connect to Mongodb..',err))

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags:[String],
	date: {type : Date, default: Date.now},
	isPublished: Boolean
});

const Course = mongoose.model('Course',courseSchema);

async function getCourses() {

	const courses = await Course
		.find()
		.limit(10)
		.sort({name:1})
		.count()

		
	console.log(courses)
}
getCourses()