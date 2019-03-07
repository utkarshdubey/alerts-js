

module.exports = function (api) {
  api.cache(true);

  const presets = [ 
    [
      "@babel/preset-env",
      {
        targets: {
          edge: "15",
          firefox: "47",
          chrome: "55",
          safari: "11.1",
        },
        useBuiltIns: "usage",
      },
    ],    
   ];


  return {
    presets
  };
}