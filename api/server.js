const { Database } = require('../database/config.js');
const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
let db;
async function initDatabase() {
    try {
        db = new Database();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
}

// Portfolio Routes
router.get('/portfolio', async (req, res) => {
    try {
        const { category, featured } = req.query;
        
        let sql = `
            SELECT pi.*, c.name as category_name 
            FROM portfolio_items pi 
            LEFT JOIN categories c ON pi.category_id = c.id 
            WHERE pi.is_active = 1
        `;
        
        const params = [];
        
        if (category) {
            sql += ' AND pi.category_id = ?';
            params.push(category);
        }
        
        if (featured !== undefined) {
            sql += ' AND pi.is_featured = ?';
            params.push(featured === 'true' ? 1 : 0);
        }
        
        sql += ' ORDER BY pi.sort_order, pi.created_at';
        
        const items = await db.query(sql, params);
        
        res.json({
            success: true,
            data: items
        });
    } catch (error) {
        console.error('Portfolio GET error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

router.post('/portfolio', async (req, res) => {
    try {
        const { title, category_id, image_url, description, is_featured, sort_order } = req.body;
        
        if (!title || !image_url) {
            return res.status(400).json({
                success: false,
                error: 'Title and image_url are required'
            });
        }
        
        const sql = `
            INSERT INTO portfolio_items (title, category_id, image_url, description, is_featured, sort_order) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        const result = await db.query(sql, [
            title,
            category_id || null,
            image_url,
            description || null,
            is_featured || false,
            sort_order || 0
        ]);
        
        res.status(201).json({
            success: true,
            message: 'Portfolio item created successfully',
            id: result.insertId
        });
    } catch (error) {
        console.error('Portfolio POST error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Services Routes
router.get('/services', async (req, res) => {
    try {
        const sql = `
            SELECT s.*, 
                   JSON_ARRAYAGG(
                       JSON_OBJECT(
                           'id', sp.id,
                           'name', sp.name,
                           'subtitle', sp.subtitle,
                           'price', sp.price,
                           'price_note', sp.price_note,
                           'features', sp.features,
                           'is_featured', sp.is_featured
                       )
                   ) as packages
            FROM services s
            LEFT JOIN service_packages sp ON s.id = sp.service_id AND sp.is_active = 1
            WHERE s.is_active = 1
            GROUP BY s.id
            ORDER BY s.id
        `;
        
        const services = await db.query(sql);
        
        // Parse JSON packages
        services.forEach(service => {
            service.packages = JSON.parse(service.packages || '[]');
        });
        
        res.json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error('Services GET error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Team Members Routes
router.get('/team', async (req, res) => {
    try {
        const sql = `
            SELECT id, name, role, image_url, bio, email, phone 
            FROM team_members 
            WHERE is_active = 1 
            ORDER BY sort_order
        `;
        
        const team = await db.query(sql);
        
        res.json({
            success: true,
            data: team
        });
    } catch (error) {
        console.error('Team GET error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Booking Routes
router.get('/bookings', async (req, res) => {
    try {
        const { code } = req.query;
        
        if (code) {
            // Get specific booking by code
            const sql = `
                SELECT b.*, c.name as client_name, c.email as client_email, c.phone as client_phone,
                       s.name as service_name, sp.name as package_name, tm.name as photographer_name
                FROM bookings b
                JOIN clients c ON b.client_id = c.id
                JOIN services s ON b.service_id = s.id
                LEFT JOIN service_packages sp ON b.package_id = sp.id
                LEFT JOIN team_members tm ON b.team_member_id = tm.id
                WHERE b.booking_code = ?
            `;
            
            const bookings = await db.query(sql, [code]);
            
            if (bookings.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'Booking not found'
                });
            }
            
            const booking = bookings[0];
            
            // Get payment info
            const paymentSql = `
                SELECT p.*, pm.name as payment_method_name 
                FROM payments p
                JOIN payment_methods pm ON p.payment_method_id = pm.id
                WHERE p.booking_id = ?
            `;
            
            const payments = await db.query(paymentSql, [booking.id]);
            booking.payments = payments;
            
            res.json({
                success: true,
                data: booking
            });
        } else {
            // Get all bookings (admin view)
            const sql = `
                SELECT b.*, c.name as client_name, c.email as client_email,
                       s.name as service_name, sp.name as package_name
                FROM bookings b
                JOIN clients c ON b.client_id = c.id
                JOIN services s ON b.service_id = s.id
                LEFT JOIN service_packages sp ON b.package_id = sp.id
                ORDER BY b.created_at DESC
            `;
            
            const bookings = await db.query(sql);
            
            res.json({
                success: true,
                data: bookings
            });
        }
    } catch (error) {
        console.error('Bookings GET error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

router.post('/bookings', async (req, res) => {
    try {
        const { 
            client_name, client_email, client_phone, client_address,
            service_id, package_id, team_member_id,
            booking_date, booking_time, location_type, location_address,
            total_price, notes, payment_method_id, payment_type
        } = req.body;
        
        if (!client_name || !client_email || !client_phone || !service_id || !booking_date || !booking_time || !total_price) {
            return res.status(400).json({
                success: false,
                error: 'Required fields are missing'
            });
        }
        
        await db.transaction(async (connection) => {
            // Create or get client
            const [client] = await connection.execute(
                `INSERT INTO clients (name, email, phone, address) 
                 VALUES (?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`,
                [client_name, client_email, client_phone, client_address || null]
            );
            
            const clientId = client.insertId;
            
            // Generate booking code
            const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            const [codeResult] = await connection.execute(
                `SELECT CONCAT('SWR-', ?, '-', LPAD(IFNULL(MAX(CAST(SUBSTRING(booking_code, 12) AS UNSIGNED)), 0) + 1, 3, '0')) as code
                 FROM bookings 
                 WHERE booking_code LIKE CONCAT('SWR-', ?, '-%')`,
                [datePrefix, datePrefix]
            );
            const bookingCode = codeResult[0].code;
            
            // Create booking
            const [booking] = await connection.execute(
                `INSERT INTO bookings (booking_code, client_id, service_id, package_id, team_member_id, 
                 booking_date, booking_time, location_type, location_address, total_price, notes) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    bookingCode, clientId, service_id, package_id || null, team_member_id || null,
                    booking_date, booking_time, location_type || 'studio', location_address || null,
                    total_price, notes || null
                ]
            );
            
            const bookingId = booking.insertId;
            
            // Create payment record if payment info provided
            if (payment_method_id) {
                await connection.execute(
                    `INSERT INTO payments (booking_id, payment_method_id, amount, payment_type, status) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [bookingId, payment_method_id, total_price, payment_type || 'full_payment', 'pending']
                );
            }
            
            return { bookingCode, bookingId };
        });
        
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking_code: bookingCode
        });
        
    } catch (error) {
        console.error('Bookings POST error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Blog Posts Routes
router.get('/blog', async (req, res) => {
    try {
        const sql = `
            SELECT id, title, slug, excerpt, image_url, meta_info, published_at
            FROM blog_posts 
            WHERE is_published = 1 
            ORDER BY published_at DESC
        `;
        
        const posts = await db.query(sql);
        
        res.json({
            success: true,
            data: posts
        });
    } catch (error) {
        console.error('Blog GET error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Site Settings Routes
router.get('/settings', async (req, res) => {
    try {
        const sql = 'SELECT setting_key, setting_value FROM site_settings';
        const settings = await db.query(sql);
        
        const settingsObj = {};
        settings.forEach(setting => {
            if (setting.setting_key.startsWith('json_')) {
                settingsObj[setting.setting_key.replace('json_', '')] = JSON.parse(setting.setting_value || '{}');
            } else {
                settingsObj[setting.setting_key] = setting.setting_value;
            }
        });
        
        res.json({
            success: true,
            data: settingsObj
        });
    } catch (error) {
        console.error('Settings GET error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Use router
app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Start server
const PORT = process.env.PORT || 3000;

async function startServer() {
    await initDatabase();
    
    app.listen(PORT, () => {
        console.log(`Swarattive API server running on port ${PORT}`);
        console.log(`Available endpoints:`);
        console.log(`  GET  /api/portfolio`);
        console.log(`  POST /api/portfolio`);
        console.log(`  GET  /api/services`);
        console.log(`  GET  /api/team`);
        console.log(`  GET  /api/bookings`);
        console.log(`  POST /api/bookings`);
        console.log(`  GET  /api/blog`);
        console.log(`  GET  /api/settings`);
    });
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    if (db) {
        await db.close();
    }
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    if (db) {
        await db.close();
    }
    process.exit(0);
});

// Start the server
startServer().catch(console.error);

module.exports = app;
