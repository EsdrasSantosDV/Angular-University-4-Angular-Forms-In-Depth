import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {noop, of} from 'rxjs';
import {error} from 'protractor';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  //PRECISAMOS DESSA INJECÃO NO SISTEMA DE DEPENDCIA DO ANGULAR
  providers:[
    {

      //INJEÇÃO DO TOKEN
      //Todas as classes que implementam a ControlValueAccessor interface são fornecidas
      // por meio do NG_VALUE_ACCESSORtoken.
      // Angular usa esse token para pegar ControlValueAccessore conectar a FormControlele.
      provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:FileUploadComponent
    },
    {
      provide:NG_VALIDATORS,
      multi:true,
      useExisting:FileUploadComponent
    }

  ]
})

//IMPLEMENTAR NÃO E O SUFICIENTE
//PRECISAMOS INJETAR NO ANGULAR DEPENDENCY SYSTEM PEKA CONFIGURAÇÃO A CIMA
export class FileUploadComponent implements ControlValueAccessor,Validator{

  @Input()
  requiredFileType:string;

  fileName = '';

  fileUploadError = false;

  fileUploadSuccess = false;

  uploadProgress:number;

  onChange = (fileName:string) => {};

  onTouched = () => {};

  onValidatorChange = () => {};

  disabled : boolean = false;

  constructor(private http: HttpClient) {

  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      this.fileUploadError = false;

      this.http.post("http://localhost:9000/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          catchError(error => {
            this.fileUploadError = true;
            return of(error);
          }),
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        .subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
          else if (event.type == HttpEventType.Response) {
            this.fileUploadSuccess = true;
            this.onChange(this.fileName);
            this.onValidatorChange();
          }
        });



    }

  }

  writeValue(value: any) {
    this.fileName = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChange = onValidatorChange;
  }

  validate(control: AbstractControl): ValidationErrors | null {

    if (this.fileUploadSuccess) {
      return null;
    }

    let errors: any = {
      requiredFileType: this.requiredFileType
    };

    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }

    return errors;
  }




}
