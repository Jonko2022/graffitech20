const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

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

// API Routes
app.get('/api/sales', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/sales', async (req, res) => {
  const sale = new Sale(req.body);
  try {
    const newSale = await sale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/expenses', async (req, res) => {
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