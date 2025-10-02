import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CurrencyDropdownComponent } from './app/shared/componenets/currency-dropdown/currency-dropdown';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CurrencyDropdownComponent],
  template: ` <app-currency-dropdown label=test></app-currency-dropdown>
  `,
})
export class App {
}

bootstrapApplication(App, {
  providers: [provideHttpClient()]
});
