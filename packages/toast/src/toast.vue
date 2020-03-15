<template>
  <div
    class="lv-toast"
    v-show="visible"
  >
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'LVToast',
  data(){
    return{
      visible: false,
      message: ""
    }
  },
  methods:{
    show(message="这是一个提示弹窗", duration = 1500)
    {
      this.visible=true;
      this.message=message;
      setTimeout(()=>{
        this.visible = false
      },duration)
    }
  }
}
</script>
<style lang="scss" scoped>
.lv-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 8px;
    z-index: 999;
    color: #fff;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 10px;
}
</style>