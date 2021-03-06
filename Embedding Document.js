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
	author:new mongoose.Schema({
			name: String,
			bio: String,
			website: String
		})
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
	console.log(courses)
}
// async function updateAuthor(courseId){
// 	const course = await Course.update({_id:courseId},{
// 		$set:{
// 			'author.name': 'Rishav'
// 		}
// 	});
// 	//course.author.name = 'Mosh Hamedani';
// 	//course.save()
// }

async function updateAuthor(courseId){
	const course = await Course.update({_id:courseId},{
		$unset:{
			'author': ''
		}
	});
	//course.author.name = 'Mosh Hamedani';
	//course.save()
}

updateAuthor('620095a782f1bdb8cbd733d9')
//createCourse('Node Course', new Author({name:'Mosh'}))

//listCourses();
