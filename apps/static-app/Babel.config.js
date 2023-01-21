module.exports = (api) => {
  api.cache.never();

  const presets = ["@babel/preset-react", "@babel/preset-env"];
  const plugins = [];
  return { presets, plugins };
};
