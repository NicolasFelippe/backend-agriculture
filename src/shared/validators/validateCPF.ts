export function validarCPF(cpf: string): boolean {
   // Remove caracteres não numéricos
   cpf = cpf.replace(/\D/g, '');

   // Verifica se o CPF tem 11 dígitos
   if (cpf.length !== 11) {
     return false;
   }
 
   // Verifica se todos os dígitos são iguais
   const cpfArray = cpf.split('');
   if (cpfArray.every(digit => digit === cpfArray[0])) {
     return false;
   }
 
   // Calcula o primeiro dígito verificador
   let soma = 0;
   for (let i = 0; i < 9; i++) {
     soma += parseInt(cpfArray[i]) * (10 - i);
   }
   let digito1 = 11 - (soma % 11);
   if (digito1 > 9) {
     digito1 = 0;
   }
 
   // Calcula o segundo dígito verificador
   soma = 0;
   for (let i = 0; i < 10; i++) {
     soma += parseInt(cpfArray[i]) * (11 - i);
   }
   let digito2 = 11 - (soma % 11);
   if (digito2 > 9) {
     digito2 = 0;
   }
 
   // Verifica se os dígitos verificadores são iguais aos dígitos originais
   if (parseInt(cpfArray[9]) === digito1 && parseInt(cpfArray[10]) === digito2) {
     return true;
   } else {
     return false;
   }
}