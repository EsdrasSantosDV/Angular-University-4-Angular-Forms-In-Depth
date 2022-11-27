import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {createPassowrdStrengthValidator} from '../validators/password-strength-validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {


  //TUDO DA LOGICA DO FORM FICA NA MODEL E NÃO MAS NO TEMPLATE
  //PRECISAMOS PRIMEIRO DEFINIR O FORM


  //A VANTAGEM DE UTILZIAR O FORM BUILDER E TER UAM IMPLEMENTAÇÃO MASI CONCISA
  form=this.fb.group(
    {
      //PRIMEIRO E O INCIIAL VALOR
      //SEGUNDO E O ARRAY DO SINCRONOS VALIDATORS
      //MAS PODEMOS FAZER UMA CONFIGURAÇÃO MAIOR COMO NO EMAIL
      email: ['',{validators:[Validators.required,Validators.email],updateOn:'blur'}],
      password:['',[Validators.required,Validators.minLength(8),createPassowrdStrengthValidator()]]
    }
  )




  constructor(private fb:FormBuilder) {

    //PODEMOS FAZER UM INDENPENDETE CONTROLE
    fb.control('',)

  }

  ngOnInit() {

  }

  get email()
  {
    return this.form.controls['email'];
  }

  get password()
  {
    return this.form.controls['password'];
  }


}
