/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayRef } from '@angular/cdk/overlay';
import { EventEmitter, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';

export type OnClickCallback<T> = (instance: T) => (false | void | {}) | Promise<false | void | {}>;

export type ModalTypes = 'default' | 'confirm'; // Different modal styles we have supported

export type ConfirmType = 'confirm' | 'info' | 'success' | 'error' | 'warning'; // Subtypes of Confirm Modal

export interface StyleObjectLike {
  [key: string]: string;
}

const noopFun = () => void 0;

// tslint:disable-next-line:no-any
export class ModalOptions<T = any, R = any> {
  nzClosable?: boolean = true;
  nzOkLoading?: boolean = false;
  nzOkDisabled?: boolean = false;
  nzCancelDisabled?: boolean = false;
  nzCancelLoading?: boolean = false;
  nzNoAnimation?: boolean = false;
  nzAutofocus?: 'ok' | 'cancel' | 'auto' | null = 'auto';
  nzMask?: boolean = true;
  nzMaskClosable?: boolean = true;
  nzKeyboard?: boolean = true;
  nzZIndex?: number = 1000;
  nzWidth?: number | string = 520;
  nzCloseIcon?: string | TemplateRef<void> = 'close';
  nzOkType?: NzButtonType = 'primary';
  nzModalType?: ModalTypes = 'default';
  nzOnCancel?: EventEmitter<T> | OnClickCallback<T> = noopFun;
  nzOnOk?: EventEmitter<T> | OnClickCallback<T> = noopFun;
  nzComponentParams?: Partial<T>;
  nzMaskStyle?: StyleObjectLike;
  nzBodyStyle?: StyleObjectLike;
  nzWrapClassName?: string;
  nzClassName?: string;
  nzStyle?: object;
  nzTitle?: string | TemplateRef<{}>;
  nzFooter?: string | TemplateRef<{}> | Array<ModalButtonOptions<T>> | null; // Default Modal ONLY
  nzCancelText?: string | null;
  nzOkText?: string | null;
  nzContent?: string | TemplateRef<{}> | Type<T>;
  nzCloseOnNavigation?: boolean = true;
  nzViewContainerRef?: ViewContainerRef;

  /**
   * Reset the container element.
   * @deprecated Not supported.
   * @breaking-change 10.0.0
   */
  nzGetContainer?: HTMLElement | OverlayRef | (() => HTMLElement | OverlayRef);

  // Template use only
  nzAfterOpen?: EventEmitter<void>;
  nzAfterClose?: EventEmitter<R>;

  // Confirm
  nzIconType?: string = 'question-circle';
}

// tslint:disable-next-line:no-any
export interface ModalButtonOptions<T = any> {
  label: string;
  type?: NzButtonType;
  shape?: NzButtonShape;
  ghost?: boolean;
  size?: NzButtonSize;
  autoLoading?: boolean; // Default: true, indicate whether show loading automatically while onClick returned a Promise

  // [NOTE] "componentInstance" will refer to the component's instance when using Component
  show?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
  loading?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean); // This prop CAN'T use with autoLoading=true
  disabled?: boolean | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
  // tslint:disable-next-line:no-any
  onClick?(this: ModalButtonOptions<T>, contentComponentInstance?: T): any | Promise<any>;
  // tslint:disable-next-line:no-any
  [key: string]: any;
}
