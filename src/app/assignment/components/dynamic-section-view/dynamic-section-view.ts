import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common'; // ต้องมีสิ่งนี้ [cite: 335]
import { Assignment } from '../../types';

@Component({
  selector: 'app-dynamic-section-view',
  standalone: true,
  imports: [DecimalPipe], // ต้องมีสิ่งนี้
  templateUrl: './dynamic-section-view.html',
  styleUrl: './dynamic-section-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionView {
  readonly data = input.required<Assignment>();

  protected calculateSum(section: readonly number[]): number {
    return section.reduce((a, b) => a + b, 0);
  }
}
