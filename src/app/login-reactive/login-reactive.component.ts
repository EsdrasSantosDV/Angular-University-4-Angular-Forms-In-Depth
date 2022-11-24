import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {createPassowrdStrengthValidator} from '../validators/password-strength-validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  //ESSA E OUTRA FORMA DE DECLARAR UM FORM CONTROL FROA DO FORM GROUP

  //O UPTADE BLUR SO ATUALIZA QUANDO APERTA TAB OU SAI
  email=new FormControl('',{validators:[Validators.required,Validators.email],updateOn:'blur'});

  //NÃO PRECISA FAZER UMA DIRETIVA, SO COLOCAR A FUNCAO DE VALIDAÇÃOP
  password=new FormControl('',{validators:[Validators.required,Validators.minLength(8),createPassowrdStrengthValidator()]});

  //TUDO DA LOGICA DO FORM FICA NA MODEL E NÃO MAS NO TEMPLATE
  //PRECISAMOS PRIMEIRO DEFINIR O FORM
  form=new FormGroup({
    email:this.email,
    password:this.password
});




  constructor() {


  }

  ngOnInit() {

  }

}
