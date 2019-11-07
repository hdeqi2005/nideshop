const fileCache = require('think-cache-file');
const {Console, File, DateFile} = require('think-logger3');
const path = require('path');
//const database = require('./database.js');
const sqlite = require('think-model-sqlite');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
// exports.model = {
//   type: 'mysql',
//   common: {
//     logConnect: isDev,
//     logSql: isDev,
//     logger: msg => think.logger.info(msg)
//   },
//   mysql: database
// };

exports.model = {
  type: 'sqlite',
  sqlite: {
    handle: sqlite, // Adapter handle
    path: path.join(think.ROOT_PATH, 'runtime/sqlite/demo'), // sqlite 保存的目录
    database: 'nideshop', // 数据库名
    connectionLimit: 1, // 连接池的连接个数，默认为 1
    prefix: 'nideshop_', // 数据表前缀，如果一个数据库里有多个项目，那项目之间的数据表可以通过前缀来区分
  }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};
