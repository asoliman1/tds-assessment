import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Currency } from '../../../services/currency';
import { ICurrency } from '../../../models/currency';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-currency-dropdown',
  standalone: true,
  templateUrl: './currency-dropdown.html',
  styleUrls: ['./currency-dropdown.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyDropdownComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class CurrencyDropdownComponent implements OnInit, ControlValueAccessor {
  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  label = input.required<string>();
  currencies = signal<ICurrency[]>([]);
  selectedCurrency = signal('');
  loading = signal(false);
  error = signal('');

  // Component id to prevent redundunt dom elements.
  id = Date.now();

  constructor(private currencyService: Currency, private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.fetchList();
  }

  private fetchList() {
    this.loading.set(true);
    this.currencyService.currencyList$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      (response) => {
        this.error.set('');
        this.loading.set(false);
        this.currencies.set(response);
      },
      (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      },
    );
  }

  /**
   * When the user selects a currency, propagate the change.
   * @param {Event} event.
   */
  onCurrencyChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedCurrency.set(val);
    this.onChange(this.selectedCurrency()); // Notify the parent form control of the change
  }


  /**
   * Set the value from the parent form.
   * @param value - The selected currency code
   */
  writeValue(value: string): void {
    this.selectedCurrency.set(value);
  }

  /**
   * Register a callback function that is called when the value in the dropdown changes.
   * @param fn - The callback function (provided by the form control)
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Register a callback function that is called when the dropdown is touched.
   * @param fn - The callback function (provided by the form control)
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * When the dropdown is blurred, invoke the `onTouched` callback.
   */
  onBlur(): void {
    this.onTouched();
  }

  get isDisabled() {
    return this.loading() || this.error();
  }
}