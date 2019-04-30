<template>
  <div>
    <mt-header title="日报">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="report_title">
      <div class="user_name">员工1</div>
      <div class="report_time">2019-04-17</div>
      <div class="report_type">日报</div>
    </div>

    <div class="box-wrap">
      <div class="box_line">
        <div class="box_title">上门拜访</div>
        <div class="box_content">3</div>
      </div>
      <div class="box_line">
        <div class="box_title">电话拜访</div>
        <div class="box_content">3</div>
      </div>
      <div>
        <div class="box_title">新增客户数</div>
        <div class="box_content">3</div>
      </div>
      <div class="box_line">
        <div class="box_title">费用</div>
        <div class="box_content">3</div>
      </div>
      <div class="box_line">
        <div class="box_title">回款金额</div>
        <div class="box_content">3</div>
      </div>
      <div>
        <div class="box_title">新增销售</div>
        <div class="box_content">3</div>
      </div>
    </div>

    <div class="title_blue">本月总结</div>
    <div class="report_content">去客户公司卖全站仪</div>

    <div class="title_blue">问题反馈</div>
    <div class="report_content">客户还有意向购买10台无人机</div>

    <div class="title_blue">明日计划</div>
    <div class="report_content">去拜访广东省国土资源测绘院</div>

    <div class="place_holder"></div>

    <mt-cell title="标题文字" value="说明文字" class="cell"></mt-cell>


  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    mounted: function () {
      this.showMsg();
    },
    methods: {
      showMsg() {
        Toast('工作报告详情');
      }
    }
  }
</script>

<style scoped>
  .report_title {
    width: 100%;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    border-bottom:solid 1px #eeeeee;
  }
  .user_name {
    margin-left: 10px;
    display:inline;
    float: left;
  }
  .report_time {
    margin:0 auto;
    display:inline;
  }
  .report_type {
    float:right;
    display:inline;
    margin-right: 10px;
  }
  .box-wrap {
    text-align: center;
    overflow: hidden;
  }
  .box-wrap>div {
    width: 33.3%;
    border-bottom: solid 1px #eeeeee;
    float: left;
  }
  .box_line {
    border-right: solid 1px #eeeeee;
  }
  .box_title {
    font-size: 14px;
    color: #878787;
    margin-top: 5px;
  }
  .box_content {
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .title_blue {
    font-size: 14px;
    color: #15aff4;
    background-color: #eef1f3;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .report_content {
    font-size: 14px;
    margin: 10px;
  }
  .place_holder {
    height: 15px;
    background-color: #eef1f3;
  }
  .report_send {
    color: #878787;
    font-size: 12px;
    min-height: 30px;

  }
  .cell {
    box-sizing: border-box;
    color: #878787;
    min-height: 40px;
    display: block;
    overflow: hidden;
    position: relative;
    text-decoration: none;
  }
</style>
