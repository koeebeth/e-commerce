import { Component } from '@angular/core';
import { CatalogCardComponent } from './catalog-card/catalog-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CatalogCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {

}
