const path = require('path');

const rewireEntries = [
  {
    name: 'user',
    entry: path.resolve(__dirname, './src/user/index.tsx'),
    template: path.resolve(__dirname, './src/user/index.html'),
    outPath: 'user/index.html',
  },
  {
    name: 'login',
    entry: path.resolve(__dirname, './src/login/index.tsx'),
    template: path.resolve(__dirname, './src/login/index.html'),
    outPath: 'login/index.html',
  },
];

const defaultEntryName = 'main';

const appIndexes = ['js', 'tsx', 'ts', 'jsx'].map((ext) =>
  path.resolve(__dirname, `src/index.${ext}`)
);

function webpackMultipleEntries(config) {
  const defaultEntryHTMLPlugin = config.plugins.filter((plugin) => {
    return plugin.constructor.name === 'HtmlWebpackPlugin';
  })[0];
  defaultEntryHTMLPlugin.userOptions.chunks = [defaultEntryName];

  if (!Array.isArray(config.entry)) {
    config.entry = [config.entry];
  }

  const necessaryEntry =
    config.entry.length === 1
      ? []
      : config.entry.filter((file) => !appIndexes.includes(file));
  const multipleEntry = {};
  multipleEntry[defaultEntryName] = config.entry;

  rewireEntries.forEach((entry) => {
    multipleEntry[entry.name] = necessaryEntry.concat(entry.entry);

    config.plugins.unshift(
      new defaultEntryHTMLPlugin.constructor(
        Object.assign({}, defaultEntryHTMLPlugin.userOptions, {
          filename: entry.outPath,
          template: entry.template,
          chunks: [entry.name],
        })
      )
    );
  });
  config.entry = multipleEntry;

  let names = config.output.filename.split('/').reverse();

  if (names[0].indexOf('[name]') === -1) {
    names[0] = '[name].' + names[0];
    config.output.filename = names.reverse().join('/');
  }

  return config;
}

module.exports = {
  webpack: {
    configure: webpackMultipleEntries,
  },
  eslint: {
    mode: 'file',
  },
};
