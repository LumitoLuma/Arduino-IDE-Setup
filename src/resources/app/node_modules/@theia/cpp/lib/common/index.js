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
/**
 * The C language ID.
 */
exports.C_LANGUAGE_ID = 'c';
/**
 * The C++ language ID.
 */
exports.CPP_LANGUAGE_ID = 'cpp';
/**
 * The human-readable name for the C/C++ language server.
 */
exports.CPP_LANGUAGE_NAME = 'C/C++';
// These should become preferences eventually and be forwarded to the server.
/**
 * The C/C++ header file extensions.
 */
exports.HEADER_FILE_EXTENSIONS = ['h', 'hxx', 'hh', 'hpp', 'inc'];
/**
 * The C/C++ source file extensions.
 */
exports.SOURCE_FILE_EXTENSIONS = ['c', 'cxx', 'C', 'c++', 'cc', 'cpp', 'cl'];
/**
 * The list of file extensions important to the C/C++ language server.
 */
exports.HEADER_AND_SOURCE_FILE_EXTENSIONS = exports.SOURCE_FILE_EXTENSIONS.concat(exports.HEADER_FILE_EXTENSIONS);
exports.CLANGD_EXECUTABLE_DEFAULT = 'clangd';
//# sourceMappingURL=index.js.map