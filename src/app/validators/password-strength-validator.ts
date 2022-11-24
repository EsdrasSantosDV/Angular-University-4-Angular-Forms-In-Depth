import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

//AQUI QUE CRIA UM VALIDATOR, RETORNA UM validator function
export function createPassowrdStrengthValidator():ValidatorFn{
  return(control:AbstractControl):ValidationErrors | null =>{
    //ESQUELETO DA NOSSA VALIDATOR FUNCTION
    //VALOR DO CONTROL RECEBIDO QUE O QUE O USUARIO DIGITOU
    const value=control.value;
    if(!value)
    {
      return  null;
    }

    //EXPRESSOES REGULARES PRA DETERMINAR SE E VALIDO

    const hasUpperCase =/[A-Z]+/.test(value);

    const hasLowerCase =/[a-z]+/.test(value);

    const hasNumeric= /[0-9]+/.test(value);

    const passwordValid=hasUpperCase && hasLowerCase && hasNumeric;

    //SE A SENHA NÃO E VALIDA
    return  !passwordValid ? {passwordStrength:true}:null;
  }
}
