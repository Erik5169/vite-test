<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
// import { useRouter } from 'vue-router';
import { getRequestUrlParams } from '@/utils/urlUtils';
import { storage } from '@/utils/storage';

export default defineComponent({
  name: 'App',
  components: {
    // HelloWorld
  },
  setup() {
    onBeforeMount(() => {
      const { channel, wifiType, version, oaid } = getRequestUrlParams(
        window.location.search
      );
      const appList: any = { channel, wifiType, version, oaid };
      for (const key in appList) {
        if (!appList[key]) {
          continue;
        }
        storage.set(key, appList[key]);
      }
    });
    return {};
  }
});
</script>
