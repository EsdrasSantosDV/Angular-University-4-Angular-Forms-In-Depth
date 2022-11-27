import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursesService} from '../../services/courses.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {courseTitleValidator} from '../../validators/course-title.validator';

interface  CourseCategory{
   code:string;
   description:string;
}


@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {

  form= this.fb.group({
    title:["",{
      validators:[Validators.required,Validators.minLength(5),Validators.maxLength(60)],
      //VALIDATORS ASSICRONICOS, EXEMPLO NESSE, UM VALIDATOR QUE SO SE TORNA VALIDO SE NÃO TEM OUTRO COURSE COM O MESMO TITULO
      asyncValidators:[courseTitleValidator(this.courseService )],
      updateOn:'blur'
    }],
    releaseDateAt:[new Date(),Validators.required],
    category:['BEGINNER',Validators.required],
    downloadsAllowed:[false,Validators.requiredTrue],
    longDescription:['',[Validators.required,Validators.minLength(3)]]
  })

  //RECEBER AS CATEGORIAS DO BACK
  courseCategories$:Observable<CourseCategory[]>;


  constructor(private fb:FormBuilder,private courseService:CoursesService) {
  }



  ngOnInit() {
    this.courseCategories$=this.courseService.findCourseCategories();

    //VAMOS DIZER QUE O USUARIO SAIU E FOI PRA OUTRA COMPOENNT
    //VAMOS SALVAR NO LOCAL STORAGE DO NAVEGADOR
    //E PEGAR O FORMULARIO VALIDO
    //E DEPOIS QUANDO ELE VOLTAR PRO CRIAR SETAR NO VALOR DO FORM
    const draft=localStorage.getItem("STEP_1");
    if(draft)
    {

      //PATCH VALUE TROCA OS CAMPOS E IGNORA OS OUTROS
      this.form.setValue(JSON.parse(draft));
      //SET VALUE E TODOS
    }
    this.form.valueChanges.pipe(
      filter(()=> this.form.valid)
    ).subscribe(val=>
      //SALVAR EM LOCAL STORAGE O FORMULARIO 1
      localStorage.setItem("STEP_1",JSON.stringify(val)));

  }


 get courseTitle()
  {
      return this.form.controls['title'];
  };
}
