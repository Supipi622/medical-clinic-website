const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const port = 3001;
const app = express();

app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers) if needed
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: '',
    database: "cliniccenter",  
  });


// Configure Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// In-memory database for simplicity (replace with a real database in a production environment)
const patients = [];

// API endpoint for creating a new patient
app.post('/api/patients', upload.single('photo'), (req, res) => {
    try {
      const { name, birthday, contact, nic, notes } = req.body;
  
      const sql = 'INSERT INTO Patients (name, birthday, contact, nic, photo, notes) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [name, birthday, contact, nic, req.file ? `/uploads/${req.file.filename}` : null, notes];
  
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error inserting into the database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          const newPatient = {
            patient_Id: result.insertId,
            name,
            birthday,
            contact,
            photo: req.file ? `/uploads/${req.file.filename}` : null,
            nic,
            notes,
          };
          res.json(newPatient);
        }
      });
    } catch (error) {
      console.error('Error handling POST request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  


// API endpoint for retrieving all patients
app.get('/api/patients', (req, res) => {
  res.json(patients);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
