import { spawn } from 'node:child_process';

const processes = [
  spawn('npm', ['run', 'dev', '-w', 'apps/server'], { stdio: 'inherit', shell: true }),
  spawn('npm', ['run', 'dev', '-w', 'apps/client'], { stdio: 'inherit', shell: true })
];

const shutdown = () => processes.forEach((p) => p.kill());
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

processes.forEach((p) => {
  p.on('exit', (code) => {
    if (code && code !== 0) {
      shutdown();
      process.exit(code);
    }
  });
});
