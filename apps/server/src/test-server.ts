import express from 'express';
const app = express();
const PORT = 9999;
app.get('/', (req, res) => res.send('OK'));
app.listen(PORT, () => console.log(`Test server running on port ${PORT}`));
setTimeout(() => {
    console.log('Test server exiting intentionally');
    process.exit(0);
}, 5000);
