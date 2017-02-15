import OFX from '../../app/services/OFX';
import { MockQFX } from '../data/QFX';

describe('The OFX module', () => {
  describe('static parseFile function', () => {
    it('gathers info about the account', () => {
      OFX.parseFile(MockQFX, parsed => {
        expect(typeof parsed).toBe('object');
        expect(parsed.bank).toBe('U.S. Bank');
        expect(parsed.fid).toBe('1402');
        expect(parsed.account).toBe('unittest');
        expect(parsed.startDate).toEqual(new Date('2016-11-01 5:00:00'));
        expect(parsed.endDate).toEqual(new Date('2016-12-14 6:00:00'));
        let t = parsed.transactions;
        expect(t.length).toBe(3);
        expect(t[0].id).toBe('20161102234836346617');
        expect(t[0].amount).toBe(9.45);
        expect(t[1].id).toBe('20161102234836346626');
        expect(t[1].amount).toBe(3.00);
        expect(t[2].id).toBe('20161104000837429344');
        expect(t[2].amount).toBe(4.91);
      });
    });
  });
});
