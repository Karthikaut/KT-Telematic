const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { sequelize, Employee, Asset } = require('./models');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/assets', async (req, res) => {
    try {
        const assets = await Asset.findAll({ include: ['assignedTo'] });
        const employees = await Employee.findAll();
        res.render('assets/list', { assets, employees });
    } catch (err) {
        res.status(500).send('Error loading assets');
    }
});

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.findAll();
        console.log(employees,'employees')
        res.render('employees/list', { employees });
    } catch (err) {
        res.status(500).send('Error loading employees');
    }
});


// API Routes
const employeeRoutes = require('./routes/employeeRoutes');
const assetRoutes = require('./routes/assetRoutes');
const assetCategoryRoutes = require('./routes/assetCategoryRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use('/api/employees', employeeRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/categories', assetCategoryRoutes);
app.use('/api/transactions', transactionRoutes);

// Redirect root to UI
app.get('/', (req, res) => {
    res.render('home')
});

// Start Server
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
