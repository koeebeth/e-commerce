import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CatalogCardComponent } from './catalog-card/catalog-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CatalogCardComponent,],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  @Input() totalPages: number = 10;
  currentPage: number = 1;
  maxVisiblePages: number = 5;

  get visiblePages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  get showDots(): boolean {
    return this.visiblePages[this.visiblePages.length - 1] < this.totalPages;
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
