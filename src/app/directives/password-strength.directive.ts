import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {createPassowrdStrengthValidator} from '../validators/password-strength-validator';


@Directive({
  //NOME DA NOSSA DIRETIVA
  selector:"[passwordStrength]",
  //PRECISAMOS INFORMAR PRO ANGULAR QUE NÃO E UMA DIRETIVA NATIVA
  //PRECISMAOS INJETAR OS PROVEDORES PRA FALAR QUE ESSA E UMA VALIDATOR DIRECTIVA NO FORM
  providers:[{
    provide:NG_VALIDATORS,
    useExisting:PasswordStrengthDirective,
    multi:true

  }]
})
//ESSA E UMA DIRETIVA DE VALIDAÇÃO
export class PasswordStrengthDirective implements  Validator{

  //CONTROL QUE VAI SER VALIDATOR, E O RETORNO DOS ERROS DE VALIDAÇÃO
  validate(control: AbstractControl): ValidationErrors | null {
    //PRIEMIRO CRIAMOS A VALIDATOR FUNCTION, E DEPOIS CHAMAMOS MANDANDO O CONTROL
    return createPassowrdStrengthValidator()(control);


  }

}
