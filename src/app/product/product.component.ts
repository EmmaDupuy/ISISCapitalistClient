import { Component, OnInit } from '@angular/core';
import { World, Pallier, Product } from '../world';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = new Product;
  server = "http://localhost:8080/"
  user = "";
  progressbarvalue: number = 0;
  progressbar: any;
  lastupdate: number = 0;
  _qtmulti: string = "";
  qtemax: number = 0;
  _money: number = 0;
  prix_actuel: number = 0;

  constructor() { }

  //init
  ngOnInit(): void {
    this.progressbarvalue = 0;
    //setInterval(() => { this.calcScore(); }, 100);
  }

  //inputs
  @Input()
  set prod(value: Product) {
    this.product = value;
    this.prix_actuel = this.product.cout;
    /*if (this.product && this.product.timeleft > 0) {
      this.lastupdate = Date.now();
      let progress = (this.product.vitesse - this.product.timeleft) / this.product.vitesse;
      this.progressbar.set(progress);
      this.progressbar.animate(1, { duration: this.product.timeleft });
    }*/
  }

  @Input()
  set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this.product) {
      this.calcMaxCanBuy();
    }
  }

  @Input()
  set money(value: number) {
    this.money = value;
    if (this._money && this.product) {
      this.calcMaxCanBuy();
    }
  }

  //outputs
  @Output()
  notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();

  @Output()
  notifyPurchase: EventEmitter<number> = new EventEmitter<number>();

  //fonctions
  startFabrication() {
    /*for (let i = 0; i < 100; i++) {
      this.progressbarvalue = i;
    }*/
    this.product.timeleft = this.product.vitesse;
    this.lastupdate = Date.now();
  }

  calcScore() {
    if (this.product.managerUnlocked && this.product.timeleft == 0) {
      this.startFabrication();
    }
    if (this.product.timeleft != 0) {
      this.product.timeleft = this.product.vitesse - (Date.now() - this.lastupdate);
    }
    if (this.product.timeleft <= 0 || this.product.timeleft == null) {
      this.progressbarvalue = 0;
      this.notifyProduction.emit(this.product);
    } else {
      this.progressbarvalue = ((this.product.vitesse - this.product.timeleft) / this.product.vitesse) * 100
    }
  }

  calcMaxCanBuy() {
    let qtmax = ((Math.log(1 - ((this._money * (1 - this.product.croissance)) / this.product.cout)) / Math.log(this.product.croissance)));
    if (qtmax < 0) {
      this.qtemax = 0;
    } else {
      this.qtemax = Math.floor(qtmax);
    }
  }

  achatProd(){}
}
