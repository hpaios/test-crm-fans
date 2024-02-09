const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/index.tsx',
    template: 'src/index.html',
    outPath: '/index.html'
  },
  {
    entry: 'src/login/index.tsx',
    template: 'src/login/index.html',
    outPath: '/login/index.html'
  },
]);

module.exports = {
  webpack: function(config, env) {
    const webpackPlugins = config.plugins.filter(p => p.constructor.name === 'HtmlWebpackPlugin');
    webpackPlugins.forEach(p => p.options = p.userOptions);

    multipleEntry.addMultiEntry(config);

    webpackPlugins.forEach(p => { p.userOptions = p.options; delete p.options; });

    return config;
  }
};
