// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
// const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb+srv://admin_bora:Parker801@cluster0-dsp5c.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

const newPost = new Post({
  title: 'new',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla phasellus faucibus scelerisque eleifend donec. Fermentum dui faucibus in ornare quam viverra orci. Metus vulputate eu scelerisque felis imperdiet proin. Varius quam quisque id diam vel quam elementum pulvinar. Et netus et malesuada fames ac turpis egestas maecenas. Phasellus egestas tellus rutrum tellus pellentesque eu. Ut consequat semper viverra nam libero. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Nunc sed augue lacus viverra vitae. Arcu cursus vitae congue mauris rhoncus aenean vel elit.'
});

// newPost.save((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('New post saved to DB');
//   }
// });

const homeStartingContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero justo laoreet sit amet cursus. Ipsum suspendisse ultrices gravida dictum. Odio ut enim blandit volutpat. Risus nec feugiat in fermentum posuere urna. Eget nullam non nisi est sit amet facilisis magna. Bibendum est ultricies integer quis auctor elit. Massa id neque aliquam vestibulum morbi blandit cursus risus at. A scelerisque purus semper eget duis at tellus at urna. Donec ultrices tincidunt arcu non sodales neque. Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Lectus urna duis convallis convallis tellus id interdum velit. Viverra justo nec ultrices dui. Nec ultrices dui sapien eget mi proin sed libero enim. Nec ultrices dui sapien eget mi proin sed libero enim. Libero justo laoreet sit amet cursus. Aliquam ultrices sagittis orci a scelerisque. Posuere ac ut consequat semper viverra nam libero justo laoreet. Scelerisque in dictum non consectetur a erat nam at lectus.';

// const posts = [];

app.set('view engine', 'ejs');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static('public'));

app.get('/', (req, res) => {
  Post.find({}, (err, allPosts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        startingContent: homeStartingContent,
        posts: allPosts
      });
    }
  });
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const title = req.body.postTitle;
  const content = req.body.blogContent;
  const post = new Post({
    title: title,
    content: content
  });
  post.save((err) => {
    if (!err) {
      res.redirect('/');
    };
  });
});

app.get("/posts/:postId", function (req, res) {

  const requestedPostId = req.params.postId;

  Post.findOne({
    _id: requestedPostId
  }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);