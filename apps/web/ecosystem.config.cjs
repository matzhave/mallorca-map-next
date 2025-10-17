module.exports = {
  apps: [
    {
      name: 'mallorca-map-staging',
      script: 'bun',
      args: 'run start',
      cwd: '/var/www/mallorca-map-next/apps/web',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/mallorca-map-staging-error.log',
      out_file: '/var/log/pm2/mallorca-map-staging-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};

