const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // الاتصال باستخدام المتغير السري في Vercel
        await mongoose.connect(process.env.MONGODB_URI); 
        
        // رسالة نجاح ستظهر في سجلات Vercel
        console.log('--- MongoDB Connected successfully! ---'); 
    } catch (err) {
        // رسالة فشل واضحة ستظهر في سجلات Vercel
        console.error('--- MongoDB Connection FAILED:', err.message, '---'); 
        process.exit(1); // إيقاف العملية إذا فشل الاتصال
    }
};

module.exports = connectDB;