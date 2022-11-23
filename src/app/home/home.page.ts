import { Component } from '@angular/core';
import { MovimientoVO } from 'src/vo/MovimientosVO';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Propiedades

  saldo:number = 0;

  movimientox:MovimientoVO = {
    amount:3000.5,
    description:"Saldo Inicial",
    fecha:"2022-11-05"
  };

  movimientoy:MovimientoVO = {
    amount:100,
    description:"Ingreso",
    fecha:"2022-11-18"
  };

  movimientoz:MovimientoVO = {
    amount:-250,
    description:"Gasto",
    fecha:"2022-11-21"
  };

  movimientos:MovimientoVO[]=[
    this.movimientox, this.movimientoy, this.movimientoz
  ];

  //metodos

  constructor(private storage: Storage) {
  }

  async ionViewWillEnter(){
    //Inicializa el storage
    this.storage.create();



    const saldo =  await this.storage.get('saldo');
    console.log(saldo);

    const movimientos =  await this.storage.get('movimientos');
    console.log(movimientos);


    if (movimientos){
      this.movimientos=movimientos;
      this.saldo=saldo;
    }else{
      for(let i=0; i < this.movimientos.length; i++){
        this.saldo+=parseInt(this.movimientos[i].amount.toString());
      }

    }

    this.set("saldo",this.saldo);
    this.set("movimientos",this.movimientos);
  }
  

  public set(key: string, value: any) {
    this.storage.set(key, value);
  }

}
