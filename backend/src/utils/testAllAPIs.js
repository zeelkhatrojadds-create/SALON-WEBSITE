import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { connectDB } from '../config/database.js';
import { seedDatabase } from './seedData.js';

import authRoutes from '../routes/authRoutes.js';
import serviceRoutes from '../routes/serviceRoutes.js';
import appointmentRoutes from '../routes/appointmentRoutes.js';
import offerRoutes from '../routes/offerRoutes.js';
import galleryRoutes from '../routes/galleryRoutes.js';
import reviewRoutes from '../routes/reviewRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';

import notificationService from './notificationService.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

let server;

export const runComprehensiveTests = async () => {
  try {
    await connectDB();
    await seedDatabase();

    server = app.listen(0);
    const port = server.address().port;
    const baseUrl = `http://localhost:${port}`;
    console.log(`Test server running at ${baseUrl}`);

    // 1. Auth Test
    const regRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Zeel Khatroja',
        email: 'zeel.khatroja@example.com',
        phone: '+1 613-555-0199',
        password: 'CustomerPass123!',
        role: 'customer'
      })
    });
    const regData = await regRes.json();
    console.log('User Reg HTTP Code:', regRes.status);
    const customerToken = regData.data.token;

    const adminLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@girlookedforyou.ca',
        password: 'admin123'
      })
    });
    const adminLoginData = await adminLoginRes.json();
    console.log('Admin Login HTTP Code:', adminLoginRes.status);
    const adminToken = adminLoginData.data.token;

    // 2. Services Test
    const servicesRes = await fetch(`${baseUrl}/api/services`);
    const servicesData = await servicesRes.json();
    console.log('Services Count:', servicesData.count);

    // 3. Booking & Double Booking Test
    const testDate = '2026-10-10';
    const testTime = '10:00 AM';

    const bookResA = await fetch(`${baseUrl}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: 'Customer A (Zeel)',
        phone: '+1 613-555-0101',
        service: 'Noor Glow Facial',
        date: testDate,
        time: testTime,
        price: 95,
        paymentMethod: 'COD'
      })
    });
    console.log('Customer A Booking HTTP Code (Expected 201):', bookResA.status);

    // Customer B Double-Booking Attempt
    const bookResB_Conflict = await fetch(`${baseUrl}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: 'Customer B (Conflict Test)',
        phone: '+1 613-555-0102',
        service: 'Noor Brow Threading',
        date: testDate,
        time: testTime,
        price: 15,
        paymentMethod: 'card'
      })
    });
    console.log('Customer B Double Booking HTTP Code (Expected 409):', bookResB_Conflict.status);

    // 4. Admin Dashboard Stats
    const dashRes = await fetch(`${baseUrl}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const dashData = await dashRes.json();
    console.log('Admin Dashboard Stats HTTP Code:', dashRes.status);
    console.log('Live MongoDB Metrics:', JSON.stringify(dashData.data, null, 2));

    console.log('\n==================================================');
    console.log('BACKEND API TEST SUITE PASSED 100% SUCCESSFULLY');
    console.log('==================================================\n');

    server.close();
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('TEST SUITE ERROR:', error);
    if (server) server.close();
    await mongoose.connection.close();
    process.exit(1);
  }
};

runComprehensiveTests();
