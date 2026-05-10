const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const patientRoutes = require('./patient.routes');
const hospitalRoutes = require('./hospital.routes');
const bedRoutes = require('./bed.routes');
const bookingRoutes = require('./booking.routes');
const doctorRoutes = require('./doctor.routes');
const appointmentRoutes = require('./appointment.routes');
const medicineRoutes = require('./medicine.routes');
const orderRoutes = require('./order.routes');
const recordRoutes = require('./record.routes');
const emergencyRoutes = require('./emergency.routes');
const ambulanceRoutes = require('./ambulance.routes');
const insuranceRoutes = require('./insurance.routes');
const notificationRoutes = require('./notification.routes');
const aiRoutes = require('./ai.routes');
const adminRoutes = require('./admin.routes');

router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);
router.use('/hospitals', hospitalRoutes);
router.use('/beds', bedRoutes);
router.use('/bookings', bookingRoutes);
router.use('/doctors', doctorRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/medicines', medicineRoutes);
router.use('/orders', orderRoutes);
router.use('/records', recordRoutes);
router.use('/emergencys', emergencyRoutes);
router.use('/ambulances', ambulanceRoutes);
router.use('/insurances', insuranceRoutes);
router.use('/notifications', notificationRoutes);
router.use('/ais', aiRoutes);
router.use('/admins', adminRoutes);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Sanjeevni API v1 — All systems operational',
    availableRoutes: router.stack.filter(r => r.regexp).map(r => `/api/v1${r.regexp}`)
  });
});

module.exports = router;
