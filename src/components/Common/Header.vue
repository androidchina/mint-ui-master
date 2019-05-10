<template>
    <div class="globle_head">
      <img class="title_back" src="../../assets/img/title_back.png" alt="" @click="title_back"/>
      <span class="title_name" @click="name_click">{{title_name}}</span>
      <span class="title_btn" @click="btn_click" v-if="btnIsShow">{{title_btn_string}}</span>
      <img class="title_add" src="../../assets/img/title_add.png" alt="" @click="add" v-if="addIsShow"/>
      <img class="title_search" src="../../assets/img/title_search.png" alt="" @click="search" v-if="searchIsShow"/>
      <img class="custom_share" src="../../assets/img/custom_share.png" alt="" @click="share" v-if="shareIsShow"/>

    </div>

</template>

<script>
  export default {
      name: "Header",
      props: {
        title_name: {
          type: String,
          default: '标题'
        },
        title_btn_string: {
          type: String,
          default: '提交'
        },
        btnIsShow: {
          type: Boolean,
          default: true
        },
        addIsShow: {
          type: Boolean,
          default: false
        },
        searchIsShow: {
          type: Boolean,
          default: false
        },
        shareIsShow: {
          type: Boolean,
          default: false
        },
      },

      methods: {
        title_back() {
          this.$router.go(-1);
        },
        name_click() {
          this.$parent.name_click();
        },
        btn_click() {
          this.$parent.btn_click();
        },
        add() {
          this.$parent.add();
        },
        search() {
          this.$parent.search();
        },
        share() {
          this.$parent.share();
        },
      }
  }
</script>

<style scoped>

  .globle_head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    z-index: 1000;
    background: #26a2ff;
    text-align: center;
  }

  .title_back {
    display: inline-block;
    float: left;
    width: 20px;
    height: 20px;
    margin-left: 8px;
    margin-top: 10px;
  }
  .title_name {
    display: inline-block;
    line-height: 40px;
    font-size: 15px;
    color: white;
  }
   .title_btn {
    display: inline-block;
    line-height: 40px;
    float: right;
    margin-right: 8px;
    font-size: 13px;
    color: white;
  }
  .title_add {
    display: inline-block;
    float: right;
    width: 20px;
    height: 20px;
    margin-top: 10px;
    margin-right: 8px;
  }
  .title_search {
    display: inline-block;
    float: right;
    width: 20px;
    height: 20px;
    margin-top: 10px;
    margin-right: 8px;
  }
  .custom_share {
    display: inline-block;
    float: right;
    width: 20px;
    height: 20px;
    margin-top: 10px;
    margin-right: 8px;
  }

</style>
