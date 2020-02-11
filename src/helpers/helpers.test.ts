import { VIDBalance, convertToWEI } from './convertBalance';

describe('Helpers tests', () => {
  it('Should correct convert WEI to VID with truncate', () => {
    const wei = '2394003896099999999907';
    const expected = '2394.0038';

    expect(VIDBalance(wei)).toBe(expected);
  });
  it('Should correct convert VID to WEI', () => {
    const vid = '2394.0038';
    const expected = '2.3940038e+21';

    expect(convertToWEI(vid)).toBe(expected);
  });
});
