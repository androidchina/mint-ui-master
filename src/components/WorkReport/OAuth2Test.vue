<template>

  <div>
    <div class="box1">code:</div>
    <div class="box2">{{code}}</div>

    <div class="box1">access_token:</div>
    <div class="box2">{{access_token}}</div>

    <div class="box1">UserId:</div>
    <div class="box2">{{UserId}}</div>

    <div class="box1">log:</div>
    <div class="box2">{{log}}</div>

    <div class="box1">error:</div>
    <div class="box2">{{error}}</div>

   </div>

</template>
<script>
    export default {
      data (){
        return {
          corpid:'wx929778b408b6434b',
          corpsecret:'wUM3_Cu8Wa88pL1oUEHzqUgYrEbf8Yb8B5m0kD4v3Lw',
          code:'',
          access_token:'',
          UserId:'',
          log:'',
          error:'',

        }
      },
      created: function() {
        this.code = this.GetUrlParam("code");
        // 获取token
        this.getToken();

      },
      methods: {
        //paraName 等找参数的名称
        GetUrlParam(paraName){
          let url = document.location.toString();
          let arrObj = url.split("?");
          if (arrObj.length > 1) {
            let arrPara = arrObj[1].split("&");
            let arr;
            for (let i = 0; i < arrPara.length; i++) {
              arr = arrPara[i].split("=");
              if (arr != null && arr[0] === paraName) {
                return arr[1];
              }
            }
            return "";
          }
          else {
            return "";
          }
        },

        getToken(){

          this.axios({
            method:'get',
            //url:'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
            url:'/api',
            params: {
              corpid: 'wx929778b408b6434b',
              corpsecret: 'wUM3_Cu8Wa88pL1oUEHzqUgYrEbf8Yb8B5m0kD4v3Lw',
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response) =>{          //这里使用了ES6的语法
            console.log(response.data);       //请求成功返回的数据
            this.log = response.data;
            this.access_token = response.data.access_token;
            this.getUserId();
          }).catch((error) =>{
            this.error = error;
            console.log("error = " + error);       //请求失败返回的数据
          })
        },

        getUserId(){
          this.axios({
            method:'get',
            url:'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo',
            params: {
              access_token: this.access_token,
              code: this.code
            },
          }).then((response) =>{          //这里使用了ES6的语法
            console.log(response.data);       //请求成功返回的数据
            this.UserId = response.data.UserId;
          }).catch((error) =>{
            console.log("error = " + error);       //请求失败返回的数据
          })
        }
      }
    }
</script>

<style scoped>
  .box1 {
    margin-top: 20px;
    font-size: 13px;
  }
  .box2 {
    font-size: 13px;
    color: red;
  }
</style>
