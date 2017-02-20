import { Transaction } from './DBC';
import { Parser as XMLParser } from 'xml2js';

function sgml2Xml(sgml) {
  return sgml
    .replace(/>\s+</g, '><') // whitespace between tag close/open
    .replace(/\s+</g, '<')   // whitespace before a close tag
    .replace(/>\s+/g, '>')   // whitespace after a close tag
    .replace(/<([A-Z0-9_]*)+\.+([A-Z0-9_]*)>([^<]+)/g, '<\$1\$2>\$3')
    .replace(/<(\w+?)>([^<]+)/g, '<\$1>\$2</\$1>');
}

function parse(file, cb) {
  var parser = new XMLParser({explicitArray: false});
  var content = '<OFX>' + file.split('<OFX>', 2)[1];

  parser.parseString(sgml2Xml(content), (err, result) => {
    cb(result);
  });
}

export default class Parser {
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
  static parseFile(file, cb) {
    parse(file, data => {
      let transactions = data.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN
      .filter(trn => parseFloat(trn.TRNAMT) < 0)
      .map(trn => new Transaction({
        id: trn.FITID,
        name: trn.NAME,
        memo: trn.MEMO,
        date: Parser.dateOf(trn.DTPOSTED),
        type: trn.TRNTYPE,
        amount: Math.abs(parseFloat(trn.TRNAMT))
      }));

      cb({
        bank: data.OFX.SIGNONMSGSRSV1.SONRS.FI.ORG,
        fid: data.OFX.SIGNONMSGSRSV1.SONRS.FI.FID,
        account: data.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.CCACCTFROM.ACCTID,
        startDate: Parser.dateOf(data.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.DTSTART),
        endDate: Parser.dateOf(data.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.DTEND),
        transactions: transactions
      });
    });
  }
}

module.exports = Parser;
