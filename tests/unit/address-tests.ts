import intern from 'intern';


const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');
const EDQ = window.EDQ;

const addressFailCallback = function(data, error) {
  this.assert.equal(!Boolean(data) && error.status !== 200, true, "The failure condition is caught successfully");
  this.done();
};

const addressCallback = function(data) {
  var result;

  try {
    result = Boolean(data);
  } catch(e) {
    result = false;
  }

  this.assert.equal(result, true, "The success condition is successful");
  this.done();
};

registerSuite('Address.ProWebOnDemand tests', {
  'DoCanSearch functions as intended'() {
    if (typeof window === 'undefined') {
      this.skip('browser-only test');
    }

    const proWebSuccess = assert.async();
    const proWebFail = assert.async();

    EDQ.address.proWebOnDemand.doSearch({
      country: 'USA',
      engineOptions: {},
      engineType: 'Verification',
      layout: 'EDQDemoLayout',
      addressQuery: '125 Summer Street, Boston MA 02110',
      formattedAddressInPicklist: false,

      callback: function(data) {
        EDQ.address.proWebOnDemand.doGetAddress({
          moniker: data.Envelope.Body.QASearchResult.QAPicklist.FullPicklistMoniker,
          layout: 'EDQDemoLayout',
          callback: addressCallback.bind({assert: assert, done: proWebSuccess})
        });
      }
    });

    EDQ.address.proWebOnDemand.doGetAddress({
      moniker: 'dUSA|5133da03-d155-42b1-aa14-8f7237ae901c|7.610FOUSADwHhBwAAAAABAwEAAAADmDtekgAhEAIYACAAAAAAAAAAAP..AAAAAAD.....AAAAAAAAAAAAAAAAAAAARXhwZXJpYW4A',
      layout: 'EDQDemoLayout',
      callback: addressFailCallback.bind({assert: assert, done: proWebFail})
    });

  }
});

