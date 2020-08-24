/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export var EditorActivation;
(function (EditorActivation) {
    /**
     * Activate the editor after it opened. This will automatically restore
     * the editor if it is minimized.
     */
    EditorActivation[EditorActivation["ACTIVATE"] = 0] = "ACTIVATE";
    /**
     * Only restore the editor if it is minimized but do not activate it.
     *
     * Note: will only work in combination with the `preserveFocus: true` option.
     * Otherwise, if focus moves into the editor, it will activate and restore
     * automatically.
     */
    EditorActivation[EditorActivation["RESTORE"] = 1] = "RESTORE";
    /**
     * Preserve the current active editor.
     *
     * Note: will only work in combination with the `preserveFocus: true` option.
     * Otherwise, if focus moves into the editor, it will activate and restore
     * automatically.
     */
    EditorActivation[EditorActivation["PRESERVE"] = 2] = "PRESERVE";
})(EditorActivation || (EditorActivation = {}));
export var EditorOpenContext;
(function (EditorOpenContext) {
    /**
     * Default: the editor is opening via a programmatic call
     * to the editor service API.
     */
    EditorOpenContext[EditorOpenContext["API"] = 0] = "API";
    /**
     * Indicates that a user action triggered the opening, e.g.
     * via mouse or keyboard use.
     */
    EditorOpenContext[EditorOpenContext["USER"] = 1] = "USER";
})(EditorOpenContext || (EditorOpenContext = {}));
