/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzHighlightModule, NzNoAnimationModule, NzOutletModule, NzOverlayModule } from 'ng-zorro-antd/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NzCascaderOptionComponent } from './cascader-li.component';
import { NzCascaderComponent } from './cascader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    NzOutletModule,
    NzEmptyModule,
    NzHighlightModule,
    NzIconModule,
    NzInputModule,
    NzNoAnimationModule,
    NzOverlayModule
  ],
  declarations: [NzCascaderComponent, NzCascaderOptionComponent],
  exports: [NzCascaderComponent]
})
export class NzCascaderModule {}
