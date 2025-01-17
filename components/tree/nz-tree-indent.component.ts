/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'nz-tree-indent',
  exportAs: 'nzTreeIndent',
  template: `
    <span aria-hidden="true" class="{{ nzPrefixCls }}-indent">
      <span *ngFor="let i of listOfUnit; let index = index" [ngClass]="unitMapOfClass(index)"></span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class NzTreeIndentComponent implements OnInit, OnChanges {
  @Input() nzPrefixCls: string;
  @Input() nzTreeLevel: number;
  @Input() nzIsStart: boolean[];
  @Input() nzIsEnd: boolean[];

  listOfUnit: number[] = [];

  unitMapOfClass(index: number): { [key: string]: boolean } {
    return {
      [`${this.nzPrefixCls}-indent-unit`]: true,
      [`${this.nzPrefixCls}-indent-unit-start`]: this.nzIsStart[index + 1],
      [`${this.nzPrefixCls}-indent-unit-end`]: this.nzIsEnd[index + 1]
    };
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzTreeLevel } = changes;
    if (nzTreeLevel) {
      this.listOfUnit = [...new Array(nzTreeLevel.currentValue || 0)];
    }
  }
}
