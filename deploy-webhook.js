const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/deploy', (req, res) => {
  console.log('Deploying...');
  
  exec('cd /var/www/gullible-giant && git pull origin main && npm run build && cp -r public/admin dist/', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return res.status(500).send('Deploy failed');
    }
    
    console.log('Deploy successful');
    res.send('Deploy successful');
  });
});

app.listen(3000, () => {
  console.log('Deploy webhook running on port 3000');
});
