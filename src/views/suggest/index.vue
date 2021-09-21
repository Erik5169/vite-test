<template>
  <van-form @submit="onSubmit">
    <h5 class="question-title">反馈问题</h5>
    <div class="question-content-warp">
      <van-field
        class="content-field"
        v-model="content"
        name="content"
        rows="5"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请具体描述您遇到的问题，越详细越好（必填）"
        show-word-limit
      />
    </div>
    <div class="img-list-warp">
      <van-field class="upload-imgs" name="picImgs">
        <template #input>
          <van-uploader
            max-count="3"
            upload-icon="plus"
            v-model="picImgs"
            :deletable="false"
            :after-read="afterImgRead"
          >
            <template #preview-cover="file">
              <img
                width="20"
                height="20"
                class="img-delete-icon"
                src="~@/assets/icon/delete.png"
                @click.stop="handleImgDelete(file)"
              />
            </template>
          </van-uploader>
        </template>
      </van-field>
      <div class="img-desc">添加截图可以更清楚的说明问题哦</div>
    </div>
    <van-field
      class="phone-field-warp"
      v-model="mobilephone"
      name="mobilephone"
      center
      clearable
      type="tel"
      label="手机号"
      maxlength="11"
      placeholder="请输入手机号"
    />

    <div class="submit-btn-warp">
      <van-button
        class="submit-btn"
        round
        block
        type="primary"
        color="linear-gradient(270deg,#31bacb, #31cb93)"
        native-type="submit"
      >
        立即提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { sendUserSuggest } from '@/api/service/suggest';
import { Toast } from 'vant';
import { isMobile } from '@/utils/validate/mobile';
// import http from '@/utils/http/axios';
import { storage } from '@/utils/storage';

import axios from 'axios';
export default defineComponent({
  name: 'SuggestMain',
  components: {},
  setup() {
    const state = reactive({
      content: '',
      picImgs: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
      mobilephone: '',
      code: '',
      loading: false,
      autoLogin: true,
      formInline: {
        account: 'admin',
        password: '123456',
        isCaptcha: false
      }
    });
    const handleImgDelete = (file: any) => {
      state.picImgs.splice(file.index, 1);
    };
    const afterImgRead = async (file: any) => {
      // 此时可以自行将文件上传至服务器
      const formData = new FormData();
      formData.append('files', file.file);
      file.status = 'uploading';
      file.message = '上传中...';
      const { data } = await axios.post(
        'http://api-test.xiaokaqianbao.com/jnis-back/fileOrImage/putPicNew',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8'
          }
        }
      );
      if (data.status == 5200) {
        file.url = data.data;
        file.status = 'success';
      } else {
        file.status = 'failed';
        file.message = '上传失败';
      }
    };
    const formVertify = () => {
      if (!state.content) {
        Toast('请描述您的问题');
        return false;
      }
      if (!state.mobilephone.trim()) {
        Toast('请输入您的手机号码');
        return false;
      }
      if (!isMobile(state.mobilephone)) {
        Toast('请输入正确的手机号码');
        return false;
      }
      return true;
    };

    const onSubmit = async (values: any) => {
      if (!formVertify()) {
        return;
      }
      values.system = 1;
      values.platform = 0;
      values.channel = storage.get('CHANNEL');
      values.appVersion = storage.get('VERSION');
      values.pics = [];
      state.picImgs.forEach((item: any) => {
        values.pics.push(item.url);
      });
      values.deviceCode = storage.get('OAID');
      try {
        await sendUserSuggest(values);
        Toast('提交成功啦， 我们会尽快联系您！');
      } catch (error) {
        console.log(error);
      }
    };
    return {
      ...toRefs(state),
      handleImgDelete,
      afterImgRead,
      formVertify,
      onSubmit
    };
  }
});
</script>

<style lang="less" scoped>
.question-title {
  padding: 16px;
  font-size: 17px;
  color: #333333;
  height: 20px;
  line-height: 20px;
}
.question-list-warp {
  .custom-field {
    padding: 0 16px;
  }
  .van-cell::after {
    border-bottom: none;
  }
}

.question-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  text-align: center;
  color: #666666;
  line-height: 18px;
  .question-item {
    display: block;
    width: 105px;
    height: 36px;
    line-height: 36px;
    background: #f5f6f8;
    border-radius: 4px;
    margin-bottom: 12px;
  }
}
.question-content-warp {
  padding: 0 16px;
  .van-cell::after {
    border-bottom: none;
  }
  .content-field {
    border-radius: 8px;
    background-color: #f5f6f8;
  }
}

.img-list-warp {
  .van-cell::after {
    border-bottom: none;
  }
  .upload-imgs {
    :deep(.van-uploader__wrapper) {
      flex-wrap: nowrap;
      .van-uploader__preview {
        border-radius: 8px;
        overflow: hidden;
        margin: 0 14px 10px 0;
        .van-uploader__preview-image {
          width: 105px;
          height: 105px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }

    :deep(.van-uploader__upload) {
      width: 105px;
      height: 105px;
      border-radius: 8px;
      margin: 0;
      .van-uploader__upload-icon {
        font-size: 48px;
        color: #999;
      }
    }
    .img-delete-icon {
      position: absolute;
      right: 0;
    }
  }
  .img-desc {
    height: 15px;
    padding: 0 16px;
    line-height: 15px;
    font-size: 12px;
    text-align: left;
    color: #999999;
  }
}

.phone-field-warp {
  margin-top: 12px;
  .code-btn {
    border: none;
    font-size: 15px;
  }
}

.submit-btn-warp {
  margin: 48px 16px 16px;
  .submit-btn {
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
