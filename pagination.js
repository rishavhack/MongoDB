
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
const pageNumber = 2;
const pageSize = 10;
	const courses = await Course
		.find()
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize)
		.sort({name:1})
		.count()

		
	console.log(courses)
}
getCourses()