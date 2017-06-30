/* Contains the unit tests */

var addressFailCallback = function(data, error) {
  this.assert.equal(!Boolean(data) && error.status !== 200, true, "The failure condition is caught successfully");
  this.done();
};

var addressCallback = function(data) {
  var result;

  try {
    result = Boolean(data);
  } catch(e) {
    result = false;
  }

  this.assert.equal(result, true, "The success condition is successful");
  this.done();
};

QUnit.module('Address.ProWeb tests');

QUnit.test('DoCanSearch functions as intended', function(assert) {
  let proWebSuccess = assert.async(2)

  EDQ.address.proWeb.doCanSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: 'EDQDemoLayout',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWeb.doCanSearch({
    country: '',
    engineOptions: {},
    engineType: 'Verification',
    layout: '',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

});

QUnit.test('DoGetAddress functions as intended', function(assert) {
  assert.equal(Boolean(EDQ.address.proWeb.doGetAddress), true, "The request can be made");

  var proWebSuccess = assert.async();
  var proWebFail    = assert.async();

  EDQ.address.proWeb.doSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: 'EDQDemoLayout',
    addressQuery: '125 Summer Street, Boston MA 02110',
    formattedAddressInPicklist: false,

    callback: function(data) {
      EDQ.address.proWeb.doGetAddress({
        moniker: data.Envelope.Body.QASearchResult.QAPicklist.FullPicklistMoniker,
        layout: 'EDQDemoLayout',
        callback: addressCallback.bind({assert: assert, done: proWebSuccess})
      });
    }
  });

  EDQ.address.proWeb.doGetAddress({
    moniker: 'dUSA|5133da03-d155-42b1-aa14-8f7237ae901c|7.610FOUSADwHhBwAAAAABAwEAAAADmDtekgAhEAIYACAAAAAAAAAAAP..AAAAAAD.....AAAAAAAAAAAAAAAAAAAARXhwZXJpYW4A',
    layout: 'EDQDemoLayout',
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });

});

QUnit.test('DoGetData functions as intended', function(assert) {
  var proWebSuccess = assert.async(2);

  EDQ.address.proWeb.doGetData({
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWeb.doGetData({
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });
});

QUnit.test('DoGetDataMapDetail functions as intended', function(assert) {
  assert.equal(Boolean(EDQ.address.proWeb.doGetDataMapDetail), true, "The request can be made");
});

QUnit.test('DoGetExampleAddresses functions as intended', function(assert) {
  assert.equal(Boolean(EDQ.address.proWeb.doGetExampleAddresses), true, "The request can be made");

  var proWebSuccess = assert.async();
  var proWebFail    = assert.async();

  EDQ.address.proWeb.doGetExampleAddresses({
    country: 'USA',
    layout: 'AllElements',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWeb.doGetExampleAddresses({
    country: 'USA',
    layout: 'AllElementsp',
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });
});

QUnit.test('DoGetLayouts functions as intended', function(assert) {
  var proWebSuccess = assert.async();
  var proWebFail    = assert.async();

  EDQ.address.proWeb.doGetLayouts({
    country: 'USA',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWeb.doGetLayouts({
    country: 'USAp',
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });
});

QUnit.test('DoGetLicenseInfo functions as intended', function(assert) {
  try {
    EDQ.address.proWeb.doGetLicenseInfo({
      callback: function(d, e) {
      }
    });
  } catch(e) {
    assert.equal(Boolean(e), true, 'DoGetLicenseInfo fails as expected');
  }
  assert.equal(Boolean(EDQ.address.proWeb.doRefine), true, "The request can be made");
});

QUnit.test('DoPromptSet functions as intended', function(assert) {
  assert.equal(Boolean(EDQ.address.proWeb.doRefine), true, "The request can be made");

  var proWebSuccess = assert.async();
  var proWebFail    = assert.async();

  EDQ.address.proWeb.doGetPromptSet({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    promptSet: 'Default',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWeb.doGetPromptSet({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    promptSet: 'Defaultp',
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });

});

QUnit.test('DoGetSystemInfo functions as intended', function(assert) {
  var proWebSuccess = assert.async(2);

  EDQ.address.proWeb.doGetSystemInfo({
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWeb.doGetSystemInfo({
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

});

QUnit.test('DoRefine functions as intended', function(assert) {
  var proWebSuccess = assert.async();
  var proWebFail    = assert.async();

  EDQ.address.proWeb.doSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: 'EDQDemoLayout',
    addressQuery: '02110',
    formattedAddressInPicklist: false,
    callback: function(data) {
      EDQ.address.proWeb.doRefine({
        country: 'USA',
        refineOptions: {},
        layout: 'EDQDemoLayout',
        moniker: data.Envelope.Body.QASearchResult.QAPicklist.FullPicklistMoniker,
        refinement: '',
        formattedAddressInPicklist: false,
        callback: addressCallback.bind({assert: assert, done: proWebSuccess})
      });
    }
 });

  EDQ.address.proWeb.doRefine({
    country: 'USA',
    refineOptions: {},
    layout: 'EDQDemoLayoutd',
    moniker: 'USA|b0a60fcd-9dda-4629-a233-a356d35e9aec|7.610jTUSADwHhBwAAAAACAQAAQAAAAAEAAAD3QQAAAAAAADAyMTEwAA--',
    refinement: '',
    formattedAddressInPicklist: false,
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });

});

QUnit.test('DoSearch functions as intended', function(assert) {
  var proWebSuccess = assert.async();
  var proWebFail    = assert.async();

  EDQ.address.proWeb.doSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: 'EDQDemoLayout',
    addressQuery: '125 Summer Street, Ste 110, Boston MA 02110',
    formattedAddressInPicklist: false,
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWeb.doSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: 'EDQDemoLayoutd',
    addressQuery: '125 Summer Street, Ste 110, Boston MA 02110',
    formattedAddressInPicklist: false,
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });

});

QUnit.module('Address.GlobalIntuitive tests');

QUnit.test('Search functions as intended', function(assert) {
  var searchSuccess = assert.async();
  var searchFail    = assert.async();

  EDQ.address.globalIntuitive.search({
    query: '125 Summer Street',
    country: 'USA',
    callback: addressCallback.bind({assert: assert, done: searchSuccess})
  });

  EDQ.address.globalIntuitive.search({
    query: '',
    country: 'USA',
    callback: addressFailCallback.bind({assert: assert, done: searchFail})
  });

});

QUnit.test('Format address by URL functions as intended', function(assert) {
  var searchSuccess = assert.async();
  var searchFail    = assert.async();

  EDQ.address.globalIntuitive.search({
    query: '125 Summer Street',
    country: 'USA',
    callback: function(data) {
      const formatUrl = data.results[0].format;

      EDQ.address.globalIntuitive.format({
        formatUrl,
        callback: addressCallback.bind({assert: assert, done: searchSuccess})
      });
    }
  });

  EDQ.address.globalIntuitive.format({
    formatUrl: '',
    callback: addressFailCallback.bind({assert: assert, done: searchFail})
  });
});

QUnit.module('Address.ProWebOnPremise tests');

var goodLayout = '( QAS Standard Layout )';
var badLayout = 'blah';

QUnit.begin(function() {
});

QUnit.testStart(function() {
});

QUnit.test('DoSearch functions as intended', function(assert) {
  window.EdqConfig = {};
  window.EdqConfig.PRO_WEB_SERVICE_URL = 'http://bosse:2727/';

  var proWebSuccess = assert.async();
  var proWebFail = assert.async();

  EDQ.address.proWebOnPremise.doSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: goodLayout,
    addressQuery: '125 Summer Street, Boston MA',
    formattedAddressInPicklist: false,
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: badLayout,
    addressQuery: '125 Summer Street, Boston MA',
    formattedAddressInPicklist: false,
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });

});

QUnit.test('DoRefine functions as intended', function(assert) {
  var proWebSuccess = assert.async();
  var proWebFail    = assert.async();

  EDQ.address.proWebOnPremise.doSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: goodLayout,
    addressQuery: '125 Summer Street, Boston MA 02110',
    formattedAddressInPicklist: false,
    callback: function(data) {
      EDQ.address.proWebOnPremise.doRefine({
        onPremise: true,
        country: 'USA',
        refineOptions: {},
        layout: goodLayout,
        moniker: data.Envelope.Body.QASearchResult.QAPicklist.FullPicklistMoniker,
        refinement: '',
        formattedAddressInPicklist: false,
        callback: addressCallback.bind({assert: assert, done: proWebSuccess})
      });
    }
 });

  EDQ.address.proWebOnPremise.doRefine({
    country: 'USA',
    refineOptions: {},
    layout: goodLayout,
    moniker: 'USA|b0a60fcd-9dda-4629-a233-a356d35e9aec|7.610jTUSADwHhBwAAAAACAQAAQAAAAAEAAAD3QQAAAAAAADAyMTEwAA--',
    refinement: '',
    formattedAddressInPicklist: false,
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });
});

QUnit.test('DoGetSystemInfo functions as intended', function(assert) {
  var proWebSuccess = assert.async(2);

  EDQ.address.proWebOnPremise.doGetSystemInfo({
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doGetSystemInfo({
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

});

QUnit.test('DoPromptSet functions as intended', function(assert) {
  var proWebSuccess = assert.async();
  var proWebFail    = assert.async();

  EDQ.address.proWebOnPremise.doGetPromptSet({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    promptSet: 'Default',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doGetPromptSet({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    promptSet: 'Defaultp',
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });

});

QUnit.test('DoGetLayouts functions as intended', function(assert) {
  var proWebSuccess = assert.async();
  var proWebFail    = assert.async();

  EDQ.address.proWebOnPremise.doGetLayouts({
    country: 'USA',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doGetLayouts({
    country: 'USAp',
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });
});

QUnit.test('DoGetLicenseInfo functions as intended', function(assert) {
  var proWebSuccess = assert.async();

  EDQ.address.proWebOnPremise.doGetLicenseInfo({
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

});

QUnit.test('DoGetExampleAddresses functions as intended', function(assert) {
  var proWebSuccess = assert.async();
  var proWebFail    = assert.async();

  EDQ.address.proWebOnPremise.doGetExampleAddresses({
    country: 'USA',
    layout: goodLayout,
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doGetExampleAddresses({
    country: 'USA',
    layout: badLayout,
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });
});

QUnit.test('DoGetAddress functions as intended', function(assert) {
  var proWebSuccess = assert.async();
  var proWebFail    = assert.async();

  EDQ.address.proWebOnPremise.doSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: goodLayout,
    addressQuery: '125 Summer Street, Boston MA 02110',
    formattedAddressInPicklist: false,

    callback: function(data) {
      EDQ.address.proWebOnPremise.doGetAddress({
        moniker: data.Envelope.Body.QASearchResult.QAPicklist.FullPicklistMoniker,
        layout: goodLayout,
        callback: addressCallback.bind({assert: assert, done: proWebSuccess})
      });
    }
  });

  EDQ.address.proWebOnPremise.doGetAddress({
    moniker: 'dUSA|5133da03-d155-42b1-aa14-8f7237ae901c|7.610FOUSADwHhBwAAAAABAwEAAAADmDtekgAhEAIYACAAAAAAAAAAAP..AAAAAAD.....AAAAAAAAAAAAAAAAAAAARXhwZXJpYW4A',
    layout: 'EDQDemoLayout',
    callback: addressFailCallback.bind({assert: assert, done: proWebFail})
  });

});

QUnit.test('DoCanSearch functions as intended', function(assert) {
  let proWebSuccess = assert.async(2)

  EDQ.address.proWebOnPremise.doCanSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: goodLayout,
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doCanSearch({
    country: '',
    engineOptions: {},
    engineType: 'Verification',
    layout: badLayout,
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

});

QUnit.test('DoGetData functions as intended', function(assert) {
  var proWebSuccess = assert.async(2);

  EDQ.address.proWebOnPremise.doGetData({
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doGetData({
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });
});


QUnit.test('DoGetDataMapDetail functions as intended', function(assert) {
  var proWebSuccess = assert.async(2);

  EDQ.address.proWebOnPremise.doGetDataMapDetail({
    dataMap: 'USA',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doGetDataMapDetail({
    dataMap: '',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

});

QUnit.test('DoGetDataHashCode functions as intended', function(assert) {
  var proWebSuccess = assert.async(2);

  EDQ.address.proWebOnPremise.doGetDataHashCode({
    unlockCode: '',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doGetDataHashCode({
    dataMap: 'asdf',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

});

QUnit.test('DoUnlockDPV functions as intended', function(assert) {
  var proWebSuccess = assert.async(2);

  EDQ.address.proWebOnPremise.doUnlockDPV({
    unlockCode: '',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doUnlockDPV({
    unlockCode: 'asdf',
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

});

QUnit.test('DoGetDPVStatus functions as intended', function(assert) {
  var proWebSuccess = assert.async(2);

  EDQ.address.proWebOnPremise.doGetDPVStatus({
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doGetDPVStatus({
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });
});

QUnit.test('DoBulkSearch functions as intended', function(assert) {
  var proWebSuccess = assert.async(2);

  EDQ.address.proWebOnPremise.doBulkSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: goodLayout,
    formattedAddressInPicklist: false,
    searches: ['125 Summer Street, Boston MA 02110', '53 State Street, Boston MA 02110'],
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });

  EDQ.address.proWebOnPremise.doBulkSearch({
    country: 'USA',
    engineOptions: {},
    engineType: 'Verification',
    layout: goodLayout,
    formattedAddressInPicklist: false,
    searches: ['125 Summer Street, Boston MA 02110'],
    callback: addressCallback.bind({assert: assert, done: proWebSuccess})
  });
});

