const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/tweeter');
const tweets = db.get('tweets');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'tweeeeeettttt'
	});
});

app.get('/tweets', (req, res) => {
	tweets
	.find()
	.then(tweets => {
		res.json(tweets);
	});
});

function isValidTweet(tweet) {
	return tweet.name && tweet.name.toString().trim() !== '' && 
	tweet.content && tweet.content.toString().trim() !== '';
}

app.post('/tweets', (req, res) => {
	if(isValidTweet(req.body)) {
		const tweet = {
			name: req.body.name.toString(),
			content: req.body.content.toString(),
			created: new Date()
		};

		tweets
			.insert(tweet)
			.then(createdTweet => {
				res.json(createdTweet);
			});

	} else {
		res.status(422);
		res.json({
			message: 'Helooo, name and message are required'
		});
	}
});

app.listen(5000, () => {
	console.log('listening on http://localhost:5000');
});