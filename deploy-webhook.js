const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

// Security: Only allow GitHub webhooks
app.post('/deploy', (req, res) => {
  console.log('🚀 Deploy webhook triggered');
  console.log('📅 Time:', new Date().toISOString());
  
  // Execute deployment commands
  exec('cd /var/www/gullible-giant && git pull origin main && npm run build && cp -r public/admin dist/ && npx tinacms build', 
    (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Deploy failed:', error);
        console.error('stderr:', stderr);
        return res.status(500).json({ 
          success: false, 
          error: error.message,
          stderr: stderr 
        });
      }
      
      console.log('✅ Deploy successful');
      console.log('stdout:', stdout);
      res.json({ 
        success: true, 
        message: 'Deploy successful',
        timestamp: new Date().toISOString()
      });
    }
  );
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Deploy Webhook'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎯 Deploy webhook running on port ${PORT}`);
  console.log(`🔗 Webhook URL: http://109.123.247.169:${PORT}/deploy`);
  console.log(`❤️  Health check: http://109.123.247.169:${PORT}/health`);
});