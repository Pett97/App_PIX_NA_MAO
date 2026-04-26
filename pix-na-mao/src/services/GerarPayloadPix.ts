function calcularCRC16(payload: string): string {
   let polinomio = 0x1021;
   let resultado = 0xffff;

   for (let i = 0; i < payload.length; i++) {
      resultado ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
         if ((resultado & 0x8000) !== 0) {
            resultado = (resultado << 1) ^ polinomio;
         } else {
            resultado <<= 1;
         }
         resultado &= 0xffff;
      }
   }

   return resultado.toString(16).toUpperCase().padStart(4, "0");
}


function removerAcentos(texto: string): string {
   return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 ]/g, "");
}

export default function gerarPayloadPix({ chavePix, nomeRecebedor, cidadeRecebedor, valor, txid }: { chavePix: string; nomeRecebedor: string; cidadeRecebedor: string; valor?: number; txid?: string; }): string {
   function montaCampo(id: string, valor: string): string {
      const tamanho = valor.length.toString().padStart(2, "0");
      return `${id}${tamanho}${valor}`;
   }

   const payloadFormatIndicator = montaCampo("00", "01");

   const merchantAccountInfo = montaCampo("26",montaCampo("00", "BR.GOV.BCB.PIX") +montaCampo("01", chavePix));

   const merchantCategoryCode = montaCampo("52", "0000");
   const transactionCurrency = montaCampo("53", "986");

   //bug zero auhauha
   const transactionAmount = valor !== undefined ? montaCampo("54", valor.toFixed(2)) : "";

   const countryCode = montaCampo("58", "BR");

   const merchantName = montaCampo("59", removerAcentos(nomeRecebedor).trim().substring(0, 25));

   const merchantCity = montaCampo("60", removerAcentos(cidadeRecebedor).trim().substring(0, 15));


   const txidFinal = txid || Date.now().toString();

   const additionalDataField = montaCampo("62",montaCampo("05", txidFinal));


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
      "6304";

   const crc16 = calcularCRC16(payloadSemCRC);

   return payloadSemCRC + crc16;
}