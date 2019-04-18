<template>
  <div class="box">
    <div class="_jigsaw-img" id="_jigsaw_img">
      <img v-if="imgs[0]" :src="imgs[0]">
      <div class="_jigsaw-img-box" id="_jigsaw_img_btn" :style="'left:'+silder_img_l+'%'">
        <img v-if="imgs[1]" :src="imgs[1]" alt="" srcset="">
      </div>
      <div class="_jigsaw_update-btn" @click="updateCheck"></div>
    </div>
    <div class="_jigsaw" id="_jigsaw">
      <div class="_jigsaw-box" id="_jigsaw_box"></div>
      <div class="_jigsaw-btn--path" id="_jigsaw_btn_path" :style="'width:'+path_w+'%'" :class="[{active:status==0},{success:status==1},{error:status==-1}]"></div>
      <div class="_jigsaw-btn " :class="[{'_jigsaw_quanyou':status==0},{'_jigsaw_success':status==1},{'_jigsaw_error':status==-1}]" id="_jigsaw_btn" :style="'left:'+silder_l+'%'"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vueJigsaw",
  props: {
    isErrorRefresh:{
      type:Boolean,
      default:true
    },
    verify: {
      type: Function,
      default: () => {
        return false;
      }
    },
    urls: {
      type: Function,
      default: () => {
        return ["", ""];
      }
    }
  },
  data() {
    return {
      imgs: ["", ""],
      down_x: 0,
      up_x: 0,
      path_w: 0,
      silder_l: 0,
      silder_img_l: 0,
      move_statu: false,
      status: 0,
      isMobile: false,
      handle: {
        start: "",
        move: "",
        end: ""
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let that = this;
      if (that.IsPC()) {
        that.handle = {
          start: "mousedown",
          move: "mousemove",
          end: "mouseup"
        };
      } else {
        that.isMobile = true;
        that.handle = {
          start: "touchstart",
          move: "touchmove",
          end: "touchend"
        };
      }
      this.imgs = this.urls();
      //事件开始，添加监听
      document
        .getElementById("_jigsaw_btn")
        .addEventListener(that.handle.end, that.listenerUp, false);
      document
        .getElementById("_jigsaw_btn")
        .addEventListener(that.handle.start, that.listenerDown, false);
    },
    updateCheck() {
      this.path_w = 0;
      this.silder_l = 0;
      this.silder_img_l = 0;
      this.down_x = 0;
      this.up_x = 0;
      this.move_statu = false;
      this.status = 0;
      this.init();
    },
    listenerMove(e) {
      console.log("move", e);
      this.cancelDefault(e);
      this.up_x = this.isMobile ? e.touches[0].clientX : e.clientX;
      this.updateBox();
    },
    listenerDown(e) {
      let that = this;
      this.cancelDefault(e);
      this.move_statu = !this.move_statu;
      if (this.move_statu) {
        console.log("down", e);
        this.status = 0;
        this.down_x = this.isMobile ? e.touches[0].clientX : e.clientX;
        document
          .getElementById("_jigsaw_btn")
          .addEventListener(that.handle.move, that.listenerMove, false);
      } else {
        this.listenerUp(e);
      }
    },
    listenerUp(e) {
      let that = this;
      that.move_statu = true;
      console.log("up", e);
      document
        .getElementById("_jigsaw_btn")
        .removeEventListener(that.handle.move, that.listenerMove, false);
      document
        .getElementById("_jigsaw_btn")
        .removeEventListener(that.handle.end, that.listenerUp, false);
      document
        .getElementById("_jigsaw_btn")
        .removeEventListener(that.handle.start, that.listenerDown, false);
      this.asyncVerify().then(res=>{
        if (res) {
          that.status = 1;
          this.$emit("success");
          this.$emit("complete");
        } else {
          that.status = -1;
          this.$emit("fail");
          if(this.isErrorRefresh){
            setTimeout(()=>{
              that.updateCheck();
            },600)
          }else{
            this.$emit("complete");
          }
        }
      })
      
    },
    cancelDefault(e) {
      if (e && e.preventDefault) {
        e.preventDefault(); //阻止默认浏览器动作(W3C)
      } else {
        window.event.returnValue = false; //IE中阻止函数器默认动作的方式
      }
    },
    updateBox() {
      let that = this;
      let _path = that.up_x - that.down_x;
      let _box_w = document.getElementById("_jigsaw").offsetWidth;
      let _btn_w = document.getElementById("_jigsaw_btn").offsetWidth;
      let _silder_img_w = document.getElementById("_jigsaw_img").firstElementChild.offsetWidth;
      let _silder_img_btn_w = document.getElementById("_jigsaw_img_btn").firstElementChild.offsetWidth;
      if (_path >= 0 && _path <= _box_w - _btn_w) {
        this.path_w = (_path / _box_w) * 100;
        this.silder_l = (_path / _box_w) * 100;
        this.silder_img_l =(_path / (_box_w - _btn_w)) * 100 * (1 - _silder_img_btn_w / _silder_img_w);
      }
    },
    IsPC() {
      let userAgentInfo = navigator.userAgent;
      let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
      let flag = true;
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    asyncVerify(){
      let that=this;
      return new Promise((resolve, reject)=>{
        resolve(that.verify(that.silder_img_l))
      })
    }
  }
};
</script>
<style scoped>
.box {
  margin: auto;
}

.box ._jigsaw-img {
  position: relative;
  overflow: hidden;
  display: grid;
}
.box ._jigsaw-img > img {
  width: 100%;
}
.box ._jigsaw-img ._jigsaw-img-box {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: grid;
}
.box ._jigsaw-img ._jigsaw-img-box > img {
  height: 100%;
}

.box ._jigsaw-img ._jigsaw_update-btn {
  position: absolute;
  top: 0;
  right: 0;
  height: 35px;
  width: 35px;
  z-index: 3;
  background: rgba(0, 0, 0, 0.3) url(../assets/refresh.png) no-repeat center;
  background-size:60%;
  color: #fff;
}

.box ._jigsaw {
  position: relative;
  margin-top: 20px;
}

.box ._jigsaw-box {
  height: 40px;
  border: 1px solid #000;
  background-color: rgb(228, 228, 228);
}

.box ._jigsaw-btn--path {
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  width: 0;
  opacity: 0;
  border: 1px solid rgb(67, 159, 245);
  background-color: rgb(67, 159, 245, 0.2);
  border-right: 0;
}

.box ._jigsaw-btn--path.active {
  opacity: 1;
}

.box ._jigsaw-btn--path.success {
  opacity: 1;
  border-color: rgb(85, 241, 150);
  background-color: rgba(85, 241, 150, 0.2);
}

.box ._jigsaw-btn--path.error {
  opacity: 1;
  border-color: rgb(241, 85, 85);
  background-color: rgba(241, 85, 85, 0.2);
}

.box ._jigsaw-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  position: absolute;
  top: 0;
  left: 0;
  cursor: grab;
  cursor: -webkit-grab;
  background-color: #fff;
  font-size: 20px;
  line-height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 60%;
}
.box ._jigsaw-btn._jigsaw_quanyou{
  border: 1px solid rgb(67, 159, 245);
  background-color: rgb(67, 159, 245);
  background-image: url(../assets/right.png);
  background-size: 50%;
  color: #fff;
}
.box ._jigsaw-btn._jigsaw_success{
  border-color: rgb(81, 189, 126);
  background-color: rgb(81, 189, 126);
  color: #fff;
  background-image: url(../assets/success.png);
  background-size: 60%;
}
.box ._jigsaw-btn._jigsaw_error{
  border-color: rgb(241, 85, 85);
  background-color: rgb(241, 85, 85);
  background-image: url(../assets/error.png);
  background-size: 50%;
  color: #fff;
}
</style>
