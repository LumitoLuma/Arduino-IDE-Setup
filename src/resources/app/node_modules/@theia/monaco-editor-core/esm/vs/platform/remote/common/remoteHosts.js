/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Schemas } from '../../../base/common/network';
export var REMOTE_HOST_SCHEME = Schemas.vscodeRemote;
export function getRemoteAuthority(uri) {
    return uri.scheme === REMOTE_HOST_SCHEME ? uri.authority : undefined;
}
export function getRemoteName(authority) {
    if (!authority) {
        return undefined;
    }
    var pos = authority.indexOf('+');
    if (pos < 0) {
        // funky? bad authority?
        return authority;
    }
    return authority.substr(0, pos);
}
