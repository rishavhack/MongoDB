
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
async function createCourse() {
	const course = new Course({
	name: 'Angular DB Course',
	author: 'Rishav',
	tags: ['angular','frontend'],
	isPublished :true
});

const result = await course.save();
console.log(result);
}

async function getCourses() {
	// or
	// and

	const courses = await Course
		.find()
		.or([{author: 'Mosh'},{isPublished: true}])
		.and([])
		.limit(10)
		.sort({name:1})
		.select({name:1,tags:1});

		
	console.log(courses)
}
getCourses()