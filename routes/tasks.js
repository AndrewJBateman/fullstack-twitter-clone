var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://Andrew:Spiderman01AA@ds241530.mlab.com:41530/heroku_wfb956tp', ['tasks']);

//get all tasks
router.get('/tasks', function(req, res, next){
	db.tasks.find(function(err, tasks){
		if(err) {
			res.send(err);
		}
		res.json(tasks);
	});
});

//get single tasks
router.get('/task/:id', function(req, res, next){
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err) {
			res.send(err);
		}
		res.json(task);
	});
});

//save task
router.post('/task', function(req, res, next){
	const task = req.body;
	if(!task.title || (task.isDone + '')){
		res.status(400);
		res.json({
			"error: ": "Bad Data"
		})
	} else {
		db.tasks.save(task, function(err, task){
			if(err) {
			res.send(err);
			}
			res.json(task);
		});
	}
});

//delete Task
router.delete('/task/:id', function(req, res, next){
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err) {
			res.send(err);
		}
		res.json(task);
	});
});

//update Task
router.put('/task/:id', function(req, res, next){
	let task = req.body;
	let updTask = {};

	if(task.isDone){
		updTask.isDone = task.isDone;
	}

	if(task.title){
		updTask.title = task.title;
	}

	if(!updTask){
			res.status(400);
			res.json({
				"error: ": "Bad Data"
			}); 
	} else {
			db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
			if(err) {
				res.send(err);
			}
			res.json(task);
			});
	}

});

module.exports = router;