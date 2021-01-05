module.exports = {
  // to avoid problems of file change detection
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300;
    return config;
  }
};