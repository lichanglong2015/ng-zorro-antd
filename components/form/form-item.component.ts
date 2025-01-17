/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { warnDeprecation } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';

export type NzFormControlStatusType = 'success' | 'error' | 'warning' | 'validating' | null;

/** should add nz-row directive to host, track https://github.com/angular/angular/issues/8785 **/
@Component({
  selector: 'nz-form-item',
  exportAs: 'nzFormItem',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ant-form-item-has-success]': 'status === "success"',
    '[class.ant-form-item-has-warning]': 'status === "warning"',
    '[class.ant-form-item-has-error]': 'status === "error"',
    '[class.ant-form-item-is-validating]': 'status === "validating"',
    '[class.ant-form-item-has-feedback]': 'hasFeedback && status',
    '[class.ant-form-item-with-help]': 'withHelpClass'
  },
  template: `
    <ng-content></ng-content>
  `
})
export class NzFormItemComponent implements OnDestroy, OnDestroy {
  /**
   * @deprecated 10.0.0. 'nzFlex' is deprecated and going to be removed in 10.0.0.
   */
  @Input() set nzFlex(_: boolean) {
    warnDeprecation(`'nzFlex' is deprecated and going to be removed in 10.0.0.`);
  }

  status: NzFormControlStatusType = null;
  hasFeedback = false;
  withHelpClass = false;

  private destroy$ = new Subject();

  setWithHelpViaTips(value: boolean): void {
    this.withHelpClass = value;
    this.cdr.markForCheck();
  }

  setStatus(status: NzFormControlStatusType): void {
    this.status = status;
    this.cdr.markForCheck();
  }

  setHasFeedback(hasFeedback: boolean): void {
    this.hasFeedback = hasFeedback;
    this.cdr.markForCheck();
  }

  constructor(elementRef: ElementRef, renderer: Renderer2, private cdr: ChangeDetectorRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-form-item');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
