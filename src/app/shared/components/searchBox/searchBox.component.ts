import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './searchBox.component.html'

})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = ""

  // @ViewChild('txtInput')
  // public txtInput!: ElementRef<HTMLInputElement>

  @Output()
  public onValue = new EventEmitter<string>();

  public emitValue(value: string): void {
    this.onValue.emit(value)
  }
}
