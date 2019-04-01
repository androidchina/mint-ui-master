<template>
  <div>
    <!--<gheader :examplename="examplename"></gheader>-->
    <ul>
      <li><mt-button size="large" @click="ToastA">Toast111</mt-button></li>
      <li><mt-button size="large" @click="ToastB">Toast222</mt-button></li>
      <li><mt-button size="large" @click="ToastC">Toast333</mt-button></li>
    </ul>
    <!--<gfooter></gfooter>-->
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  export default {
    name: 'MyVue',
    data(){
      return {
        examplename: "MyVue"
      }
    },
    mounted(){

    },
    methods:{
      ToastA(){
        Toast('默认Toast');
      },
      ToastB(){
        Toast({
          message: '操作成功',
          iconClass: 'fa fa-check fa-2x'
        });
      },
      ToastC(){
        Toast({
          message: '自定义位置',
          position: 'bottom',
          duration: 5000
        });
      }
    }
  }
</script>
<style scoped>
  ul {
    padding-left: 10px;
    padding-top: 20px;
    padding-right: 10px;
  }
  li {
    margin: 20px 0;
  }
</style>

