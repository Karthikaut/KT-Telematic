// const express = require('express');
// const db = require('./models');
// const path = require('path');
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Static files
// app.use(express.static(path.join(__dirname, 'public')));

// // View engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');



// app.use('/api/assets', require('./routes/assetRoutes'));
// app.use('/api/employees', require('./routes/employeeRoutes'));
// app.use('/api/categories', require('./routes/assetCategoryRoutes'));
// app.use('/api/assets', require('./routes/assetRoutes'));
// app.use('/api/transactions', require('./routes/transactionRoutes'));

// app.use('/libs', express.static(path.join(__dirname, 'public/libs')));
// app.use('/css', express.static(path.join(__dirname, 'public/css')));
// app.use('/js', express.static(path.join(__dirname, 'public/js')));



// app.get('/assets/list',async (req, res) => {
//     const assets = await db.Asset.findAll();
//     const employees = await db.Employee.findAll({});
//     console.log(assets,employees,"name")
//     res.render('assetList', { data: assets, data1: employees });
// });

// db.sequelize.sync({ force: false }).then(() => {
//     app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
// });





const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const { sequelize } = require('./models'); // Ensure models/index.js exports sequelize instance

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const employeeRoutes = require('./routes/employeeRoutes');
const assetRoutes = require('./routes/assetRoutes');
const assetCategoryRoutes = require('./routes/assetCategoryRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Use Routes

app.use('/employees', employeeRoutes);
app.use('/assets', assetRoutes);
app.use('/categories', assetCategoryRoutes);
app.use('/api/transactions', transactionRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Asset Management System API is running.');
});

// Sync DB and Start Server
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) // use { force: true } to reset DB
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

