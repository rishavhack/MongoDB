
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


async function updateCourse(id) {
	// const course = await Course.findById(id);
	// if(!course) return;

	// course.isPublished  = true;
	// course.author = 'Another Author'

	// course.set({
	// 	isPublished  = true;
	// 	author = 'Another Author'
	// })
	//const result = await course.save();
	
	const result = await Course.update({_id:id},{
		$set: {
			author: 'Mosh',
			isPublished: false
		}
	})
	console.log(result)

	// const result = await Course.findByIdAndUpdate(id,{
	// 	$set: {
	// 		author: 'Jack',
	// 		isPublished: true
	// 	}
	// }, { new : true})
	// console.log(result)

}
updateCourse('61fa9031a308ce7b9677dfe0')