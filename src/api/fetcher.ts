import api from 'api/index';
import { AxiosResponse } from 'axios';

const fetcher = async function <T extends any>(...args: any[]) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const res: AxiosResponse<T> = await api(...args);
  return res.data;
};

export default fetcher;
