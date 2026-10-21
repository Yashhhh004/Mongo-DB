/**
 * Node.js Native HTTP Server vs Express.js Comparison
 * 
 * This file illustrates why Express.js is widely used in modern web development
 * over the low-level native Node.js 'http' module.
 */

import http from 'http';
import express from 'express';

// ============================================================================
// 1. Core Node.js HTTP Approach (Low-Level, Verbose)
// ============================================================================
/*
const rawNodeServer = http.createServer((req, res) => {
    // 1. Manual Routing Check
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello from Raw Node.js HTTP Server' }));
    } 
    // 2. Manual Body Parsing (Streaming Data Chunks)
    else if (req.url === '/create-user' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const parsedData = JSON.parse(body);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'User created via raw Node.js',
                    data: parsedData
                }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON body' }));
            }
        });
    } 
    // 3. Manual 404 Handler
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

rawNodeServer.listen(8001, () => {
    console.log('Raw Node Server running on http://localhost:8001');
});
*/

// ============================================================================
// 2. Express.js Approach (Elegant, Middleware-driven, Concise)
// ============================================================================

const app = express();
const PORT = 8000;

// Middleware to parse incoming JSON bodies automatically
app.use(express.json());

// Simple GET endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express.js Server!' });
});

// Clean POST endpoint with direct access to req.body
app.post('/create-user', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ error: 'Name and age are required' });
    }
    
    res.status(201).json({
        message: 'User created successfully with Express!',
        data: { name, age }
    });
});

app.listen(PORT, () => {
    console.log(`Express Server running on http://localhost:${PORT}`);
});

/*
 * ============================================================================
 * Summary of Differences:
 * ============================================================================
 * Feature               | Native Node.js ('http')    | Express.js
 * ----------------------|----------------------------|-------------------------
 * Routing               | Manual 'if / else' checks  | Clean app.get(), app.post()
 * Request Body Parsing  | Manual buffer stream chunks| Built-in express.json()
 * Response Formatting   | Manual res.writeHead & end | res.status(200).json(...)
 * Middleware Support    | Custom callback chains     | First-class app.use(...)
 * Error Handling        | Manual try-catch blocks    | Centralized middleware
 * ============================================================================
 */
