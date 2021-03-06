// ===========================================
// Puerto
// ===========================================
process.env.PORT = process.env.PORT || 3000;

// ===========================================
// Entorno
// ===========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================================
// Vencimiento del token
// ===========================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días

process.env.EXPIRES_TOKEN = 60 * 60 * 24 * 30;

// ===========================================
// SEED de autenticación
// ===========================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ===========================================
// Base de datos
// ===========================================
let urlDB;
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.urlDB = urlDB;

// ===========================================
// Google Client ID
// ===========================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '77729093809-8mpecevf53p4l5g4juk70i4bekroi4nn.apps.googleusercontent.com';