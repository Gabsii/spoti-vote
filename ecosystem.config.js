module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'FrontEnd',
      cwd       : './spoti-vote',
      script    : 'npm',
      args      : 'start',
      watch     : true,
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // Second application
    {
      name      : 'BackEnd',
      cwd       : './spoti-vote-backend/',
      script    : 'node',
      args      : 'server.js',
      watch     : true 
   }
  ]
};
