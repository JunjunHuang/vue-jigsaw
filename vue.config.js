const path=require('path');
module.exports = {
  lintOnSave: false,
  css:{
    extract:false
  },
  productionSourceMap:false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack:config=>{
    config.output.path(path.resolve(__dirname, './dist')).filename('vueJigsaw.js').library('vueJigsaw').libraryTarget('umd').umdNamedDefine(true);
  }
}