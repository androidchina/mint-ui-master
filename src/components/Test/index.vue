<template>
  <div>
    <br/>
    <mt-button type="danger" @click="sendHelloToAndroid">发送Hello给Android</mt-button>
  </div>
</template>
<script>
export default {
  mounted(){
  },
  methods:{
    sendHelloToAndroid(){
      if(window.android!=null&&typeof(window.android)!="undefined"){
        window.android.callAndroid("Hello，Android! I'm JS.");
      }else{
        alert(typeof(window.android));
      }
    }
  }
}
</script>
