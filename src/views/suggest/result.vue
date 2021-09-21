<template>
  <div class="result-info">
    <van-icon color="#ED3E3D" size="64" name="checked" />
    <p class="result-title">提交成功</p>
  </div>
  <div class="result-desc">
    <p>您的反馈已收到，我们将在 24 小时内以短信的方式反馈结果。</p>
    <br />
    <p>
      为了更好的处理您的疑问，也可以下载app咨询在线客服，如果您已经下载了app，请在“我的—在线客服”中进行咨询
    </p>
    <br />
    <p>感谢您的理解与支持！</p>
  </div>
  <div class="back-btn-warp">
    <van-button
      class="back-btn"
      block
      type="primary"
      color="#ED3E3D"
      native-type="submit"
    >
      返回
    </van-button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SuggestResult'
};
</script>

<style lang="less" scoped>
.result-info {
  padding-top: 48px;
  text-align: center;
  .result-title {
    padding: 20px;
    height: 24px;
    font-size: 20px;
    text-align: center;
    color: #333333;
    line-height: 24px;
  }
}
.result-desc {
  padding: 16px;
  font-size: 15px;
  text-align: left;
  color: #999999;
  line-height: 21px;
}
.back-btn-warp {
  margin: 32px 16px;
  .back-btn {
    border-radius: 6px;
  }
}
</style>
