const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Middleware to parse JSON bodies
app.use(express.json());

/*
- Create a new HTML file named home.html 
- Add <h1> tag with the message "Welcome to ExpressJs Tutorial"
- Return home.html page to the client when `/home` route is accessed
*/
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

/*
- Return all details from user.json file to the client in JSON format
*/
router.get('/profile', (req, res) => {
  const userData = JSON.parse(fs.readFileSync('user.json'));
  res.json(userData);
});

/*
- Modify /login route to accept username and password as JSON body parameters
- Read data from user.json file
- Check if username and password are valid, and return appropriate response
*/
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const userData = JSON.parse(fs.readFileSync('user.json'));

  if (userData.username === username) {
    if (userData.password === password) {
      res.json({
        status: true,
        message: "User is valid"
      });
    } else {
      res.json({
        status: false,
        message: "Password is invalid"
      });
    }
  } else {
    res.json({
      status: false,
      message: "Username is invalid"
    });
  }
});

/*
- Modify /logout route to accept username as a parameter and display a message
   in HTML format like <b>${username} successfully logged out.</b>
*/
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

/*
Add error handling middleware to handle errors and return a 500 page with the message "Server Error"
*/
app.use((err, req, res, next) => {
  res.status(500).send('Server Error');
});

app.use('/', router);

const PORT = process.env.port || 8081;
app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
});
