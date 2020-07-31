"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promise_util_1 = require("@theia/core/lib/common/promise-util");
function hookCancellationToken(token, promise) {
    return new Promise(function (resolve, reject) {
        var sub = token.onCancellationRequested(function () { return reject(new Error('This promise is cancelled')); });
        promise.then(function (value) {
            sub.dispose();
            resolve(value);
        }).catch(function (err) {
            sub.dispose();
            reject(err);
        });
    });
}
exports.hookCancellationToken = hookCancellationToken;
function anyPromise(promises) {
    var result = new promise_util_1.Deferred();
    if (promises.length === 0) {
        result.resolve();
    }
    promises.forEach(function (val, key) {
        Promise.resolve(promises[key]).then(function () {
            result.resolve({ key: key, value: promises[key] });
        }, function (err) {
            result.resolve({ key: key, value: promises[key] });
        });
    });
    return result.promise;
}
exports.anyPromise = anyPromise;
//# sourceMappingURL=async-util.js.map