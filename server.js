import app from './src/app.js';

const port = process.env.PORT || 8333;

app.listen(port, () => {
    console.log('Server Running');
});