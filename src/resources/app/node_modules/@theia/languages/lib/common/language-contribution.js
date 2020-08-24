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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageContribution = void 0;
var LanguageContribution;
(function (LanguageContribution) {
    LanguageContribution.servicePath = '/services/languages';
    function getPath(contribution, sessionId) {
        if (sessionId === void 0) { sessionId = ':id'; }
        return LanguageContribution.servicePath + '/' + contribution.id + '/' + sessionId;
    }
    LanguageContribution.getPath = getPath;
    LanguageContribution.Service = Symbol('LanguageContributionService');
})(LanguageContribution = exports.LanguageContribution || (exports.LanguageContribution = {}));
//# sourceMappingURL=language-contribution.js.map