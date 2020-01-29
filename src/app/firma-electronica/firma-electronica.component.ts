import { Component, OnInit } from '@angular/core';
import { RequestModel } from '../model/requestModel';
import { FirmaElectronicaService } from '../service/firma-electronica.service';
import { FirmaElectronicaResponse } from '../model/firma-electronica.model';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import 'bootstrap';

@Component({
  selector: 'app-firma-electronica',
  templateUrl: './firma-electronica.component.html',
  styleUrls: ['./firma-electronica.component.css']
})
export class FirmaElectronicaComponent implements OnInit {
  requestModel = new RequestModel("","","","");
  response: FirmaElectronicaResponse;
  error: string;
  constructor(private firmaElectronicaService: FirmaElectronicaService,
    private http: HttpClient) { }

  ngOnInit() { }

  submit(): void {
    console.log("Re: ", this.requestModel)

  
    this.firmaElectronicaService.postPdf(this.requestModel).subscribe(data => {
     
      if (data.body.archivoFirmado) {
        this.response = data.body;
        this.showFile(data.body.archivoFirmado);
      } else {
        this.error = 'No se encontro el archivo PDF';
        $('#staticBackdrop').modal();
      } 
    }, error => {
      this.error = error;
      $('#staticBackdrop').modal();
    });
  }
  private showFile(blob): void {
    var byteCharacters = atob(blob);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: 'application/pdf;base64' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
 
  }

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const key = (event.target as HTMLInputElement).id;

    this.toBase64(file).then(fileB64 => {
      var str = String(fileB64);
      var res = str.substring(28);
     
      console.log("B64: ", fileB64, key)
      switch(key) { 
        case 'archivo': { 
           this.requestModel.archivo = res; 
           break; 
        } 
        case 'certificado': { 
          this.requestModel.cert = res; 
           
           break; 
        } 
        case 'clave-privada': { 
          this.requestModel.keyPri = res; 
          
          break; 
       } 
        default: { 
           break; 
        } 
     } 
    
      

    });
  }

  onKey(event: any) { // without type info
    this.requestModel.contra += event.target.value ;
  }

  private toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
