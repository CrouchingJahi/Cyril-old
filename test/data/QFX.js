export const MockQFX = `
OFXHEADER:100
DATA:OFXSGML
VERSION:102
SECURITY:NONE
ENCODING:USASCII
CHARSET:1252
COMPRESSION:NONE
OLDFILEUID:NONE
NEWFILEUID:NONE

<OFX>
	<SIGNONMSGSRSV1>
		<SONRS>
			<STATUS>
				<CODE>0
				<SEVERITY>INFO
			</STATUS>
			<DTSERVER>20161215034835.170
			<LANGUAGE>ENG
			<DTPROFUP>20050531050000.000
			<FI>
				<ORG>U.S. Bank
				<FID>1402
			</FI>
			<INTU.BID>1402
		</SONRS>
	</SIGNONMSGSRSV1>
	<CREDITCARDMSGSRSV1>
		<CCSTMTTRNRS>
			<TRNUID>0
			<STATUS>
				<CODE>0
				<SEVERITY>INFO
			</STATUS>
			<CCSTMTRS>
				<CURDEF>USD
				<CCACCTFROM>
					<ACCTID>unittest
				</CCACCTFROM>
				<BANKTRANLIST>
					<DTSTART>20161101050000.000
					<DTEND>20161214060000.000
					<STMTTRN>
						<TRNTYPE>DEBIT
						<DTPOSTED>20161102120000.000
						<TRNAMT>-9.45
						<FITID>20161102234836346617
						<NAME>A AND F WEXNER51223097 NEW ALBAN
						<MEMO>24164076306937331457685; 05814; ; 
					</STMTTRN>
					<STMTTRN>
						<TRNTYPE>DEBIT
						<DTPOSTED>20161102120000.000
						<TRNAMT>-3.00
						<FITID>20161102234836346626
						<NAME>A AND F WEXNER51223097 NEW ALBAN
						<MEMO>24164076306937331466124; 05814; ; 
					</STMTTRN>
					<STMTTRN>
						<TRNTYPE>DEBIT
						<DTPOSTED>20161103120000.000
						<TRNAMT>-4.91
						<FITID>20161104000837429344
						<NAME>THE HOME DEPOT #3831 DUBLIN OH
						<MEMO>24610436307010187494585; 05200; ; 
					</STMTTRN>
				</BANKTRANLIST>
				<LEDGERBAL>
					<BALAMT>-490.90
					<DTASOF>20161215034835.170
				</LEDGERBAL>
				<AVAILBAL>
					<BALAMT>0.00
					<DTASOF>20161215034835.170
				</AVAILBAL>
			</CCSTMTRS>
		</CCSTMTTRNRS>
	</CREDITCARDMSGSRSV1>
</OFX>
`;
