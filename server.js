const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Authentication middleware for Supabase tokens
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    // Verify token with Supabase (you would need to implement this)
    // For now, this is a placeholder - implement based on your Supabase setup
    req.user = { token };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/graffitech20', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schemas
const saleSchema = new mongoose.Schema({
  date: Date,
  salesAmount: Number,
  accessoriesAmount: Number,
  total: Number,
  user: String
});

const expenseSchema = new mongoose.Schema({
  date: Date,
  name: String,
  amount: Number,
  user: String
});

const Sale = mongoose.model('Sale', saleSchema);
const Expense = mongoose.model('Expense', expenseSchema);

// API Routes (protected by authentication)
app.get('/api/sales', authenticateToken, async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/sales', authenticateToken, async (req, res) => {
  const sale = new Sale(req.body);
  try {
    const newSale = await sale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/expenses', authenticateToken, async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/expenses', authenticateToken, async (req, res) => {
  const expense = new Expense(req.body);
  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));