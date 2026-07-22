require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const { connectDatabase } = require("./config/database");
const { initializeSSE } = require("./config/sse");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer.routes");
const sellerRoutes = require("./routes/seller.routes");
const logisticsPartnerRoutes = require("./routes/logisticsPartner.routes");
const driverRoutes = require("./routes/driver.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const orderRoutes = require("./routes/order.routes");
const shipmentRoutes = require("./routes/shipment.routes");
const trackingRoutes = require("./routes/tracking.routes");
const dashboardRoutes = require("./routes/dashboard.routes");


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/logistics-partners', logisticsPartnerRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/dashboard", dashboardRoutes);

// SSE
initializeSSE(app);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        console.log('Connecting to SQL Server...');

        await connectDatabase();

        console.log('SQL Server Connected Successfully.');

        app.listen(PORT, () => {
            console.log('====================================');
            console.log('ONDC Logistics Management System');
            console.log('Version : 2.0');
            console.log(`Server  : Running`);
            console.log(`Port    : ${PORT}`);
            console.log('====================================');
        });

    } catch (err) {
        console.error('Application startup failed:');
        console.error(err);
        process.exit(1);
    }
})();