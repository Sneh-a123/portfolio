import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import inquiryRoutes from './routes/inquiries.js';
import chatRoutes from './routes/chat.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting to prevent spam
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, message: 'Too many requests from this IP, please try again in 15 minutes.' }
});

app.use('/api/', apiLimiter);

// API Routes
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/chat', chatRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'SNEHA.EXE',
    tagline: 'Building Digital Experiences with Logic, Creativity & a Little Love ❤️',
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend build in production if available
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientBuildPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send(`
        <html>
          <body style="background:#0f0f0f;color:#fff;font-family:sans-serif;text-align:center;padding:50px;">
            <h1 style="color:#DC2626;">SNEHA.EXE API Server is Running ⚡</h1>
            <p>Start the client with <code>npm run dev --prefix client</code> for interactive UI.</p>
          </body>
        </html>
      `);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error occurred.' });
});

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║               ❤️  SNEHA.EXE BACKEND SERVER  ⚡               ║
╠══════════════════════════════════════════════════════════════╣
║  Port:         http://localhost:${PORT}                        ║
║  Environment:  ${process.env.NODE_ENV || 'development'}                             ║
║  Cupid AI:     Active & Listening                            ║
║  Status:       Ready to turn logic into digital magic        ║
╚══════════════════════════════════════════════════════════════╝
    `);
  });
};

startServer();

