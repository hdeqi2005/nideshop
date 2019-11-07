const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: 'ftp4shopsmusic',
  prefix: 'nideshop_',
  encoding: 'utf8mb4',
  host: 'db4free.net',
  port: '3306',
  user: 'ftp4shopsmusic',
  password: 'ftp4shopsmusic',
  dateStrings: true
};
