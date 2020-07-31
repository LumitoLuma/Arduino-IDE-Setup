"use strict";
/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./types"));
__export(require("./disposable"));
__export(require("./reference"));
__export(require("./event"));
__export(require("./cancellation"));
__export(require("./command"));
__export(require("./menu"));
__export(require("./selection-service"));
__export(require("./objects"));
__export(require("./os"));
__export(require("./resource"));
__export(require("./contribution-provider"));
__export(require("./path"));
__export(require("./logger"));
__export(require("./messaging"));
__export(require("./message-service"));
__export(require("./message-service-protocol"));
__export(require("./progress-service"));
__export(require("./progress-service-protocol"));
__export(require("./selection"));
__export(require("./strings"));
__export(require("./application-error"));
__export(require("./lsp-types"));
var environment_1 = require("@theia/application-package/lib/environment");
exports.environment = environment_1.environment;
//# sourceMappingURL=index.js.map