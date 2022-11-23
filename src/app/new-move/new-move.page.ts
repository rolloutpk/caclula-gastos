import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MovimientoVO } from 'src/vo/MovimientosVO';
import { Storage } from '@ionic/storage-angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-new-move',
  templateUrl: './new-move.page.html',
  styleUrls: ['./new-move.page.scss'],
})
export class NewMovePage implements OnInit {

  concepto:string="";

  nuevoImporte:number=0;


  constructor(private toastController: ToastController,private storage: Storage, private location: Location) { }

  ngOnInit() {
  }

  async agregar(){

    //validacion
    if(this.nuevoImporte==0 || this.concepto == ""){

      const toastValidation = await this.toastController.create({
        message: 'Debes llenar todos los campos.',
        duration: 1500,
        position: 'top'
      });

      await toastValidation.present();
      return;
    }

    // si pasa validaciòn


    let movimientoNuevo:MovimientoVO = {
      amount:this.nuevoImporte,
      description:this.concepto,
      fecha:new Date().toString()
    }

    let saldo =  await this.storage.get('saldo');

    console.log(saldo);

    
    saldo = saldo + movimientoNuevo.amount;

    const movimientos =  await this.storage.get('movimientos');
    
    console.log(movimientos);
    
    movimientos.push(movimientoNuevo);
    
    
    this.set("saldo",saldo);
    this.set("movimientos",movimientos);



    const toast = await this.toastController.create({
      message: 'Movimiento Registrado correctamente!',
      duration: 1500,
      position: 'top'
    });

    await toast.present();


    this.location.back();


  }

  public set(key: string, value: any) {
    this.storage.set(key, value);
  }
}
