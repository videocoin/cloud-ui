// easier to merge objects
// cannot require axios, otherwise it recursively mocks
import MockAdapter from 'axios-mock-adapter';
import { assignIn } from 'lodash/fp';

const axios = jest.requireActual('axios');

jest.unmock('axios');

const mockAxios = new MockAdapter(axios);

export default assignIn(axios, mockAxios);
