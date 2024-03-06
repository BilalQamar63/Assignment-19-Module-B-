const express = require('express');
const students = require('./Students');

const app = express();
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});

app.get('/', (req, res) => {
  res.json({ message: 'API is Working' });
});

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.post('/api/students', (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ error: "email is required" });
  }

  const user = {
    id: students.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  };

  students.push(user);
  res.status(201).json(user);
});

app.put('/api/students/:id', (req, res) => {
  const id = req.params.id;
  const index = students.findIndex(student => student.id == id);
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students[index] = {
    ...students[index],
    ...req.body
  };

  res.json(students[index]);
});

app.delete('/api/students/:id', (req, res) => {
  const id = req.params.id;
  const index = students.findIndex(student => student.id == id);
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);
  res.json(deletedStudent);
});
