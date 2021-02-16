import { Component } from '@angular/core';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier } from './world';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  server: string,
  world: World = new World()
})
export class AppComponent {
  title = 'CapitalistProjectClient';
}
