import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { vantPlugins } from './plugins/vant';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import './assets/styles/index.less';

import vConsole from 'vconsole';
// if (process.env.VUE_APP_ENV != 'production') {
// }
const vc: any = new vConsole();
const app = createApp(App);

app.use(vc);

dayjs.locale('zh-ch');
app.config.globalProperties.$dayjs = dayjs;
app.use(router);
app.use(vantPlugins).mount('#app');
