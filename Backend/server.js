const express = require('express');
const db = require('./config/Database');
const cors = require('cors');
const authRoutes = require('./routes/authRouter');
const notesRoutes = require('./routes/notesRouter');
const path = require('path');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.path}`);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.use(express.static(path.join(__dirname, '../Frontend/build')));

app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
        res.sendFile(path.join(__dirname, '../Frontend/build', 'index.html'));
    } else {
        res.status(404).json({ error: 'Not Found' });
    }
});

app.listen(5000, async (err) => {
    await db();
    if (!err) {
        console.log("Server started");
    } else {
        console.error("Error starting server:", err);
    }
});
