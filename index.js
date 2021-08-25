const dotenv = require('dotenv');
dotenv.config();
require('./database/db');
const cors = require('cors');

const app = require('./app');
app.use(cors());
app.listen(5000, () => {
  console.log('Server on port', 5000);
});
