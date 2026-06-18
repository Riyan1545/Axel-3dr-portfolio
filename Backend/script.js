const app = require('./src/app.js');
const connectDB = require('./src/db/db.js');

connectDB();

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`server running on port ${process.env.PORT}`)
});