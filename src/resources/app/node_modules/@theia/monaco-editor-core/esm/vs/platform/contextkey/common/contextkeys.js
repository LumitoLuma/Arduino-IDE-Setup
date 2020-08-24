/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { RawContextKey } from './contextkey';
export var InputFocusedContextKey = 'inputFocus';
export var InputFocusedContext = new RawContextKey(InputFocusedContextKey, false);
export var FalseContext = new RawContextKey('__false', false);
