/* eslint-disable @typescript-eslint/camelcase */
import Centrifuge from 'centrifuge';
import { eq } from 'lodash/fp';
import PipelinesStore from 'stores/pipelines';
import { WS_URL } from 'const';

const events = {
  PIPELINE_UPDATE: 'pipeline/update',
  PIPELINE_STREAM: 'pipeline/stream',
};

const initSocket = (id: string) => {
  const token = localStorage.getItem('token');
  const host =
    process.env.NODE_ENV === 'production' ? window.location.hostname : WS_URL;
  const centrifuge = new Centrifuge(`wss://ws.${host}/connection/websocket`);

  centrifuge.setToken(token);
  centrifuge.subscribe(`users#${id}`, ({ data }: any) => {
    const { event } = data;

    if (eq(event, events.PIPELINE_UPDATE)) {
      const { pipelines } = PipelinesStore;
      const { pipeline_id, status } = data;
      const pipeline = pipelines.get(pipeline_id);

      pipeline.updateStatus(status);
    }
    if (eq(event, events.PIPELINE_STREAM)) {
      const { pipelines } = PipelinesStore;
      const { pipeline_id, message } = data;
      const pipeline = pipelines.get(pipeline_id);

      pipeline.updateLog(message);
    }
  });
  centrifuge.connect();
};

export default initSocket;
