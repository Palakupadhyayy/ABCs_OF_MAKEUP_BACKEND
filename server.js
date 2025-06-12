const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Import routes
const registrationRoutes = require('./routes/registrationRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Use routes
app.use('/api', registrationRoutes);
app.use('/api', contactRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
