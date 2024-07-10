import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, input, Input, OnDestroy, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { debounce, debounceTime, delay, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './searchBox.component.html'

})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject()

  @Input()
  public placeholder: string = ""

  @Input()
  public initialvalue?: string = ""

  // @ViewChild('txtInput')
  // public txtInput?: ElementRef<HTMLInputElement>


  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  public debaouncerSubcription?:Subscription

  ngOnInit(): void {
    this.debaouncerSubcription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.onDebounce.emit(value)
      })
  }

  ngOnDestroy(): void {
    this.debaouncerSubcription?.unsubscribe()
  }

  public emitValue(value: string): void {
    this.onValue.emit(value)
  }

  onSearchTerm(searchTerm: string) {
    this.debouncer.next(searchTerm)
  }
}
