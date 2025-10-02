import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CurrencyConverterComponent } from './app/features/currency-converter/currency-converter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyConverterComponent],
  template: `<app-currency-converter></app-currency-converter>`,
})
export class App {
}

bootstrapApplication(App, {
  providers: [provideHttpClient()]
});
