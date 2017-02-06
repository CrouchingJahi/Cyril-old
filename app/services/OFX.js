import * as fs from 'fs';
import * as ofx from 'ofx';
import { Transaction } from './DBC';

export default class OFXParser {
  static dateOf(datestring) {
    let year = parseInt(datestring.slice(0, 4)),
        month = parseInt(datestring.slice(4, 6) - 1),
        day = parseInt(datestring.slice(6, 8)),
        hour = parseInt(datestring.slice(8, 10)),
        minute = parseInt(datestring.slice(10, 12)),
        second = parseInt(datestring.slice(12, 14));
    
    return new Date(year, month, day, hour, minute, second);
  }
  //TODO There are multiple types of accounts in the OFX format. Somehow, a way will be needed to check CREDITCARDMSGSRSV1, or BANKMSGSRSV1, etc. for info
  static parseFile(file) {
    var data = ofx.parse(file.toString());
    let transactions = data.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN
      .filter(trn => parseFloat(trn.TRNAMT) < 0)
      .map(trn => new Transaction({
        id: trn.FITID,
        name: trn.NAME,
        memo: trn.MEMO,
        date: OFXParser.dateOf(trn.DTPOSTED),
        type: trn.TRNTYPE,
        amount: Math.abs(parseFloat(trn.TRNAMT))
      }));

    return {
      bank: data.OFX.SIGNONMSGSRSV1.SONRS.FI.ORG,
      fid: data.OFX.SIGNONMSGSRSV1.SONRS.FI.FID,
      account: data.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.CCACCTFROM.ACCTID,
      startDate: OFXParser.dateOf(data.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.DTSTART),
      endDate: OFXParser.dateOf(data.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.DTEND),
      transactions: transactions
    };
  }
}

module.exports = OFXParser;
