import { ChangeDetectionStrategy, Component, effect, inject, resource } from '@angular/core';
import { Router } from '@angular/router'; // Import จาก @angular/router ถูกแล้ว
import { DynamicSectionForm } from '../../components/dynamic-section-form/dynamic-section-form';
import { createAssignment } from '../../helpers'; // เปลี่ยนชื่อให้ตรงกับที่คุณใช้ใน helper
import { DynamicSectionDataStorage } from '../../services/dynamic-section-data.storage';

@Component({
  selector: 'app-dynamic-section-form-page',
  standalone: true, // เพิ่ม standalone: true ตามที่เรียนในสไลด์ [cite: 212]
  imports: [DynamicSectionForm],
  templateUrl: './dynamic-section-form-page.html',
  styleUrl: './dynamic-section-form-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // ใช้ OnPush ตามที่อาจารย์กำหนด [cite: 215]
})
export class DynamicSectionFormPage {
  // ใช้ inject() แทนการใช้ new
  private readonly storage = inject(DynamicSectionDataStorage);
  private readonly router = inject(Router);

  // resource ต้องอยู่ในระดับ class property [cite: 96]
  protected readonly dataResource = resource({
    loader: async () => (await this.storage.get()) ?? createAssignment(),
  });

  constructor() {
    // ใช้ effect เพื่อบันทึกข้อมูลอัตโนมัติเมื่อมีการเปลี่ยนแปลง [cite: 216]
    effect(() => {
      if (this.dataResource.hasValue()) {
        this.storage.set(this.dataResource.value());
      }
    });
  }

  protected navigateToView(): void {
    this.router.navigate(['/assignment/view']);
  }
}
