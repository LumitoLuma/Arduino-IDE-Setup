"use strict";
/********************************************************************************
 * Copyright (C) 2020 Red Hat, Inc. and others.
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
exports.fromCaller = exports.toCaller = exports.fromDefinition = exports.toDefinition = exports.SymbolKindConverter = exports.toRange = exports.fromRange = exports.fromPosition = exports.toLocation = exports.fromLocation = exports.fromUriComponents = exports.toUriComponents = void 0;
var model = require("../../../common/plugin-api-rpc-model");
var callhierarchy = require("vscode-languageserver-types");
var vscode_uri_1 = require("vscode-uri");
function toUriComponents(uri) {
    return vscode_uri_1.URI.parse(uri);
}
exports.toUriComponents = toUriComponents;
function fromUriComponents(uri) {
    return vscode_uri_1.URI.revive(uri).toString();
}
exports.fromUriComponents = fromUriComponents;
function fromLocation(location) {
    return {
        uri: vscode_uri_1.URI.parse(location.uri),
        range: fromRange(location.range)
    };
}
exports.fromLocation = fromLocation;
function toLocation(uri, range) {
    return {
        uri: vscode_uri_1.URI.revive(uri).toString(),
        range: toRange(range)
    };
}
exports.toLocation = toLocation;
function fromPosition(position) {
    return {
        lineNumber: position.line,
        column: position.character
    };
}
exports.fromPosition = fromPosition;
function fromRange(range) {
    var start = range.start, end = range.end;
    return {
        startLineNumber: start.line,
        startColumn: start.character,
        endLineNumber: end.line,
        endColumn: end.character
    };
}
exports.fromRange = fromRange;
function toRange(range) {
    return callhierarchy.Range.create(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn);
}
exports.toRange = toRange;
var SymbolKindConverter;
(function (SymbolKindConverter) {
    // tslint:disable-next-line:no-null-keyword
    var fromMapping = Object.create(null);
    fromMapping[callhierarchy.SymbolKind.File] = model.SymbolKind.File;
    fromMapping[callhierarchy.SymbolKind.Module] = model.SymbolKind.Module;
    fromMapping[callhierarchy.SymbolKind.Namespace] = model.SymbolKind.Namespace;
    fromMapping[callhierarchy.SymbolKind.Package] = model.SymbolKind.Package;
    fromMapping[callhierarchy.SymbolKind.Class] = model.SymbolKind.Class;
    fromMapping[callhierarchy.SymbolKind.Method] = model.SymbolKind.Method;
    fromMapping[callhierarchy.SymbolKind.Property] = model.SymbolKind.Property;
    fromMapping[callhierarchy.SymbolKind.Field] = model.SymbolKind.Field;
    fromMapping[callhierarchy.SymbolKind.Constructor] = model.SymbolKind.Constructor;
    fromMapping[callhierarchy.SymbolKind.Enum] = model.SymbolKind.Enum;
    fromMapping[callhierarchy.SymbolKind.Interface] = model.SymbolKind.Interface;
    fromMapping[callhierarchy.SymbolKind.Function] = model.SymbolKind.Function;
    fromMapping[callhierarchy.SymbolKind.Variable] = model.SymbolKind.Variable;
    fromMapping[callhierarchy.SymbolKind.Constant] = model.SymbolKind.Constant;
    fromMapping[callhierarchy.SymbolKind.String] = model.SymbolKind.String;
    fromMapping[callhierarchy.SymbolKind.Number] = model.SymbolKind.Number;
    fromMapping[callhierarchy.SymbolKind.Boolean] = model.SymbolKind.Boolean;
    fromMapping[callhierarchy.SymbolKind.Array] = model.SymbolKind.Array;
    fromMapping[callhierarchy.SymbolKind.Object] = model.SymbolKind.Object;
    fromMapping[callhierarchy.SymbolKind.Key] = model.SymbolKind.Key;
    fromMapping[callhierarchy.SymbolKind.Null] = model.SymbolKind.Null;
    fromMapping[callhierarchy.SymbolKind.EnumMember] = model.SymbolKind.EnumMember;
    fromMapping[callhierarchy.SymbolKind.Struct] = model.SymbolKind.Struct;
    fromMapping[callhierarchy.SymbolKind.Event] = model.SymbolKind.Event;
    fromMapping[callhierarchy.SymbolKind.Operator] = model.SymbolKind.Operator;
    fromMapping[callhierarchy.SymbolKind.TypeParameter] = model.SymbolKind.TypeParameter;
    function fromSymbolKind(kind) {
        return fromMapping[kind] || model.SymbolKind.Property;
    }
    SymbolKindConverter.fromSymbolKind = fromSymbolKind;
    // tslint:disable-next-line:no-null-keyword
    var toMapping = Object.create(null);
    toMapping[model.SymbolKind.File] = callhierarchy.SymbolKind.File;
    toMapping[model.SymbolKind.Module] = callhierarchy.SymbolKind.Module;
    toMapping[model.SymbolKind.Namespace] = callhierarchy.SymbolKind.Namespace;
    toMapping[model.SymbolKind.Package] = callhierarchy.SymbolKind.Package;
    toMapping[model.SymbolKind.Class] = callhierarchy.SymbolKind.Class;
    toMapping[model.SymbolKind.Method] = callhierarchy.SymbolKind.Method;
    toMapping[model.SymbolKind.Property] = callhierarchy.SymbolKind.Property;
    toMapping[model.SymbolKind.Field] = callhierarchy.SymbolKind.Field;
    toMapping[model.SymbolKind.Constructor] = callhierarchy.SymbolKind.Constructor;
    toMapping[model.SymbolKind.Enum] = callhierarchy.SymbolKind.Enum;
    toMapping[model.SymbolKind.Interface] = callhierarchy.SymbolKind.Interface;
    toMapping[model.SymbolKind.Function] = callhierarchy.SymbolKind.Function;
    toMapping[model.SymbolKind.Variable] = callhierarchy.SymbolKind.Variable;
    toMapping[model.SymbolKind.Constant] = callhierarchy.SymbolKind.Constant;
    toMapping[model.SymbolKind.String] = callhierarchy.SymbolKind.String;
    toMapping[model.SymbolKind.Number] = callhierarchy.SymbolKind.Number;
    toMapping[model.SymbolKind.Boolean] = callhierarchy.SymbolKind.Boolean;
    toMapping[model.SymbolKind.Array] = callhierarchy.SymbolKind.Array;
    toMapping[model.SymbolKind.Object] = callhierarchy.SymbolKind.Object;
    toMapping[model.SymbolKind.Key] = callhierarchy.SymbolKind.Key;
    toMapping[model.SymbolKind.Null] = callhierarchy.SymbolKind.Null;
    toMapping[model.SymbolKind.EnumMember] = callhierarchy.SymbolKind.EnumMember;
    toMapping[model.SymbolKind.Struct] = callhierarchy.SymbolKind.Struct;
    toMapping[model.SymbolKind.Event] = callhierarchy.SymbolKind.Event;
    toMapping[model.SymbolKind.Operator] = callhierarchy.SymbolKind.Operator;
    toMapping[model.SymbolKind.TypeParameter] = callhierarchy.SymbolKind.TypeParameter;
    function toSymbolKind(kind) {
        return toMapping[kind] || model.SymbolKind.Property;
    }
    SymbolKindConverter.toSymbolKind = toSymbolKind;
})(SymbolKindConverter = exports.SymbolKindConverter || (exports.SymbolKindConverter = {}));
function toDefinition(definition) {
    if (!definition) {
        return undefined;
    }
    return {
        location: {
            uri: fromUriComponents(definition.uri),
            range: toRange(definition.range)
        },
        selectionRange: toRange(definition.selectionRange),
        symbolName: definition.name,
        symbolKind: SymbolKindConverter.toSymbolKind(definition.kind),
        containerName: undefined
    };
}
exports.toDefinition = toDefinition;
function fromDefinition(definition) {
    return {
        uri: toUriComponents(definition.location.uri),
        range: fromRange(definition.location.range),
        selectionRange: fromRange(definition.selectionRange),
        name: definition.symbolName,
        kind: SymbolKindConverter.fromSymbolKind(definition.symbolKind)
    };
}
exports.fromDefinition = fromDefinition;
function toCaller(caller) {
    return {
        callerDefinition: toDefinition(caller.callerDefinition),
        references: caller.references.map(toRange)
    };
}
exports.toCaller = toCaller;
function fromCaller(caller) {
    return {
        callerDefinition: fromDefinition(caller.callerDefinition),
        references: caller.references.map(fromRange)
    };
}
exports.fromCaller = fromCaller;
//# sourceMappingURL=callhierarchy-type-converters.js.map