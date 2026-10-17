import { spawn } from 'child_process';

console.log('🚀 Starting IDEA BRIDGE: The Venture Realm...');

// Start Express Backend
const server = spawn('node', ['server/index.js'], { stdio: 'inherit' });

// Start Vite Frontend
const vite = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5173'], { stdio: 'inherit' });

process.on('SIGINT', () => {
  server.kill();
  vite.kill();
  process.exit();
});
