// plugins/vant.ts

import { App as VM } from 'vue';
import {
  Button,
  Icon,
  Image,
  List,
  Cell,
  NoticeBar,
  Form,
  Field,
  Uploader,
  CellGroup,
  Toast,
  Dialog
} from 'vant';

const plugins = [
  Button,
  Icon,
  Image,
  List,
  Cell,
  NoticeBar,
  Form,
  Field,
  Uploader,
  CellGroup,
  Toast,
  Dialog
];

export const vantPlugins = {
  install: function (vm: VM): void {
    plugins.forEach(item => {
      vm.component(item.name, item);
    });
  }
};
