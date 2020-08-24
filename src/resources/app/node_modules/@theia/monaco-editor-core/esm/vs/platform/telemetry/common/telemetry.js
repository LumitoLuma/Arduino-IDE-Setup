/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createDecorator } from '../../instantiation/common/instantiation';
export var ITelemetryService = createDecorator('telemetryService');
// Keys
export var instanceStorageKey = 'telemetry.instanceId';
export var currentSessionDateStorageKey = 'telemetry.currentSessionDate';
export var firstSessionDateStorageKey = 'telemetry.firstSessionDate';
export var lastSessionDateStorageKey = 'telemetry.lastSessionDate';
