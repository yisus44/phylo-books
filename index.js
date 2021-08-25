const dotenv = require('dotenv');
dotenv.config();
require('./database/db');
const cors = require('cors');

const app = require('./app');
app.use(cors());
app.listen(process.env.PORT, () => {
  console.log('Server on port', process.env.PORT);
});
