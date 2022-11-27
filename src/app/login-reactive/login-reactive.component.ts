import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
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
  //NOS DA MAIS PODER DE CONTROLE TANTO PROS CONTROLES, TANTO PRA DIMINUIÇÇÃO DE CODIGO
  form=this.fb.group(
    {
      //PRIMEIRO E O INCIIAL VALOR
      //SEGUNDO E O ARRAY DO SINCRONOS VALIDATORS
      //MAS PODEMOS FAZER UMA CONFIGURAÇÃO MAIOR COMO NO EMAIL

    //COM O FORM VUILDER PODEMOS COLOCAR O CAMPO PRA NUNCA SER NULL POR DEFAULT
      email:['',{validators:[Validators.required,Validators.email],updateOn:'blur'}],
      password:['',[Validators.required,Validators.minLength(8),createPassowrdStrengthValidator()]]
    }
  )




  //TAMBEM TEMOS O NonNullableFormBuilder,ONDE NÃO PRECIAMOS COLOCAR O NON NULABLE NOS CONTROLE
  constructor(private fb:NonNullableFormBuilder) {

    //PODEMOS FAZER UM INDENPENDETE CONTROLE
  //fb.control('',)

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



  //FORM GROUP TEM O TIPO ANY POR DEFAULT
  //PRA TER O MAXIMO EFEITO E CRIAR DO JEITO QUE TA EMCIMA
  login() {
    const formValue=this.form.value;

    this.form.patchValue({

    })
  }

  reset() {
    //RESETAMOS O FORM PRA DEFAULT VALUE, QUE SERIA O NULL POR PADRAO
    //MAS SE NO CONTROL DIZERMOS QUE O CONTROLE NÃO PODE TER VALOR NULO,
    // LE VAI RESETAR PRO VALOR QUE COLOCAMOS COMO DEFAULT NA CRIAÇÃO DO CONTROLE
    this.form.reset();

    console.log(this.form.value);
  }
}
