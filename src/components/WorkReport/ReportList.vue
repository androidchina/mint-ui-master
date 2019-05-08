<template>
  <div>
    <mt-header title="全部报告▼">
      <router-link slot="left" to="">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>
      <router-link slot="right" to="">
        <mt-button @click="popup1">新增</mt-button>
      </router-link>
    </mt-header>
    <div class="filter">
      <div class="div_filter" @click="popup2(1)">最新创建</div>
      <div class="div_line_1"></div>
      <div class="div_filter" @click="popup3">筛选</div>
      <div class="div_line_2"></div>
    </div>

    <div class="div_list">
      <mt-cell title="点击进入日报详情" is-link to="/ReportDetail?report_id=b19748c16a419aeaa4bcf2276e8ba7a3a8c99a9b14d993f508671457eb4b946553556ce69766de207eeedd63f69db199748b15d638507c2fc7310b7d239fa77cfb640f73532a40bc51d38ade956e4b0c895143dcab20a93bd69b369c67e7ab046ad79e4896cabd7d45c4d2962c96a99514f7e4c17f07300fb9ecd0275ad01690"></mt-cell>
      <mt-cell title="点击进入周报详情" is-link to="/ReportDetail?report_id=63969bb7961e1e4e170a88d42ca8eafebab8842660f18a34ca162cf75f3bc9a0365cf3f1a1c2fd74a40e8986a343f7394c512deebee812ea0d7cf6ec8a273f0e24beae2b09b6ba1609240bcc2caa2c440a2d277291dc6b1fd231eeeb72171d5f4d5badf1eb44a103b4db93472ea7fcd6a700e94ab8b43bca0398d9087efb3f5d"></mt-cell>
      <mt-cell title="点击进入月报详情" is-link to="/ReportDetail?report_id=ce3f9be9703a7e9e3137ead430ae6d670c2b3328311964121640d7c6857f28f773faaa225f0cf638c9c60addca4c9804983afcb8f42f7bcfdd1dd554b5030823517f3b9ab1177be572f99383f2cfdad4dff1a1adb90018cb77ea903e2eaf232ec2c11cc6a12c463ee8c70a6a6a86d758110a73504eca068547867e0d2ccb2eff"></mt-cell>

      <mt-cell title="跳转到错误页面" is-link to="/ErrorPage"></mt-cell>

    </div>

    <div>
      <h1>Test1</h1>
      <h3>Test3</h3>
    </div>

    <mt-popup
      v-model="popupVisible1"
      popup-transition="popup-fade"
      class="mint_popup_1">
      <div class="popup_1_box1" @click="addReport(1)">日报</div>
      <div class="popup_1_box1" @click="addReport(2)">周报</div>
      <div class="popup_1_box2"@click="addReport(3)">月报</div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible2"
      position="center"
      popup-transition="popup-fade"
      class="mint_popup_1">
      <div class="popup_1_box1" @click="sort(1)">最新创建</div>
      <div class="popup_1_box2" @click="sort(2)">最近时间</div>
    </mt-popup>

    <mt-popup
    v-model="popupVisible3"
    position="bottom"
    popup-transition="popup-fade"
    class="mint_popup_2">
      <div>筛选</div>
    </mt-popup>

  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    data(){
      return {
        popupVisible1: false,
        popupVisible2: false,
        popupVisible3: false
      }
    },
    methods: {
      back() {
        Toast('返回');
      },
      popup1 () {
        this.popupVisible1 = true;
      },
      popup2 () {
        this.popupVisible2 = true;
      },
      popup3 () {
        this.popupVisible3 = true;
      },
      addReport(type) {
        if (type === 1) {
          Toast("新增日报");
        } else if (type === 2) {
          Toast("新增周报");
        } else {
          Toast("新增月报");
        }
        this.popupVisible1 = false;
      },
      sort(type) {
        if (type === 1) {
          Toast("最新创建");
        } else {
          Toast("最近时间");
        }
        this.popupVisible2 = false;
      },
      title() {
        Toast("标题");
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/style.css";
  .filter {
    background-color: white;
    width: 100%;
    height: 35px;
  }
  .div_filter {
    float:left;
    width:49%;
    height: 35px;
    font-size: 14px;
    text-align:center;
    line-height:35px;
  }
  .div_line_1 {
    float:left;
    width:1px;
    height: 25px;
    background-color: #eeeeee;
    line-height:20px;
    margin-top: 5px;
  }
  .div_line_2 {
    float:left;
    width: 100%;
    height: 1px;
    background-color: #eeeeee;
  }
  .div_list {
    width: 100%;
    background-color: white;
  }


  /*.mint_popup_1:before {
    display: inline-block;
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 8px;
    border-bottom-color: #fff;
    content: "";
    position: absolute;
    top: -15px;
    right: 10px;
  }
  .mint_popup_1 {
    width: 60px;
    border-radius: 8px;
    margin-top: 48px;
    transform: translate(190%);
  }*/

  .mint_popup_1 {
    width: 100px;
    border-radius: 8px;
  }

  .popup_1_box1 {
    width: 100px;
    text-align: center;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom:solid 1px #eeeeee;
  }
  .popup_1_box2 {
    width: 100px;
    text-align: center;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .mint_popup_2 {
    width: 100%;
    height: 200px;
  }
</style>
