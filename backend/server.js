const express = require('express');
const bcrypt = require('bcryptjs');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'database.db', autoload: true });
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

const saltRounds = 10;

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  console.log('Requests signup!');

  // Cek user
  db.findOne({ username: username }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // pw hash
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'Error hashing password' });
      }

      // add db
      const newUser = { username: username, password: hash };
      db.insert(newUser, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving user' });
        }
        res.status(201).json({ message: 'User created successfully' });
      });
    });
  });
});

// Route Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Cari user 
  db.findOne({ username: username }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Cek password 
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing password' });
      }
      if (result) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(400).json({ message: 'Incorrect password' });
      }
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
