
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Currency } from '../../services/currency';
import { ICurrencyConvertParams, ICurrencyConvertResponse } from '../../models/currency';
import { CurrencyDropdownComponent } from '../../shared/components/currency-dropdown/currency-dropdown';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './currency-converter.html',
  styleUrls: ['./currency-converter.css'],
  imports: [CurrencyDropdownComponent, ReactiveFormsModule, CommonModule],
})
export class CurrencyConverterComponent implements OnInit {
  currencyForm!: FormGroup;
  convertedValue = signal<ICurrencyConvertResponse | undefined>(undefined);
  loading = signal(false);
  error = signal('');

  constructor(
    private fb: FormBuilder,
    private currencyService: Currency,
    private destroyRef: DestroyRef,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeFormUpdates();
  }

  /**
   * Initializes the form with default controls and validators.
   */
  private initializeForm(): void {
    this.currencyForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      amount: [
        1,
        [
          Validators.required,
          Validators.min(0.01),
        ],
      ],
    });
  }

  private subscribeFormUpdates() {
    this.currencyForm.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(() => this.currencyForm.valid),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      debounceTime(500)
    ).subscribe(this.onConvert.bind(this))
  }

  /**
   * Handles the form submission for currency conversion.
   */
  private onConvert(): void {
    if (this.formValue.from === this.formValue.to) {
      this.convertedValue.set({ value: this.formValue.amount });
    } else {
      this.convertCurrency(this.formValue);
    }
  }

  /*
  * Exchange currencies.
  */
  onSwitch(): void {
    const oldFromValue = this.formValue.from;
    this.currencyForm.patchValue({
      from: this.formValue.to,
      to: oldFromValue
    });
  }

  private convertCurrency(formValue: ICurrencyConvertParams): void {
    this.loading.set(true);
    this.currencyService.convertCurrency(formValue).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (response) => {
        this.error.set('');
        this.convertedValue.set(response);
        this.loading.set(false);

      },
      error: (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      },
    }
    );
  }

  get formValue(): ICurrencyConvertParams {
    return this.currencyForm.value;
  }

}