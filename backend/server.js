require('dotenv').config();
const app = require('./src/app');
const connectDatabase = require('./src/config/database');
const port = Number(process.env.PORT) || 3000;
connectDatabase().finally(() => {
  app.listen(port, () => console.log(`Portfolio server running at http://localhost:${port}`));
});
