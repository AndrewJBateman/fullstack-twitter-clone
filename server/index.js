const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/tweeter');
const tweets = db.get('tweets');
const filter = new Filter();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'tweeeeeettttt',
	});
});

app.get('/tweets', (req, res, next) => {
	tweets.find().then((tweets) => {
		res.json(tweets);
	});
});

function isValidTweet(tweet) {
	return (
		tweet.name &&
		tweet.name.toString().trim() !== '' &&
		tweet.content &&
		tweet.content.toString().trim() !== ''
	);
}

app.use(
	rateLimit({
		windowMs: 30 * 1000, // 30 seconds
		max: 1, // limit each IP to 1 request per windowMs
	})
);

app.post('/tweets', (req, res, next) => {
	if (isValidTweet(req.body)) {
		const tweet = {
			name: filter.clean(req.body.name.toString()),
			content: filter.clean(req.body.content.toString()),
			created: new Date(),
		};

		tweets.insert(tweet).then((createdTweet) => {
			res.json(createdTweet);
		});
	} else {
		res.status(422);
		res.json({
			message: 'Helooo, name and message are required',
		});
	}
});

app.listen(5000, () => {
	console.log('listening on http://localhost:5000');
});
