import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { DecimalPipe } from '@angular/common'; // 1. Import จาก @angular/common [cite: 5]
import { Assignment } from '../../types';
import { createNumber } from '../../helpers';

@Component({
  selector: 'app-dynamic-section-form',
  standalone: true,
  // 2. เพิ่ม DecimalPipe เข้าไปใน array ของ imports [cite: 154]
  imports: [FormField, DecimalPipe],
  templateUrl: './dynamic-section-form.html',
  styleUrl: './dynamic-section-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionForm {
  readonly data = model.required<Assignment>();
  protected readonly form = form(this.data);

  protected calculateSum(sectionValues: readonly number[]): number {
    return sectionValues.reduce((a, b) => a + b, 0);
  }

  protected addSection(): void {
    this.form().value.update((s) => [...s, [createNumber()]]);
  }

  protected removeSection(index: number): void {
    this.form().value.update((s) => (s.length > 1 ? s.filter((_, i) => i !== index) : s));
  }

  protected addNumber(sIdx: number): void {
    this.form[sIdx]().value.update((n) => [...n, createNumber()]);
  }

  protected removeNumber(sIdx: number, nIdx: number): void {
    this.form[sIdx]().value.update((n) => (n.length > 1 ? n.filter((_, i) => i !== nIdx) : n));
  }
}
