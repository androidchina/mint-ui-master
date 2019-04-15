<template>
  <div>
    <mt-header title="全部报告▼">
      <router-link slot="left" to="/">
        <mt-button icon="back" @click="Back">返回</mt-button>
      </router-link>
      <router-link slot="right" to="/">
        <mt-button @click="Submit">新增</mt-button>
      </router-link>
    </mt-header>
    <div class="filter">
      <div class="div_filter" @click="filter_1">最新创建</div>
      <div class="div_line_1"></div>
      <div class="div_filter" @click="filter_2">筛选</div>
      <div class="div_line_2"></div>
    </div>

    <div class="div_list">内容</div>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    methods: {
      Back() {
        Toast('返回');
      },
      Submit() {
        Toast({
          message: '提交成功',
          iconClass: 'fa fa-check fa-2x'
        });
      },
      filter_1() {
        Toast('最新创建');
      },
      filter_2() {
        Toast('筛选');
      },
    }
  }
</script>

<style scoped>
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
    height: 400px;
    margin-top: 10px;
    background-color: white;
  }

</style>
