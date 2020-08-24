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
exports.GitError = exports.BranchType = exports.Repository = exports.GitFileStatus = exports.WorkingDirectoryStatus = void 0;
var uri_1 = require("@theia/core/lib/common/uri");
var WorkingDirectoryStatus;
(function (WorkingDirectoryStatus) {
    /**
     * `true` if the directory statuses are deep equal, otherwise `false`.
     */
    function equals(left, right) {
        if (left && right) {
            return left.exists === right.exists
                && left.branch === right.branch
                && left.upstreamBranch === right.upstreamBranch
                && left.currentHead === right.currentHead
                && (left.aheadBehind ? left.aheadBehind.ahead : -1) === (right.aheadBehind ? right.aheadBehind.ahead : -1)
                && (left.aheadBehind ? left.aheadBehind.behind : -1) === (right.aheadBehind ? right.aheadBehind.behind : -1)
                && left.changes.length === right.changes.length
                && !!left.incomplete === !!right.incomplete
                && JSON.stringify(left) === JSON.stringify(right);
        }
        else {
            return left === right;
        }
    }
    WorkingDirectoryStatus.equals = equals;
})(WorkingDirectoryStatus = exports.WorkingDirectoryStatus || (exports.WorkingDirectoryStatus = {}));
/**
 * Enumeration of states that a file resource can have in the working directory.
 */
var GitFileStatus;
(function (GitFileStatus) {
    GitFileStatus[GitFileStatus["New"] = 0] = "New";
    GitFileStatus[GitFileStatus["Copied"] = 1] = "Copied";
    GitFileStatus[GitFileStatus["Modified"] = 2] = "Modified";
    GitFileStatus[GitFileStatus["Renamed"] = 3] = "Renamed";
    GitFileStatus[GitFileStatus["Deleted"] = 4] = "Deleted";
    GitFileStatus[GitFileStatus["Conflicted"] = 5] = "Conflicted";
})(GitFileStatus = exports.GitFileStatus || (exports.GitFileStatus = {}));
(function (GitFileStatus) {
    /**
     * Compares the statuses based on the natural order of the enumeration.
     */
    GitFileStatus.statusCompare = function (left, right) { return left - right; };
    /**
     * Returns with human readable representation of the Git file status argument. If the `staged` argument is `undefined`,
     * it will be treated as `false`.
     */
    GitFileStatus.toString = function (status, staged) {
        switch (status) {
            case GitFileStatus.New: return !!staged ? 'Added' : 'Unstaged';
            case GitFileStatus.Renamed: return 'Renamed';
            case GitFileStatus.Copied: return 'Copied';
            case GitFileStatus.Modified: return 'Modified';
            case GitFileStatus.Deleted: return 'Deleted';
            case GitFileStatus.Conflicted: return 'Conflicted';
            default: throw new Error("Unexpected Git file stats: " + status + ".");
        }
    };
    /**
     * Returns with the human readable abbreviation of the Git file status argument. `staged` argument defaults to `false`.
     */
    GitFileStatus.toAbbreviation = function (status, staged) { return GitFileStatus.toString(status, staged).charAt(0); };
    /**
     * It should be aligned with https://github.com/microsoft/vscode/blob/0dfa355b3ad185a6289ba28a99c141ab9e72d2be/extensions/git/src/repository.ts#L197
     */
    function getColor(status, staged) {
        switch (status) {
            case GitFileStatus.New: {
                if (!staged) {
                    return 'var(--theia-gitDecoration-untrackedResourceForeground)';
                }
                return 'var(--theia-gitDecoration-addedResourceForeground)';
            }
            case GitFileStatus.Renamed: return 'var(--theia-gitDecoration-untrackedResourceForeground)';
            case GitFileStatus.Copied: // Fall through.
            case GitFileStatus.Modified: return 'var(--theia-gitDecoration-modifiedResourceForeground)';
            case GitFileStatus.Deleted: return 'var(--theia-gitDecoration-deletedResourceForeground)';
            case GitFileStatus.Conflicted: return 'var(--theia-gitDecoration-conflictingResourceForeground)';
        }
    }
    GitFileStatus.getColor = getColor;
})(GitFileStatus = exports.GitFileStatus || (exports.GitFileStatus = {}));
var Repository;
(function (Repository) {
    function equal(repository, repository2) {
        if (repository && repository2) {
            return repository.localUri === repository2.localUri;
        }
        return repository === repository2;
    }
    Repository.equal = equal;
    function is(repository) {
        return !!repository && 'localUri' in repository;
    }
    Repository.is = is;
    function relativePath(repository, uri) {
        var repositoryUri = new uri_1.default(Repository.is(repository) ? repository.localUri : String(repository));
        return repositoryUri.relative(new uri_1.default(String(uri)));
    }
    Repository.relativePath = relativePath;
})(Repository = exports.Repository || (exports.Repository = {}));
/**
 * The branch type. Either local or remote.
 * The order matters.
 */
var BranchType;
(function (BranchType) {
    /**
     * The local branch type.
     */
    BranchType[BranchType["Local"] = 0] = "Local";
    /**
     * The remote branch type.
     */
    BranchType[BranchType["Remote"] = 1] = "Remote";
})(BranchType = exports.BranchType || (exports.BranchType = {}));
/**
 * The Git errors which can be parsed from failed Git commands.
 */
var GitError;
(function (GitError) {
    GitError[GitError["SSHKeyAuditUnverified"] = 0] = "SSHKeyAuditUnverified";
    GitError[GitError["SSHAuthenticationFailed"] = 1] = "SSHAuthenticationFailed";
    GitError[GitError["SSHPermissionDenied"] = 2] = "SSHPermissionDenied";
    GitError[GitError["HTTPSAuthenticationFailed"] = 3] = "HTTPSAuthenticationFailed";
    GitError[GitError["RemoteDisconnection"] = 4] = "RemoteDisconnection";
    GitError[GitError["HostDown"] = 5] = "HostDown";
    GitError[GitError["RebaseConflicts"] = 6] = "RebaseConflicts";
    GitError[GitError["MergeConflicts"] = 7] = "MergeConflicts";
    GitError[GitError["HTTPSRepositoryNotFound"] = 8] = "HTTPSRepositoryNotFound";
    GitError[GitError["SSHRepositoryNotFound"] = 9] = "SSHRepositoryNotFound";
    GitError[GitError["PushNotFastForward"] = 10] = "PushNotFastForward";
    GitError[GitError["BranchDeletionFailed"] = 11] = "BranchDeletionFailed";
    GitError[GitError["DefaultBranchDeletionFailed"] = 12] = "DefaultBranchDeletionFailed";
    GitError[GitError["RevertConflicts"] = 13] = "RevertConflicts";
    GitError[GitError["EmptyRebasePatch"] = 14] = "EmptyRebasePatch";
    GitError[GitError["NoMatchingRemoteBranch"] = 15] = "NoMatchingRemoteBranch";
    GitError[GitError["NothingToCommit"] = 16] = "NothingToCommit";
    GitError[GitError["NoSubmoduleMapping"] = 17] = "NoSubmoduleMapping";
    GitError[GitError["SubmoduleRepositoryDoesNotExist"] = 18] = "SubmoduleRepositoryDoesNotExist";
    GitError[GitError["InvalidSubmoduleSHA"] = 19] = "InvalidSubmoduleSHA";
    GitError[GitError["LocalPermissionDenied"] = 20] = "LocalPermissionDenied";
    GitError[GitError["InvalidMerge"] = 21] = "InvalidMerge";
    GitError[GitError["InvalidRebase"] = 22] = "InvalidRebase";
    GitError[GitError["NonFastForwardMergeIntoEmptyHead"] = 23] = "NonFastForwardMergeIntoEmptyHead";
    GitError[GitError["PatchDoesNotApply"] = 24] = "PatchDoesNotApply";
    GitError[GitError["BranchAlreadyExists"] = 25] = "BranchAlreadyExists";
    GitError[GitError["BadRevision"] = 26] = "BadRevision";
    GitError[GitError["NotAGitRepository"] = 27] = "NotAGitRepository";
    GitError[GitError["CannotMergeUnrelatedHistories"] = 28] = "CannotMergeUnrelatedHistories";
    GitError[GitError["LFSAttributeDoesNotMatch"] = 29] = "LFSAttributeDoesNotMatch";
    GitError[GitError["BranchRenameFailed"] = 30] = "BranchRenameFailed";
    GitError[GitError["PathDoesNotExist"] = 31] = "PathDoesNotExist";
    GitError[GitError["InvalidObjectName"] = 32] = "InvalidObjectName";
    GitError[GitError["OutsideRepository"] = 33] = "OutsideRepository";
    GitError[GitError["LockFileAlreadyExists"] = 34] = "LockFileAlreadyExists";
    // GitHub-specific error codes
    GitError[GitError["PushWithFileSizeExceedingLimit"] = 35] = "PushWithFileSizeExceedingLimit";
    GitError[GitError["HexBranchNameRejected"] = 36] = "HexBranchNameRejected";
    GitError[GitError["ForcePushRejected"] = 37] = "ForcePushRejected";
    GitError[GitError["InvalidRefLength"] = 38] = "InvalidRefLength";
    GitError[GitError["ProtectedBranchRequiresReview"] = 39] = "ProtectedBranchRequiresReview";
    GitError[GitError["ProtectedBranchForcePush"] = 40] = "ProtectedBranchForcePush";
    GitError[GitError["ProtectedBranchDeleteRejected"] = 41] = "ProtectedBranchDeleteRejected";
    GitError[GitError["ProtectedBranchRequiredStatus"] = 42] = "ProtectedBranchRequiredStatus";
    GitError[GitError["PushWithPrivateEmail"] = 43] = "PushWithPrivateEmail";
})(GitError = exports.GitError || (exports.GitError = {}));
//# sourceMappingURL=git-model.js.map