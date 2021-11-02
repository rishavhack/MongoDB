const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/population')
.then(() => console.log('Connected to Mongodb'))
.catch(err => console.log('Could not connect to Mongodb..',err))

const Author = mongoose.model('Author',new mongoose.Schema({
	name: String,
	bio: String,
	website: String
}));

const Course = mongoose.model('Course',new mongoose.Schema({
	name: String,
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Author'
	}
}));


async function createAuthor(name,bio,website){
	const author = new Author({
		name,
		bio,
		website
	});
	const result = await author.save();
	console.log(result);
}

async function createCourse(name,author){
	const course = new Course({
		name,
		author
	});
	const result = await course.save();
	console.log(result);
}

async function listCourses(){
	const courses = await Course
			.find()
			.populate('author')
			.select('name');
	console.log(courses)
}

//createAuthor('Mosh','My bio','My website');

//createCourse('Node Course', '62009233f8776cc9414a6053')

listCourses();
