import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {noop, of} from 'rxjs';
import {error} from 'protractor';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  //PRECISAMOS DESSA INJECÃO NO SISTEMA DE DEPENDCIA DO ANGULAR
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:FileUploadComponent
    }

  ]
})

//IMPLEMENTAR NÃO E O SUFICIENTE
//PRECISAMOS INJETAR NO ANGULAR DEPENDENCY SYSTEM PEKA CONFIGURAÇÃO A CIMA
export class FileUploadComponent implements ControlValueAccessor{

  @Input()requiredFileType:string;
  fileName='';
  fileUploadError=false;
  uploadProgress: number;
  onChange=(fileName:string)=>{};
  onTouched=()=>{};//QUANDO TOCA NO FORM FIELD
  disabled:boolean=false;

  constructor(private http:HttpClient) {
  }


  onFileSelected(event) {
    //NESSE EXEMPLO E SO UM
   const file:File= event.target.files[0];

   //FUNCIONALIDADE DO CANCELAMENTO
    if(file)
    {
      this.fileName=file.name;
      console.log(this.fileName);

      //PRECISAMOS CRIAR UM PAYLOAD
      //TAMO CRAINDO MANUALEMNETE
      const formData=new FormData();

      formData.append("thumbnail",file);

      this.fileUploadError=false;
      //VAMOS MANDAR PRO BACKEND
      this.http.post("http://localhost:9000/api/thumbnail-upload",formData,{
        reportProgress:true,
        observe:'events'
      }).
        pipe(catchError(error => {
          this.fileUploadError=true;
          return of(error);
      }),
        finalize(()=>{
          this.uploadProgress=null;
        })
      ).subscribe(event=>{
        if(event.type ==HttpEventType.UploadProgress)
        {
          this.uploadProgress=Math.round(100*event.loaded / event.total)
        }
        else if(event.type==HttpEventType.Response){
          this.onChange(this.fileName);
        }
      });

    }


  }

  writeValue(value: any) {
    this.fileName=value;
  }
  registerOnChange(onChange: any) {
    this.onChange=onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched=onTouched;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled=isDisabled;
  }


  OnClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }
}
