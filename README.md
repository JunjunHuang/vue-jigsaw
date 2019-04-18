# vue-jigsaw

## 组件安装
```
npm i vue-jigsaw
```
## 使用
```
main.js

import vueJigsaw from 'vue-jigsaw'
Vue.use(vueJigsaw);

```
## 列子一
###### 使用刷新时，组件背景图不变
```
<vue-jigsaw :urls="urls" :verify="handleVerify" @success="handleSuccess" @fail="handleFail" @complete="handleComplete" :isErrorRefresh="true"></vue-jigsaw>

urls:['背景图','滑块图'] 

handleVerify(x){
  console.log(x);
  return true;//失败则false
}
```
## 例子二
###### 使用刷新时，背景图可根据方法自行获取
```
<vue-jigsaw :urls="getUrls" :verify="handleVerify" @success="handleSuccess" @fail="handleFail" @complete="handleComplete" :isErrorRefresh="true"></vue-jigsaw>

getUrls(){
return ['背景图','滑块图']
}

handleVerify(x){
  console.log(x);
  return true;//失败则false
}
```
## 参数说明
| 参数  | 是否必填  | 说明  | 类型 |
| ------------ | ------------ | ------------ | ------------ |
| urls  | 是 | 图片链接 urls['背景图片','移动滑块']，图片需高度一致，滑块图片宽度不限，为避免最终获得比例有误，滑块需紧贴左侧,  | Array/Function |
| isErrorRefresh  | 否 | 是否在校验失败后刷新组件，默认false  | Boolean |
| verify  | 是  | 验证滑块位置是否正确的,方法会接收一个参数，即滑块距图片左侧的百分比，方法需返回检验结果 True or False  | Function |
| success  | 否  | 图片验证成功后执行操作  | Function |
| fail  | 否  | 图片验证失败执行操作  | Function |
| complete  | 否 | 图片验证完成后执行方法（无论成功或失败都将执行） | Function |

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
