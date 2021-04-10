import { Component } from '@angular/core';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier } from './world';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ISISCapitalistClient';
  world: World = new World();
  server: string = "";
  qtmulti: string = "x1";
  showManagers = false;
  badgeManagers = 0;
  username : string ="";

  constructor(private service: RestserviceService, private snackBar: MatSnackBar) {
    this.server = service.getServer();
    this.username = localStorage.getItem("username") || "StrategicBoss" + Math.floor(Math.random() * 10000);
    this.service.user = this.username;
    service.getWorld().then(
      world => {
        this.world = world;
      });

  }

  onProductionDone(p: Product) {
    this.world.money += p.quantite * p.revenu;
    this.world.score += p.quantite * p.revenu;
  }

  onUsernameChange() {
    localStorage.setItem("username", this.username);
    this.service.user = this.username;
  }

  modifqtachat() {
    switch (this.qtmulti) {
      case "x1":
        this.qtmulti = "x10";
        break;
      case "x10":
        this.qtmulti = "x100";
        break;
      case "x100":
        this.qtmulti = "max";
        break;
      case "max":
        this.qtmulti = "x1";
        break;
    }
  }

  onBuy(monde : World) {
    this.world.money = monde.money;
  }

  hireManager(manager: Pallier) {
    //verifier si argent suffisant et pas debloqué
    if ((this.world.money >= manager.seuil) && (this.world.products.product[manager.idcible - 1].quantite > 0)) {
      this.world.money -= manager.seuil;
      manager.unlocked = true;
      this.world.products.product[manager.idcible - 1].managerUnlocked = true;
      this.popMessage("Vous avez engagé " + manager.name + "!");
      this.service.putManager(manager);
    }
  }

  //afficher un message qui disparait au bout de 5 secondes
  popMessage(message: string): void {
    this.snackBar.open(message, "", { duration: 5000 })
  }

  badgeUpgrades() {
    //pour chauque manageur
    for (let manager of this.world.managers.pallier) {
      //si le coute du manageur est inferieur à l'argent du joueur
      if (manager.seuil <= this.world.money) {
        //on ajoute un badge
        this.badgeManagers++;
      }

    }
  }

}