/* eslint-disable @typescript-eslint/camelcase */
import Centrifuge from 'centrifuge';
import { eq } from 'lodash/fp';
import PipelinesStore from 'stores/pipelines';

const events = {
  PIPELINE_UPDATE: 'pipeline/update',
};

const initSocket = (id: string) => {
  const token = localStorage.getItem('token');
  const centrifuge = new Centrifuge(
    `wss://ws.thor.videocoin.network/connection/websocket`,
  );

  centrifuge.setToken(token);
  centrifuge.subscribe(`users#${id}`, ({ data }: any) => {
    const { event } = data;

    if (eq(event, events.PIPELINE_UPDATE)) {
      const { pipelines } = PipelinesStore;
      const { pipeline_id, status } = data;
      const pipeline = pipelines.get(pipeline_id);

      pipeline.updateStatus(status);
    }
  });
  centrifuge.connect();
};

export default initSocket;
