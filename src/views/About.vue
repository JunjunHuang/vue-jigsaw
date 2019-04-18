<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="box">
      <vue-jigsaw :urls="getImg" :verify="handleVerify" @success="handleSuccess" @fail="handleFail" @complete="handleComplete" :isErrorRefresh="true"></vue-jigsaw>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      urls:['http://192.168.17.166:1111/1.jpg','http://192.168.17.166:1111/2.png'],
      result:true
    }
  },
  methods: {
    handleVerify(x){
      return this.handleTest(x)
    },
    handleTest(x){
      return new Promise((resolve, reject)=>{
        setTimeout(function() {
          if(x>55&&x<59){
            resolve(true)
          }else{
            resolve(false)
          }
      }, 200);
      })
    },
    getImg(){
      return ['http://192.168.17.166:1111/1.jpg','http://192.168.17.166:1111/2.png']
    },
    handleSuccess(){
      console.log(111)
    },
    handleFail(){
      console.log(2222)
    },
    handleComplete(){
      console.log(333)
    }
  }
}
</script>

<style scoped>
.box{
  width: 300px;
  margin: auto;
}
</style>
