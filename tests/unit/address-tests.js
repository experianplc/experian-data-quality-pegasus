"use strict";
exports.__esModule = true;
var intern_1 = require("intern");
var registerSuite = intern_1["default"].getInterface('object').registerSuite;
var assert = intern_1["default"].getPlugin('chai').assert;
var EDQ = window.EDQ;
var addressFailCallback = function (data, error) {
    this.assert.equal(!Boolean(data) && error.status !== 200, true, "The failure condition is caught successfully");
    this.done();
};
var addressCallback = function (data) {
    var result;
    try {
        result = Boolean(data);
    }
    catch (e) {
        result = false;
    }
    this.assert.equal(result, true, "The success condition is successful");
    this.done();
};
registerSuite('Address.ProWebOnDemand tests', {
    'DoCanSearch functions as intended': function () {
        if (typeof window === 'undefined') {
            this.skip('browser-only test');
        }
        var proWebSuccess = assert.async();
        var proWebFail = assert.async();
        EDQ.address.proWebOnDemand.doSearch({
            country: 'USA',
            engineOptions: {},
            engineType: 'Verification',
            layout: 'EDQDemoLayout',
            addressQuery: '125 Summer Street, Boston MA 02110',
            formattedAddressInPicklist: false,
            callback: function (data) {
                EDQ.address.proWebOnDemand.doGetAddress({
                    moniker: data.Envelope.Body.QASearchResult.QAPicklist.FullPicklistMoniker,
                    layout: 'EDQDemoLayout',
                    callback: addressCallback.bind({ assert: assert, done: proWebSuccess })
                });
            }
        });
        EDQ.address.proWebOnDemand.doGetAddress({
            moniker: 'dUSA|5133da03-d155-42b1-aa14-8f7237ae901c|7.610FOUSADwHhBwAAAAABAwEAAAADmDtekgAhEAIYACAAAAAAAAAAAP..AAAAAAD.....AAAAAAAAAAAAAAAAAAAARXhwZXJpYW4A',
            layout: 'EDQDemoLayout',
            callback: addressFailCallback.bind({ assert: assert, done: proWebFail })
        });
    }
});
