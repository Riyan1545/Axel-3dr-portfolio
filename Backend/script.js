const app = require('./src/app.js');
const connectDB = require('./src/db/db.js');

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log('server running on port 3000')
});