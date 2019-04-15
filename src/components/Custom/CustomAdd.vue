<template>
  <div>
    <mt-header title="新增客户">
      <router-link slot="left" to="/">
        <mt-button icon="back" @click="Back">返回</mt-button>
      </router-link>
      <router-link slot="right" to="/">
        <mt-button @click="Submit">提交</mt-button>
      </router-link>
    </mt-header>

    <div class="content">
      <mt-field class="title_blue" label="· 客户全称" placeholder="请输入客户全称"
                :attr="{maxlength: 50}"></mt-field>
      <mt-field label="· 简称" placeholder="请输入客户简称" :attr="{maxlength: 50}"></mt-field>
      <mt-field label="· 单位编号" placeholder="请输入客户单位编号" :attr="{maxlength: 50}"></mt-field>
      <div @click="customType">
        <mt-cell title="· 客户分类" class="title_blue" is-link>
          <span class="show_content">常规客户</span>
        </mt-cell>
      </div>
      <div>
        <mt-cell title="· 行业" class="title_blue" is-link>
          <span class="show_content"></span>
        </mt-cell>
      </div>
      <div>
        <mt-cell title="· 级别" class="title_blue" is-link>
          <span class="show_content"></span>
        </mt-cell>
      </div>
      <div>
        <mt-cell title="· 资质" class="title_blue" is-link>
          <span class="show_content"></span>
        </mt-cell>
      </div>
      <div>
        <mt-radio
                  title="单选框列表"
                  v-model="value1"
                  :options="options1">
        </mt-radio>
      </div>
    </div>
  </div>

</template>

<script>
  import {Toast, MessageBox} from 'mint-ui';

  export default {
    data() {
      return {
        value1: 'AAA',
      }
    },
    created() {
      this.options1 = ['选项A', '选项B', '选项C'];
    },
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
      customType() {
        const htmls = `
           <div>
           AAA
           </div>
        `;
        MessageBox.confirm('', {
          message: htmls,
          title: '客户分类',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirmButton',
          cancelButtonClass: 'cancelButton'
        }).then(action => {
          if (action == 'confirm') {
            console.log('abc');
          }
        }).catch(err => {
          if (err == 'cancel') {
            console.log('123');
          }
        });
      }
    }
  }
</script>

<style scoped>
  .content {
    margin-top: 10px;
    width: 100%;
    height: 100%;
  }

  .title_blue {
    color: #15AFF4;
  }

  .show_content {
    color: #000000;
  }

  .cancelButton {
    background: #959595 !important;
    width: 1.6rem !important;
    height: .6rem;
    color: #fff !important;
    border-radius: .05rem;
    border: none;
    margin: .2rem !important;
  }

  .confirmButton {
    background: #d9534f !important;
    width: 1.6rem !important;
    height: .6rem;
    color: #fff !important;
    border-radius: .05rem;
    border: none;
    margin: .2rem !important;
  }


</style>
