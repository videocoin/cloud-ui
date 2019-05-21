import { wiretap, inspect } from 'mobx-wiretap/mst';
import UserStore from './user';
import ModalStore from './modal';
import PipelinesStore from './pipelines';

wiretap('VideoCoin Cloud');

inspect('UserStore', UserStore);
inspect('ModalStore', ModalStore);
inspect('PipelinesStore', PipelinesStore);
