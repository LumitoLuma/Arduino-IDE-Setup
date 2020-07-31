"use strict";
/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var uri_1 = require("@theia/core/lib/common/uri");
var common_1 = require("@theia/core/lib/common");
var FileSystemUtils;
(function (FileSystemUtils) {
    /**
     * Tildify path, replacing `home` with `~` if user's `home` is present at the beginning of the path.
     * This is a non-operation for Windows.
     *
     * @param resourcePath
     * @param home
     */
    function tildifyPath(resourcePath, home) {
        var path = new common_1.Path(resourcePath);
        var isWindows = path.root && common_1.Path.isDrive(path.root.base);
        if (!isWindows && home && resourcePath.indexOf(home + "/") === 0) {
            return resourcePath.replace(home + "/", '~/');
        }
        return resourcePath;
    }
    FileSystemUtils.tildifyPath = tildifyPath;
    /**
     * Generate unique URI for a given parent which does not collide
     *
     * @param parentUri the `URI` of the parent
     * @param parent the `FileStat` of the parent
     * @param name the resource name
     * @param ext the resource extension
     */
    function generateUniqueResourceURI(parentUri, parent, name, ext) {
        if (ext === void 0) { ext = ''; }
        var children = !parent.children ? [] : parent.children.map(function (child) { return new uri_1.default(child.uri); });
        var index = 1;
        var base = name + ext;
        while (children.some(function (child) { return child.path.base === base; })) {
            index = index + 1;
            base = name + '_' + index + ext;
        }
        return parentUri.resolve(base);
    }
    FileSystemUtils.generateUniqueResourceURI = generateUniqueResourceURI;
})(FileSystemUtils = exports.FileSystemUtils || (exports.FileSystemUtils = {}));
//# sourceMappingURL=filesystem-utils.js.map