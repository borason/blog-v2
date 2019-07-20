// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const app = express();

const homeStartingContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero justo laoreet sit amet cursus. Ipsum suspendisse ultrices gravida dictum. Odio ut enim blandit volutpat. Risus nec feugiat in fermentum posuere urna. Eget nullam non nisi est sit amet facilisis magna. Bibendum est ultricies integer quis auctor elit. Massa id neque aliquam vestibulum morbi blandit cursus risus at. A scelerisque purus semper eget duis at tellus at urna. Donec ultrices tincidunt arcu non sodales neque. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Lectus urna duis convallis convallis tellus id interdum velit. Viverra justo nec ultrices dui. Nec ultrices dui sapien eget mi proin sed libero enim. Nec ultrices dui sapien eget mi proin sed libero enim. Libero justo laoreet sit amet cursus. Aliquam ultrices sagittis orci a scelerisque. Posuere ac ut consequat semper viverra nam libero justo laoreet. Scelerisque in dictum non consectetur a erat nam at lectus.';

const posts = [];

app.set('view engine', 'ejs');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const title = req.body.postTitle;
  const content = req.body.blogContent;
  const post = {
    title: title,
    content: content
  };
  posts.push(post);
  res.redirect('/');
});

app.get('/posts/:postName', (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postTitle);

  posts.forEach(post => {
    const loweredTitle = _.lowerCase(post.title);

    if (loweredTitle === requestedTitle) {
      res.render('post', {
        content: post.content,
        title: post.title
      });
    }
  });
});

app.listen(3000, () => console.log('Server has started on port 3000'));