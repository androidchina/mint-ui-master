<template>
  <div>
    <br/>
    <mt-button type="danger" @click="sendHelloToAndroid">发送Hello给Android</mt-button>
    <br/>
    <br/>
    <br/>
    <mt-button type="primary" @click="login">登录</mt-button>
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
    },
    login(){
      /*this.axios.post("Member/VersionCode", qs.stringify({'mplatform':'1'}))
        .then(function(response){
          console.info(response.data);
        })
        .catch(function(error){
          console.info(error);
        }.bind(this))*/
      this.axios.get("/db")
        .then(function(response){
          console.info(response.data);
        })
        .catch(function(error){
          console.info(error);
        });
    }
  }
}
</script>
