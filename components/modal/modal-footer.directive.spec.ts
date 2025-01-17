import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzModalFooterDirective } from './modal-footer.directive';
import { NzModalRef } from './modal-ref';
import { NzModalComponent } from './modal.component';
import { NzModalModule } from './modal.module';
import { NzModalService } from './modal.service';

describe('modal footer directive', () => {
  let overlayContainer: OverlayContainer;
  let fixture: ComponentFixture<TestDirectiveFooterComponent>;
  let testComponent: TestDirectiveFooterComponent;
  let modalService: NzModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzModalModule, NoopAnimationsModule],
      declarations: [TestDirectiveFooterComponent, TestDirectiveFooterInServiceComponent],
      providers: [NzModalService]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveFooterComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([OverlayContainer, NzModalService], (oc: OverlayContainer, m: NzModalService) => {
    overlayContainer = oc;
    modalService = m;
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should work with template', () => {
    testComponent.showModal();
    fixture.detectChanges();
    expect(testComponent.isVisible).toBe(true);

    expect(testComponent.nzModalComponent.nzFooter).toBe(testComponent.nzModalFooterDirective.templateRef);

    testComponent.handleCancel();
    fixture.detectChanges();
  });

  it('should work with service', () => {
    const modalRef = modalService.create({ nzContent: TestDirectiveFooterInServiceComponent, nzFooter: null });
    fixture.detectChanges();

    expect(modalRef.componentInstance!.nzModalRef).toBe(modalRef);
    expect(modalRef.componentInstance!.nzModalFooterDirective.templateRef).toBe(modalRef.getConfig().nzFooter as TemplateRef<{}>);
  });
});

@Component({
  template: `
    <nz-modal [(nzVisible)]="isVisible" nzTitle="Custom Modal Title" (nzOnCancel)="handleCancel()">
      <div>
        <p>Modal Content</p>
      </div>
      <div *nzModalFooter>
        <button id="btn-template" nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
      </div>
    </nz-modal>
  `
})
class TestDirectiveFooterComponent {
  isVisible = false;
  @ViewChild(NzModalComponent) nzModalComponent: NzModalComponent;
  @ViewChild(NzModalFooterDirective) nzModalFooterDirective: NzModalFooterDirective;

  constructor() {}

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }
}

@Component({
  template: `
    <div *nzModalFooter>
      <button id="btn-template" nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
    </div>
    s
  `
})
class TestDirectiveFooterInServiceComponent {
  @ViewChild(NzModalFooterDirective) nzModalFooterDirective: NzModalFooterDirective;

  constructor(public nzModalRef: NzModalRef) {}

  handleCancel(): void {
    this.nzModalRef.close();
  }
}
