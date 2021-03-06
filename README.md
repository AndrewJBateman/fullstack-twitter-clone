# :zap: Twitter Clone

* Simple full-stack app that displays a list of messages ('tweets') generated on the client side and processes them using backend node.js. Future link to mongodb database to save messages.
* **Note:** to open web links in a new window use: _ctrl+click on link_

![GitHub repo size](https://img.shields.io/github/repo-size/AndrewJBateman/fullstack-twitter-clone?style=plastic)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AndrewJBateman/fullstack-twitter-clone?style=plastic)
![GitHub Repo stars](https://img.shields.io/github/stars/AndrewJBateman/fullstack-twitter-clone?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/AndrewJBateman/fullstack-twitter-clone?style=plastic)

## :page_facing_up: Table of contents

* [:zap: Twitter Clone](#zap-twitter-clone)
	* [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
	* [:books: General info](#books-general-info)
	* [:camera: Screenshots](#camera-screenshots)
	* [:signal_strength: Technologies](#signal_strength-technologies)
	* [:floppy_disk: Setup](#floppy_disk-setup)
	* [:computer: Code Examples](#computer-code-examples)
	* [:cool: Features](#cool-features)
	* [:clipboard: Status & To-Do List](#clipboard-status--to-do-list)
	* [:clap: Inspiration](#clap-inspiration)
	* [:envelope: Contact](#envelope-contact)

## :books: General info

* A simplified Twitter clone using simple front and backends. Dependencies updated aug 2020.

## :camera: Screenshots

![Example screenshot](./img/tweets-frontend.png).

## :signal_strength: Technologies

* [Node.js v12](https://nodejs.org/en/)
* [npm javascript filter used on title and content user inputs](https://www.npmjs.com/package/bad-words)
* [npm Express rate limiting](https://www.npmjs.com/package/express-rate-limit) using Node internal store (i.e.not an external database).
* [npm monk toolkit for mongodb](https://nodejs.org/en/)

## :floppy_disk: Setup

* Backend: From the `/server` directory run `npm run dev` for a dev server. Navigate to `http://localhost:5000/`. The app uses Nodemon and will automatically reload if you change any of the source files. Navigate to `http://localhost:5000/tweets` to see tweets in JSON.
* Frontend: open `/client/index.html` in browser. Enter a tweet and click 'Send Your Tweet' button. Tweet will be displayed below.

## :computer: Code Examples

* `server/index.js` - function to post tweet data from html frontend req.body parameters; filtering text then adding to tweets array.

```javascript

app.post('/tweets', (req, res, next) => {
	if(isValidTweet(req.body)) {
		const tweet = {
			name: filter.clean(req.body.name.toString()),
			content: filter.clean(req.body.content.toString()),
			created: new Date()
		};

		tweets
			.prepend(tweet)
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

```

## :cool: Features

* A simple app with vanilla javascript. No js framework used.

## :clipboard: Status & To-Do List

* Status: basic working app that saves tweets locally.
* To-Do: Correct code so latest tweet listed first (`reverse()` function not working). Remove duplication of tweets. Add connection to mongodb database.

## :clap: Inspiration

* [Tutorial: The Coding Train: Build a Full Stack Twitter Clone with Coding Garden](https://www.youtube.com/watch?v=JnEH9tYLxLk)

## :file_folder: License

* This project is licensed under the terms of the MIT license.

## :envelope: Contact

* Repo created by [ABateman](https://github.com/AndrewJBateman), email: gomezbateman@yahoo.com
