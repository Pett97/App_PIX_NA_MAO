
//validar o PIX n teve alteração tirado da web 
function calcularCRC16(payload: string): string {
   let polinomio = 0x1021;
   let resultado = 0xFFFF;

   for (let i = 0; i < payload.length; i++) {
      resultado ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
         if ((resultado & 0x8000) !== 0) {
            resultado = (resultado << 1) ^ polinomio;
         } else {
            resultado <<= 1;
         }
         resultado &= 0xFFFF;
      }
   }
   return resultado.toString(16).toUpperCase().padStart(4, '0');
}

export default function gerarPayloadPix({
   chavePix,
   nomeRecebedor,
   cidadeRecebedor,
   valor,
   infoAdicional = ''
}: {
   chavePix: string;
   nomeRecebedor: string;
   cidadeRecebedor: string;
   valor: number;
   infoAdicional?: string;
}): string {

   function montaCampo(id: string, valor: string): string {
      const tamanho = valor.length.toString().padStart(2, '0');
      return `${id}${tamanho}${valor}`;
   }

   const payloadFormatIndicator = montaCampo('00', '01');

   const merchantAccountInfo = montaCampo('26',
      montaCampo('00', 'BR.GOV.BCB.PIX') +
      montaCampo('01', chavePix) +
      (infoAdicional ? montaCampo('02', infoAdicional) : '')
   );

   const merchantCategoryCode = montaCampo('52', '0000');
   const transactionCurrency = montaCampo('53', '986'); // Real brasileiro
   const transactionAmount = valor ? montaCampo('54', valor.toFixed(2)) : '';
   const countryCode = montaCampo('58', 'BR');
   const merchantName = montaCampo('59', nomeRecebedor.substring(0, 25));
   const merchantCity = montaCampo('60', cidadeRecebedor.substring(0, 15));
   const additionalDataField = montaCampo('62', montaCampo('05', '***'));

   // Monta payload sem CRC
   const payloadSemCRC =
      payloadFormatIndicator +
      merchantAccountInfo +
      merchantCategoryCode +
      transactionCurrency +
      transactionAmount +
      countryCode +
      merchantName +
      merchantCity +
      additionalDataField +
      '6304';

   const crc16 = calcularCRC16(payloadSemCRC);

   return payloadSemCRC + crc16;
}
