/**
 * @global
 */

(function() {
  /* Configuration */

  /** Used to be granted authorization to make calls to the ProWebOnDemand webservice
   *
   * @name PRO_WEB_AUTH_TOKEN
   * @type {String}
   */

  /** Configuration file that can optionally be used, if configuration is external to this library.
   *  This approach is recommended.
   *
   *  @type {Object}
   */
  const EDQ_CONFIG = window.EdqConfig || <EdqConfigObject> {};

	const PRO_WEB_AUTH_TOKEN               = EDQ_CONFIG.PRO_WEB_AUTH_TOKEN || '46832a16-80c0-43d8-af8e-05b3dde5aaaf';
  const PHONE_VALIDATE_PLUS_AUTH_TOKEN   = EDQ_CONFIG.PHONE_VALIDATE_PLUS_AUTH_TOKEN || '1793360f-3d97-451a-81b8-d7e765c48894';
  const GLOBAL_PHONE_VALIDATE_AUTH_TOKEN = EDQ_CONFIG.GLOBAL_PHONE_VALIDATE_AUTH_TOKEN || '1793360f-3d97-451a-81b8-d7e765c48894';
  const EMAIL_VALIDATE_AUTH_TOKEN        = EDQ_CONFIG.EMAIL_VALIDATE_AUTH_TOKEN || '1793360f-3d97-451a-81b8-d7e765c48894';
  const GLOBAL_INTUITIVE_AUTH_TOKEN      = EDQ_CONFIG.GLOBAL_INTUITIVE_AUTH_TOKEN || '8c9faaa4-a5d2-4036-808d-11208a2e52d8';

  /** Service for ProWebOnDemand endpoint. Do not change unless you have a proxy to use
   *
   * @name PRO_WEB_SERVICE_URL
   * @type {String}
   */
	const PRO_WEB_SERVICE_URL       = EDQ_CONFIG.PRO_WEB_SERVICE_URL || 'https://ws2.ondemand.qas.com/ProOnDemand/V3/ProOnDemandService.asmx';
  const PHONE_VALIDATE_PLUS_URL   = 'https://api.experianmarketingservices.com/sync/queryresult/PhoneValidatePlus/1.0/';
  const GLOBAL_PHONE_VALIDATE_URL = 'https://api.experianmarketingservices.com/sync/queryresult/PhoneValidate/3.0/';
  const EMAIL_VALIDATE_URL        = 'https://api.experianmarketingservices.com/sync/queryresult/EmailValidate/1.0/';
  const GLOBAL_INTUITIVE_URL      = 'https://api.edq.com/capture/address/v2';

  /************************** end Configuration *********************************/

	const root = this;
	const previousEdq = root.EDQ;

  let EDQ = <EDQ>{};
  root.EDQ = EDQ;

	function _proWebHelpers(
    serviceUrl = 'https://ws2.ondemand.qas.com/ProOnDemand/V3/ProOnDemandService.asmx',
    soapActionUrlPrefix = 'http://www.qas.com/OnDemand-2011-03'
  ) {

    this.serviceUrl = serviceUrl;
    this.soapActionUrlPrefix = soapActionUrlPrefix;

    /*
     * @param {Boolean} onPremise
     * @param {String} country
     * @param {Object} engineOptions
     * @param {String} engineType
     * @param {String} layout
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
		this.doCanSearch = function({onPremise, country, engineOptions, engineType, layout, callback}) {
			const soapActionUrl = `${soapActionUrlPrefix}/DoCanSearch`;
			const xmlRequest = this.buildDoCanSearch({country, engineOptions, engineType, layout, onPremise});
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {String} layout
     * @param {String} moniker
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
		this.doGetAddress = function({layout, moniker, callback, onPremise}) {
			const soapActionUrl = `${soapActionUrlPrefix}/DoGetAddress`;
			const xmlRequest = this.buildDoGetAddressMessage({layout, moniker, onPremise});
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
		this.doGetData = function({callback}) {
			const soapActionUrl = `${soapActionUrlPrefix}/DoGetData`;
			const xmlRequest = this.buildDoGetDataMessage();
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {String} dataMap
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
		this.doGetDataMapDetail = function({dataMap, callback, onPremise}) {
      if (serviceUrl === 'https://ws2.ondemand.qas.com/ProOnDemand/V3/ProOnDemandService.asmx') {
        throw "This SOAP method is not supported in this version of QAS Pro On Demand";
      }

			const soapActionUrl = `${soapActionUrlPrefix}/DoGetDataMapDetail`;
			const xmlRequest = this.buildDoGetDataMapDetail({dataMap, onPremise});
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {Boolean} onPremise
     * @param {String} dataMap
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
		this.doGetDataHashCode = function({onPremise, callback}) {
      if (serviceUrl === 'https://ws2.ondemand.qas.com/ProOnDemand/V3/ProOnDemandService.asmx') {
        throw "This SOAP method is not supported in this version of QAS Pro On Demand";
      }

			const soapActionUrl = `${soapActionUrlPrefix}/DoGetDataHashCode`;
			const xmlRequest = this.buildDoGetDataHashCode(onPremise);
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {Boolean} onPremise
     * @param {String} unlockCode
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.doUnlockDPV = function({onPremise, unlockCode, callback}) {
      if (serviceUrl === 'https://ws2.ondemand.qas.com/ProOnDemand/V3/ProOnDemandService.asmx') {
        throw "This SOAP method is not supported in this version of QAS Pro On Demand";
      }

			const soapActionUrl = `${soapActionUrlPrefix}/DoUnlockDPV`;
			const xmlRequest = this.buildDoUnlockDPV({unlockCode, onPremise});
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
    };

    /*
     * @param {Boolean} onPremise
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.doGetDPVStatus = function({onPremise, callback}) {
      if (serviceUrl === 'https://ws2.ondemand.qas.com/ProOnDemand/V3/ProOnDemandService.asmx') {
        throw "This SOAP method is not supported in this version of QAS Pro On Demand";
      }

			const soapActionUrl = `${soapActionUrlPrefix}/DoGetDPVStatus`;
			const xmlRequest = this.buildDoGetDPVStatus({onPremise});
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
    };

    /*
     * @param {Boolean} onPremise
     * @param {String} country
     * @param {String} layout
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
		this.doGetExampleAddresses = function({onPremise, country, layout, callback}) {
			const soapActionUrl = `${soapActionUrlPrefix}/DoGetExampleAddresses`;
			const xmlRequest = this.buildDoGetExampleAddressesMessage({country, layout, onPremise});
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {Boolean} onPremise
     * @param {Array<String>} searches
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
		this.doBulkSearch = function({
      onPremise,
      country,
      engineOptions,
      engineType,
      layout,
      searches,
      formattedAddressInPicklist,
      callback
    }) {
			const soapActionUrl = `${soapActionUrlPrefix}/DoBulkSearch`;
			const xmlRequest = this.buildDoBulkSearch({
        searches,
        onPremise,
        country,
        engineOptions,
        engineType,
        layout,
        formattedAddressInPicklist
      });
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    this.buildDoBulkSearch = function({searches, country, engineOptions, engineType, layout, onPremise}) {
			const xmlString =
				'<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
				'<soapenv:Body>' +
				`<${onPremise ? 'web' : 'ond'}:QABulkSearch ${onPremise ? 'Language' : 'Localisation'}="">` +
				this._buildSoapCountryString(country, onPremise) +
				this._buildSoapEngineString({engineOptions, engineType, onPremise}) +
				this._buildSoapLayoutString(layout, onPremise) +
        `<${onPremise ? 'web' : 'ond'}:BulkSearchTerm Count="">` +
				searches.map((search) => { return this._buildSoapSearchString(search, onPremise) }).join('') +
        `</${onPremise ? 'web' : 'ond'}:BulkSearchTerm>` +
				`</${onPremise ? 'web' : 'ond'}:QABulkSearch>` +
				'</soapenv:Body>' +
				'</soapenv:Envelope>';

			return xmlString;
    }

    /*
     * @param {String} country
     * @param {Boolean} onPremise
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
		this.doGetLayouts =  function({country, onPremise, callback}) {
			const soapActionUrl = `${soapActionUrlPrefix}/DoGetLayouts`;
			const xmlRequest = this.buildDoGetLayoutsMessage({country, onPremise});
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {Boolean} onPremise
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
		this.doGetLicenseInfo = function({callback, onPremise}) {
      if (serviceUrl === 'https://ws2.ondemand.qas.com/ProOnDemand/V3/ProOnDemandService.asmx') {
        throw "This SOAP method is not supported in this version of QAS Pro On Demand";
      }

			const soapActionUrl = `${soapActionUrlPrefix}/DoGetLicenseInfo`;
			const xmlRequest = this.buildDoGetLicenseInfoMessage({onPremise});
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {Boolean} onPremise
     * @param {String} country
     * @param {Object} engineOptions
     * @param {String} engineType
     * @param {String} promptSet
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
		this.doGetPromptSet = function({country, engineOptions, engineType, promptSet, callback, onPremise}) {
			const soapActionUrl = `${soapActionUrlPrefix}/DoGetPromptSet`;
			const xmlRequest = this.buildDoGetPromptSetMessage({country, engineOptions, engineType, promptSet, onPremise});
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {Boolean} onPremise
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.doGetSystemInfo = function({callback, onPremise}) {
			const soapActionUrl = `${soapActionUrlPrefix}/DoGetSystemInfo`;
			const xmlRequest = this.buildDoGetSystemInfoMessage(onPremise);
			this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {String} refineOptions
     * @param {String} moniker
     * @param {String} refinement
     * @param {String} layout
     * @param {Boolean} formattedAddressInPicklist
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.doRefine = function({
      onPremise,
      refineOptions,
      moniker,
      refinement,
      layout,
      formattedAddressInPicklist,
      callback
    }) {
			const soapActionUrl = `${soapActionUrlPrefix}/DoRefine`;
			const xmlRequest = this.buildDoRefineMessage({
        onPremise,
        refineOptions,
        moniker,
        refinement,
        layout,
        formattedAddressInPicklist,
        callback
      });

			this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

		/*
     * @param {Boolean} onPremise
     * @param {String} country
		 * @param {String} engineOptions
		 * @param {String} engineType
		 * @param {String} layout
		 * @param {String} addressQuery
		 * @param {Boolean} formattedAddressInPicklist
     * @param {Function} callback
		 *
     * @returns {XMLHttpRequest}
		 */
    this.doSearch = function({
      onPremise,
      country,
      engineOptions,
      engineType,
      layout,
      addressQuery,
      formattedAddressInPicklist,
      callback
    }) {
      const soapActionUrl = `${this.soapActionUrlPrefix}/DoSearch`;
      const xmlRequest = this.buildDoSearchMessage({
        onPremise,
        country,
        engineOptions,
        engineType,
        layout,
        addressQuery,
        formattedAddressInPicklist,
        callback
      });

      return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

		/*
     * @param {String} country
		 * @param {String} engineOptions
		 * @param {String} engineType
		 * @param {String} layout
		 * @param {String} doSearch
		 * @param {Boolean} onPremise
		 *
		 * @returns {String}
		 */
		this.buildDoCanSearch = function({country, engineOptions, engineType, layout, onPremise}) {
			const xmlString =
				'<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
				'<soapenv:Body>' +
				`<${onPremise ? 'web' : 'ond'}:QACanSearch ${onPremise ? 'Language' : 'Localisation'}="" RequestTag="">` +
				this._buildSoapCountryString(country, onPremise) +
				this._buildSoapEngineString({engineOptions, engineType, onPremise}) +
				this._buildSoapLayoutString(layout, onPremise) +
				`</${onPremise ? 'web' : 'ond'}:QACanSearch>` +
				'</soapenv:Body>' +
				'</soapenv:Envelope>';

			return xmlString;
		};

		/*
     * @param {String} layout
     * @param {String} onPremise
		 * @param {String} moniker
		 *
		 * @returns {String}
		 */
    this.buildDoGetAddressMessage = function({layout, moniker, onPremise}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QAGetAddress ${onPremise ? 'Language' : 'Localisation'}="" RequestTag="">` +
        this._buildSoapLayoutString(layout, onPremise) +
        this._buildSoapMonikerString(moniker, onPremise) +
        `</${onPremise ? 'web' : 'ond'}:QAGetAddress>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @param {Boolean} onPremise
     * @param {String} unlockCode
     *
     * @returns {String}
     */
    this.buildDoUnlockDPV = function({onPremise, unlockCode}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QAUnlockDPV>` +
        `<${onPremise ? 'web' : 'ond'}:UnlockCode>${unlockCode}</${onPremise ? 'web' : 'ond'}:UnlockCode>` +
        `</${onPremise ? 'web' : 'ond'}:QAUnlockDPV>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @param {Boolean} onPremise
     *
     * @returns {String}
     */
    this.buildDoGetDPVStatus = function({onPremise}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QAGetDPVStatus/>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

		/*
     * @param {Boolean} onPremise
     * @param {String} country
		 * @param {String} layout
		 *
		 * @returns {String}
		 */
    this.buildDoGetExampleAddressesMessage = function({country, layout, onPremise}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QAGetExampleAddresses ${onPremise ? 'Language' : 'Localisation'}="" RequestTag="">` +
        this._buildSoapCountryString(country, onPremise) +
        this._buildSoapLayoutString(layout, onPremise) +
        `</${onPremise ? 'web' : 'ond'}:QAGetExampleAddresses>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

		/*
     * @param {Boolean} onPremise
     *
		 * @returns {String}
		 */
    this.buildDoGetDataMessage = function(onPremise) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QAGetData ${onPremise ? 'Language' : 'Localisation'}="" >` +
        `</${onPremise ? 'web' :'ond'}:QAGetData>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @param {Boolean} onPremise
     *
     * @returns {String}
     */
    this.buildDoGetDataHashCode = function(onPremise) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QAGetDataHashCode ${onPremise ? 'Language' : 'Localisation'}="">` +
        `</${onPremise ? 'web' : 'ond'}:QAGetDataHashCode>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @param {Boolean} onPremise
     * @param {String} dataMap - can be a country, e.g. USA
     *
     * @returns {String}
     */
    this.buildDoGetDataMapDetail = function({dataMap, onPremise}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QAGetDataMapDetail ${onPremise ? 'Language' : 'Localisation'}="">` +
        this._buildSoapDataMapString(dataMap, onPremise) +
        `</${onPremise ? 'web' : 'ond'}:QAGetDataMapDetail>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @param {Boolean} onPremise
     * @returns {String}
     */
    this.buildDoGetLicenseInfoMessage = function({onPremise}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QAGetLicenseInfo ${onPremise ? 'Language' : 'Localisation'}=""/>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    },

    /*
     * @param {Boolean} onPremise
     * @param {String} country
     *
     * @returns {String}
     */
    this.buildDoGetLayoutsMessage = function({country, onPremise}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QAGetLayouts ${onPremise ? 'Language' : 'Localisation'}="">` +
        this._buildSoapCountryString(country, onPremise) +
        `</${onPremise ? 'web' : 'ond'}:QAGetLayouts>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @param {Boolean} onPremise
     * @param {String} country
     * @param {Object} engineOptions
     * @param {String} engineType
     * @param {String} promptSet
     *
     * @returns {String}
     */
    this.buildDoGetPromptSetMessage = function({country, engineOptions, engineType, promptSet, onPremise}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QAGetPromptSet ${onPremise ? 'Language' : 'Localisation'}="">` +
        this._buildSoapCountryString(country, onPremise) +
        this._buildSoapEngineString({engineOptions, engineType, onPremise}) +
        this._buildSoapPromptSetString(promptSet, onPremise) +
        `</${onPremise ? 'web' : 'ond'}:QAGetPromptSet>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @param {Boolean} onPremise
     * @returns {String}
     */
    this.buildDoGetSystemInfoMessage = function(onPremise) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QAGetSystemInfo ${onPremise ? 'Language' : 'Localisation'}=""/>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @param {String} refineOptions
		 * @param {String} moniker
		 * @param {String} refineOptions
		 * @param {String} layout
		 * @param {Boolean} formattedAddressInPicklist
		 *
		 * @returns {String}
		 */
    this.buildDoRefineMessage = function({refineOptions, moniker, refinement, layout, formattedAddressInPicklist, onPremise}) {
      let threshold = this._cleanThreshold(refineOptions.threshold);
      let timeout   = this._cleanTimeout(refineOptions.timeout);

      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
        '<soapenv:Body>' +
        `<${onPremise ? 'web' : 'ond'}:QARefine Threshold="${threshold}" ${onPremise ? 'Language' : 'Localisation'}="" RequestTag="">` +
        this._buildSoapMonikerString(moniker, onPremise) +
        this._buildSoapRefinementString(refinement, onPremise) +
        this._buildSoapLayoutString(layout, onPremise) +
        this._buildSoapFormatString(formattedAddressInPicklist, onPremise) +
				`</${onPremise ? 'web' : 'ond'}:QARefine>` +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

		/*
     * @param {String} country
		 * @param {String} engineOptions
		 * @param {String} engineType
		 * @param {String} layout
		 * @param {String} addressQuery
		 * @param {Boolean} formattedAddressInPicklist
     * @param {Boolean} onPremise
		 *
		 * @returns {String}
		 */
		this.buildDoSearchMessage = function({country, engineOptions, engineType, layout, addressQuery, formattedAddressInPicklist, onPremise}) {
			const xmlString =
				'<soapenv:Envelope ' + this._buildSoapNamespaceSubString(onPremise) + '>' +
				'<soapenv:Body>' +
				`<${onPremise ? 'web' : 'ond'}:QASearch ${onPremise ? 'Language' : 'Localisation'}="" RequestTag="">` +
				this._buildSoapCountryString(country, onPremise) +
				this._buildSoapEngineString({engineOptions, engineType, onPremise}) +
				this._buildSoapLayoutString(layout, onPremise) +
				this._buildSoapSearchString(addressQuery, onPremise) +
				this._buildSoapFormatString(formattedAddressInPicklist, onPremise) +
				`</${onPremise ? 'web' : 'ond'}:QASearch>` +
				'</soapenv:Body>' +
				'</soapenv:Envelope>';

			return xmlString;
		};

    /*
     * @param {String} requestData - a well formed XML string
     * @param {String} soapActionUrl - the SOAP endpoint where the data should be sent
     * @param {Function} callback - a callback that handles success or error.
     *
     * @returns {undefined}
     */
    this.makeRequest = ((requestData, soapActionUrl, callback) => {
      if (!serviceUrl) {
        throw 'Missing PRO_WEB_SERVICE_URL.';
      } else if (!PRO_WEB_AUTH_TOKEN) {
        throw 'Missing PRO_WEB_AUTH_TOKEN';
      }

      let xhr = new XMLHttpRequest();
      let self = this;

      xhr.withCredentials = false;
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {

          if (this.status === 200) {
            callback(self._parseDOMChildren(this.responseXML), null);
          } else {
            callback(null, {
              status: 500,
              statusText: 'Internal Server Error',
              responseType: 'text',
              response: 'Due to limitations in cross origin requests (CORS), the error frome the server could not be ' +
              'referenced here. For more details about the error, resend this request from a client that is not an internet browser'
            });
          }
        }
      };

      xhr.open('POST', serviceUrl);
      xhr.setRequestHeader('Auth-Token', PRO_WEB_AUTH_TOKEN);
      xhr.setRequestHeader('SOAPAction', soapActionUrl);
      xhr.setRequestHeader('Content-Type', 'text/xml');
      xhr.send(requestData);
      return xhr;
    });

		/*** Private methods (shouldn't be called from the service directly) ***/

		/*
     * @param {Boolean} flatten
     * @param {String} intensity
     * @param {String} promptSet
     * @param {Number} threshold
     * @param {Number} timeout
     *
		 * @returns {Object} - a new object that's similar to 'engineOptions', except there are no
		 * undefined values, and instead are replaced with empty strings.
		 */
		this._cleanEngineOptions = function({flatten, intensity, promptSet, threshold, timeout}) {
			return {
				flatten:   flatten   || true,
				intensity: intensity || 'Close',
				promptSet: promptSet || 'Default',
				threshold: this._cleanThreshold(threshold),
				timeout:   this._cleanTimeout(timeout)
			}

		};


		/*
     * @param {Number} threshold
     *
		 * @returns {Number}
		 */
		this._cleanThreshold = function(threshold) {
			return threshold || 300;
    };

		/*
     * @param {Number} timeout
     *
		 * @returns {Number}
		 */
		this._cleanTimeout = function(timeout) {
			return timeout || 300;
		};

		/*
     * @param {String} formatAddress
     * @param {Boolean} onPremise
     *
		 * @returns {String}
		 */
		this._buildSoapFormatString = function(formatAddress, onPremise = false) {
			return `<${onPremise ? 'web' : 'ond'}:FormattedAddressInPicklist>` + formatAddress + `</${onPremise ? 'web' : 'ond'}:FormattedAddressInPicklist>`;
		};

		/*
     * @param {Object} engineOptions - contains an object that has the engine options (see #_cleanEngineOptions)
		 * @param {String} engineType
     * @param {Boolean} onPremise
     *
		 * @returns {String}
		 */
		this._buildSoapEngineString = function ({engineOptions, engineType, onPremise}) {
			let result = this._cleanEngineOptions(engineOptions);

			let flatten   = result.flatten;
			let intensity = result.intensity;
			let promptSet = result.promptSet;
			let threshold = result.threshold;
			let timeout   = result.timeout;

			var engineSoapString =
				`<${onPremise ? 'web' : 'ond'}:Engine` + ' ' +
				`Flatten='${flatten}' ` +
				`Intensity='${intensity}' ` +
				`PromptSet='${promptSet}' ` +
				`Threshold='${threshold}' ` +
				`Timeout='${timeout}'` +
				'>' + engineType + `</${onPremise ? 'web' : 'ond'}:Engine>`;

			return engineSoapString;
		};

		/*
     * @returns {String}
     */
		this._buildSoapNamespaceSubString = function(onPremise) {
      if (onPremise) {
        return 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
          'xmlns:web="http://www.qas.com/web-2013-12"'
      }

			return 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
				'xmlns:ond="http://www.qas.com/OnDemand-2011-03"';
		};

		/*
     * @param {Boolean} onPremise
     * @param {String} moniker
     *
		 * @returns {String}
		 */
		this._buildSoapMonikerString = function(moniker, onPremise) {
      return `<${onPremise ? 'web' : 'ond'}:Moniker>${moniker}</${onPremise ? 'web' : 'ond'}:Moniker>`;
		},

		/*
     * @param {Boolean} onPremise
     * @param {String} refinement
     *
		 * @returns {String}
		 */
		this._buildSoapRefinementString = function(refinement, onPremise) {
      return `<${onPremise ? 'web' : 'ond'}:Refinement>${refinement}</${onPremise ? 'web' : 'ond'}:Refinement>`;
		};

		/*
     * @param {String} layoutType
     * @param {Boolean} onPremise
     *
		 * @returns {String}
		 */
		this._buildSoapLayoutString = function(layoutType = 'AllElements', onPremise) {
      return `<${onPremise ? 'web' : 'ond'}:Layout>${layoutType}</${onPremise ? 'web' : 'ond'}:Layout>`;
		};

		/* 
     * @param {String} addressQuery
     * @param {Boolean} onPremise
     *
		 * @returns {String}
		 */
		this._buildSoapSearchString = function(addressQuery, onPremise = false) {
			return `<${onPremise ? 'web' : 'ond'}:Search>` + addressQuery + `</${onPremise ? 'web' : 'ond'}:Search>`;
		};

		/* @param {String} promptSet
     *
		 * @returns {String}
		 */
		this._buildSoapPromptSetString = function(promptSet, onPremise) {
			return `<${onPremise ? 'web' : 'ond'}:PromptSet>${promptSet}</${onPremise ? 'web' : 'ond'}:PromptSet>`;
		};

		/* 
     * @param {String} country
     * @param {Boolean} onPremise
     *
		 * @returns {String}
		 */
		this._buildSoapCountryString = function(country, onPremise) {
      if (onPremise) {
        return '<web:Country>' + country + '</web:Country>';
      }

			return '<ond:Country>' + country + '</ond:Country>';
		};

    /*
     * @param {Boolean} onPremise
     * @param {String} dataMap
     *
     * @returns {String}
     */
    this._buildSoapDataMapString = function(dataMap, onPremise) {
      return `<${onPremise ? 'web' :'ond'}:DataMap>${dataMap}</${onPremise ? 'web' : 'ond'}:DataMap>`;
    }

    /*** Taken from X2JS ***/

    /**
     * @param {any}
     * @param {any}
     * @param {ConfigObject}
     */
    this._parseDOMChildren = function(node, path, config = <ConfigObject>{}) {

      config = initConfigDefaults(config);

      /**
       * @returns {ConfigObject}
       */
      function initConfigDefaults(config) {
        return {
          escapeMode: config.escapeMode || true,
          attributePrefix: config.attributePrefix || "_",
          arrayAccessForm: config.arrayAccessForm || "none",
          emptyNodeForm: config.emptyNodeForm || "text",
          enableToStringFunc: config.enableToStringFunc || true,
          arrayAccessFormPaths: config.arrayAccessFormPaths || [],
          skipEmptyTextNodesForObj: config.skipEmptyTextNodesForObj || true,
          stripWhitespaces: config.stripWhitespaces || true,
          datetimeAccessFormPaths: config.datetimeAccessFormPaths || [],
          useDoubleQuotes: config.useDoubleQuotes || false,
          xmlElementsFilter: config.xmlElementsFilter || [],
          jsonPropertiesFilter: config.jsonPropertiesFilter || [],
          keepCData: config.keepCData || false
        };
      }

      const DOMNodeTypes = {
        ELEMENT_NODE 	     : 1,
        TEXT_NODE    	     : 3,
        CDATA_SECTION_NODE : 4,
        COMMENT_NODE	     : 8,
        DOCUMENT_NODE 	   : 9
      };

      function getNodeLocalName(node) {
        var nodeLocalName = node.localName;
        if(nodeLocalName == null) // Yeah, this is IE!!
          nodeLocalName = node.baseName;
        if(nodeLocalName == null || nodeLocalName=="") // =="" is IE too
          nodeLocalName = node.nodeName;
        return nodeLocalName;
      }

      function getNodePrefix(node) {
        return node.prefix;
      }

      function escapeXmlChars(str) {
        if(typeof(str) == "string")
          return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        else
          return str;
      }

      function unescapeXmlChars(str) {
        return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
      }

      function checkInStdFiltersArrayForm(stdFiltersArrayForm, obj, name, path) {
        var idx = 0;
        for(; idx < stdFiltersArrayForm.length; idx++) {
          var filterPath = stdFiltersArrayForm[idx];
          if( typeof filterPath === "string" ) {
            if(filterPath == path)
              break;
          }
          else
            if( filterPath instanceof RegExp) {
              if(filterPath.test(path))
                break;
            }
          else
            if( typeof filterPath === "function") {
              if(filterPath(obj, name, path))
                break;
            }
        }
        return idx!=stdFiltersArrayForm.length;
      }

      function toArrayAccessForm(obj, childName, path) {
        switch(config.arrayAccessForm) {
          case "property":
            if(!(obj[childName] instanceof Array))
              obj[childName+"_asArray"] = [obj[childName]];
            else
              obj[childName+"_asArray"] = obj[childName];
					break;
				/*case "none":
					break;*/
        }

        if(!(obj[childName] instanceof Array) && config.arrayAccessFormPaths.length > 0) {
          if(checkInStdFiltersArrayForm(config.arrayAccessFormPaths, obj, childName, path)) {
            obj[childName] = [obj[childName]];
          }
        }
      }

      function fromXmlDateTime(prop) {
        // Implementation based up on http://stackoverflow.com/questions/8178598/xml-datetime-to-javascript-date-object
        // Improved to support full spec and optional parts
        var bits = prop.split(/[-T:+Z]/g);

        var d = new Date(bits[0], bits[1]-1, bits[2]);
        var secondBits = bits[5].split("\.");
        d.setHours(bits[3], bits[4], secondBits[0]);
        if(secondBits.length>1)
          d.setMilliseconds(secondBits[1]);

        // Get supplied time zone offset in minutes
        if(bits[6] && bits[7]) {
          var offsetMinutes = bits[6] * 60 + Number(bits[7]);
          var sign = /\d\d-\d\d:\d\d$/.test(prop)? '-' : '+';

          // Apply the sign
          offsetMinutes = 0 + (sign == '-'? -1 * offsetMinutes : offsetMinutes);

          // Apply offset and local timezone
          d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset())
        }
        else
          if(prop.indexOf("Z", prop.length - 1) !== -1) {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));
          }

        // d is now a local time equivalent to the supplied time
        return d;
      }

      function checkFromXmlDateTimePaths(value, childName, fullPath) {
        if(config.datetimeAccessFormPaths.length > 0) {
          var path = fullPath.split("\.#")[0];
          if(checkInStdFiltersArrayForm(config.datetimeAccessFormPaths, value, childName, path)) {
            return fromXmlDateTime(value);
          }
          else
            return value;
        }
        else
          return value;
      }

      function checkXmlElementsFilter(obj, childType, childName, childPath) {
        if( childType == DOMNodeTypes.ELEMENT_NODE && config.xmlElementsFilter.length > 0) {
          return checkInStdFiltersArrayForm(config.xmlElementsFilter, obj, childName, childPath);
        }
        else
          return true;
      }

      if(node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
        var result = <ResultNode>{};
        var nodeChildren = node.childNodes;
        // Alternative for firstElementChild which is not supported in some environments
        for(var cidx=0; cidx <nodeChildren.length; cidx++) {
          var child = nodeChildren.item(cidx);
          if(child.nodeType == DOMNodeTypes.ELEMENT_NODE) {
            var childName = getNodeLocalName(child);
						result[childName] = this._parseDOMChildren(child, childName);
					}
				}
				return result;
			}
			else
			if(node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
				var result = <ResultNode>{};
				result.__cnt=0;

				var nodeChildren = node.childNodes;

				// Children nodes
				for(var cidx=0; cidx <nodeChildren.length; cidx++) {
					var child = nodeChildren.item(cidx); // nodeChildren[cidx];
          var childName = getNodeLocalName(child);

					if(child.nodeType!= DOMNodeTypes.COMMENT_NODE) {
						var childPath = path+"."+childName;
						if (checkXmlElementsFilter(result,child.nodeType,childName,childPath)) {
							result.__cnt++;
							if(result[childName] == null) {
								result[childName] = this._parseDOMChildren(child, childPath);
								toArrayAccessForm(result, childName, childPath);
							}
							else {
								if(result[childName] != null) {
									if( !(result[childName] instanceof Array)) {
										result[childName] = [result[childName]];
										toArrayAccessForm(result, childName, childPath);
									}
								}
								(result[childName])[result[childName].length] = this._parseDOMChildren(child, childPath);
							}
						}
					}
				}

				for(var aidx=0; aidx <node.attributes.length; aidx++) {
					var attr = node.attributes.item(aidx);
					result.__cnt++;
					result[config.attributePrefix+attr.name]=attr.value;
				}

				var nodePrefix = getNodePrefix(node);
				if(nodePrefix!=null && nodePrefix!="") {
					result.__cnt++;
					result.__prefix=nodePrefix;
				}

				if(result["#text"]!=null) {
					result.__text = result["#text"];
					if(result.__text instanceof Array) {
						result.__text = result.__text.join("\n");
					}
					if(config.stripWhitespaces)
						result.__text = result.__text.trim();
					delete result["#text"];
					if(config.arrayAccessForm=="property")
						delete result["#text_asArray"];
					result.__text = checkFromXmlDateTimePaths(result.__text, childName, path+"."+childName);
				}
				if(result["#cdata-section"]!=null) {
					result.__cdata = result["#cdata-section"];
					delete result["#cdata-section"];
					if(config.arrayAccessForm=="property")
						delete result["#cdata-section_asArray"];
				}

				if( result.__cnt == 0 && config.emptyNodeForm=="text" ) {
					result = <any>'';
				}
				else
				if( result.__cnt == 1 && result.__text!=null  ) {
					result = result.__text;
				}
				else
				if( result.__cnt == 1 && result.__cdata!=null && !config.keepCData  ) {
					result = result.__cdata;
				}
				else
				if ( result.__cnt > 1 && result.__text!=null && config.skipEmptyTextNodesForObj) {
					if( (config.stripWhitespaces && result.__text=="") || (result.__text.trim()=="")) {
						delete result.__text;
					}
				}
				delete result.__cnt;

				if( config.enableToStringFunc && (result.__text!=null || result.__cdata!=null )) {
					result.toString = function() {
						return (this.__text!=null? this.__text:'')+( this.__cdata!=null ? this.__cdata:'');
					};
				}

				return result;
			}
			else
			if(node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
				return node.nodeValue;
      }
    };
  };

  function _globalIntuitiveHelpers() {

    /*
     * @param {String} query
     * @param {String} country
     * @param {Number} take
     * @param {Boolean} verbose
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.search = (({ query, country, take = 7, callback }) => {
      if (!GLOBAL_INTUITIVE_URL) {
        throw 'Missing GLOBAL_INTUITIVE_URL.';
      } else if (!GLOBAL_INTUITIVE_AUTH_TOKEN) {
        throw 'Missing GLOBAL_INTUITIVE_AUTH_TOKEN';
      }

      let data = `?query=${query}&country=${country}&take=${take}&auth-token=${GLOBAL_INTUITIVE_AUTH_TOKEN}`;
      return this.makeRequest(data, `${GLOBAL_INTUITIVE_URL}/Search`, callback);
    });

    /*
     * @param {String} formatUrl
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.format = (({ formatUrl, callback }) => {
      if (!GLOBAL_INTUITIVE_URL) {
        throw 'Missing GLOBAL_INTUITIVE_URL.';
      } else if (!GLOBAL_INTUITIVE_AUTH_TOKEN) {
        throw 'Missing GLOBAL_INTUITIVE_AUTH_TOKEN';
      }

      let data = `&auth-token=${GLOBAL_INTUITIVE_AUTH_TOKEN}`;
      return this.makeRequest(data, formatUrl, callback)
    });

    /*
     * @param {String} addressId
     * @param {String} country
     * @param {Number} take
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.formatById = (({ addressId, country, take = 7, callback }) => {
      if (!GLOBAL_INTUITIVE_URL) {
        throw 'Missing GLOBAL_INTUITIVE_URL.';
      } else if (!GLOBAL_INTUITIVE_AUTH_TOKEN) {
        throw 'Missing GLOBAL_INTUITIVE_AUTH_TOKEN';
      }

      let data = `?id=${addressId}&country=${country}&take=${take}&auth-token=${GLOBAL_INTUITIVE_AUTH_TOKEN}`;
      return this.makeRequest(data, `${GLOBAL_INTUITIVE_AUTH_TOKEN}/Format`, callback);
    });

    /*
     * @param {Object} data
     * @param {String} url
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.makeRequest = ((data, url, callback) => {
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            callback(JSON.parse(this.response), null);
          } else {
            callback(null, {
              status: this.status,
              statusText: this.statusText
            });
          }
        }
      }

      xhr.open('GET', `${url}${data}`);
      xhr.send();
      return xhr;
    });

  }

  function _emailValidateHelper() {

    /*
     * @param {String} emailAddress
     * @param {Number} timeout
     * @param {Boolean} verbose
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.emailValidate = (({emailAddress, timeout = 15, verbose = true, callback}) => {
      if (!EMAIL_VALIDATE_URL) {
        throw 'Missing EMAIL_VALIDATE_URL.';
      } else if (!EMAIL_VALIDATE_AUTH_TOKEN) {
        throw 'Missing EMAIL_VALIDATE_AUTH_TOKEN';
      }

      return this.makeRequest(emailAddress, timeout, verbose, callback)
    });

    /*
     * @param {String} emailAddress
     * @param {Number} timeout
     * @param {Boolean} verbose
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.makeRequest = ((emailAddress, timeout, verbose, callback) => {
      let xhr = new XMLHttpRequest();

      xhr.withCredentials = false;
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {

          if (this.status === 200) {
            callback(JSON.parse(this.response), null);
          } else {
            callback(null, {
              status: this.status,
              statusText: this.statusText
            });
          }
        }
      };

      xhr.open('POST', EMAIL_VALIDATE_URL);
      xhr.setRequestHeader('Auth-Token', EMAIL_VALIDATE_AUTH_TOKEN);

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        email: emailAddress,
        timeout,
        verbose
      }));

      return xhr;
    });

  }

  function _phoneValidateHelper(type) {


    this.validationType = type;

    /*
     * @param {String} phoneNumber
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.reversePhoneAppend = (({phoneNumber, callback}) => {
      if (!PHONE_VALIDATE_PLUS_URL) {
        throw 'Missing PRO_WEB_SERVICE_URL.';
      } else if (!PHONE_VALIDATE_PLUS_AUTH_TOKEN) {
        throw 'Missing PRO_WEB_AUTH_TOKEN';
      }

      return this.makeRequest(phoneNumber, callback);
    });

    /*
     * @param {String} phoneNumber
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.globalPhoneValidate = (({phoneNumber, callback}) => {
      if (!GLOBAL_PHONE_VALIDATE_URL) {
        throw 'Missing PRO_WEB_SERVICE_URL.';
      } else if (!GLOBAL_PHONE_VALIDATE_AUTH_TOKEN) {
        throw 'Missing PRO_WEB_AUTH_TOKEN';
      }

      return this.makeRequest(phoneNumber, callback);
    });

    /*
     * @param {String} phoneNumber
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
    this.makeRequest = ((phoneNumber, callback) => {
      let xhr = new XMLHttpRequest();

      xhr.withCredentials = false;
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {

          if (this.status === 200) {
            callback(JSON.parse(this.response), null);
          } else {
            callback(null, {
              status: this.status,
              statusText: this.statusText
            });
          }
        }
      };

      switch (this.validationType) {
        case 'reversePhoneAppend':
          xhr.open('POST', PHONE_VALIDATE_PLUS_URL);
          xhr.setRequestHeader('Auth-Token', PHONE_VALIDATE_PLUS_AUTH_TOKEN);
          break;

        case 'globalPhone':
          xhr.open('POST', GLOBAL_PHONE_VALIDATE_URL);
          xhr.setRequestHeader('Auth-Token', GLOBAL_PHONE_VALIDATE_AUTH_TOKEN);
          break;
      }

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        'Number': phoneNumber
      }));

      return xhr;
    });

  };

  const reversePhoneValidateHelper = new _phoneValidateHelper('reversePhoneAppend');
  const globalPhoneValidateHelper  = new _phoneValidateHelper('globalPhone');
  const emailValidateHelper        = new _emailValidateHelper();
  const globalIntuitiveHelper      = new _globalIntuitiveHelpers();
  const proWebHelper               = new _proWebHelpers();
  const proWebOnPremiseHelper      = new _proWebHelpers('http://bosedqproxy.qas.com/pro-web', 'http://www.qas.com/web-2013-12');

  /** 
   * @module email
   */
  EDQ.email = {

    /**
     * Validates an email address
     * This module is a wrapper around the REST calls for Email Validateion
     * Additional documentation for the REST calls can be found here:
     * 
     * <br><br> {@link https://www.edq.com/documentation/apis/}
     *
     * @example @executable
     * EDQ.email.emailValidate({
     *  emailAddress: 'support@edq.com',
     *  callback: function(data, error) {
     *    console.log(JSON.stringify(data));
     *  }
     * });
     *
     * @name emailValidate
     * @function
     *
     * @param {String} emailAddress
     * @param {Number} timeout
     * @param {Boolean} verbose
     * @param {callback} callback
     *
     * @returns {XMLHttpRequest}
     */
    emailValidate: emailValidateHelper.emailValidate.bind(emailValidateHelper)
  };

  /**
   * @module phone
   */
  EDQ.phone = {

    /**
     * Validates a phone number, and returns any user information, if available
     * This module is a wrapper around the REST calls for PhoneValidatePlus (Reverse Phone Append)
     * Additional documentation for the REST calls can be found here:
     * <br><br> {@link https://www.edq.com/documentation/apis/}
     *
     * @example @executable
     * EDQ.phone.reversePhoneAppend({
     *  phoneNumber: '+16171234567',
     *  callback: function(data, error) {
     *    console.log(JSON.stringify(data));
     *  }
     * });
     *
     * @name reversePhoneAppend
     * @function
     *
     * @param {String} phoneNumber
     * @param {callback} callback
     *
     * @returns {XMLHttpRequest}
     */
    reversePhoneAppend: reversePhoneValidateHelper.reversePhoneAppend.bind(reversePhoneValidateHelper),

    /**
     * Validates a phone number
     * This module is a wrapper around the REST calls for PhoneValidate (Global Phone Validate)
     * Additional documentation for the REST calls can be found here:
     * <br><br> {@link https://www.edq.com/documentation/apis/}
     *
     * @example @executable
     * EDQ.phone.globalPhoneValidate({
     *  phoneNumber: '+16171234567',
     *  callback: function(data, error) {
     *    console.log(JSON.stringify(data));
     *  }
     * });
     *
     * @name globalPhoneValidate
     * @function
     *
     * @param {String} phoneNumber
     * @param {callback} callback
     *
     * @returns {XMLHttpRequest}
     */
    globalPhoneValidate: globalPhoneValidateHelper.globalPhoneValidate.bind(globalPhoneValidateHelper)
  };

  EDQ.address = {

    /**
     * This module is a wrapper around the JSON Global Intuitive calls
     * Additional documentation for the SOAP calls can be found here:
     *
     * <br><br> {@link https://www.edq.com/documentation/apis/address-validate/address-validate-soap/}
     *
     * @module globalIntuitive
     */
    globalIntuitive: {

      /**
       * Returns a collection of suggested addresses based on the search query and country
       *
       * @example @executable
       * EDQ.address.globalIntuitive.search({
       *  query: '125 Summer Street',
       *  country: 'USA',
       *  callback: function(data, error) {
       *    console.log(JSON.stringify(data));
       *  }
       * });
       *
       * @name search
       * @function
       *
       * @param {String} query
       * @param {String} country - ISO-3 country code
       * @param {Number} take - the amount of results to be returned
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      search: globalIntuitiveHelper.search.bind(globalIntuitiveHelper),

      /**
       * Returns the full address and component breakdown for the chosen address
       *
       * @example @executable
       * EDQ.address.globalIntuitive.search({
       *  query: '125 Summer Street',
       *  country: 'USA',
       *  callback: function(data, error) {
       *    var formatUrl = data.results[0].format;
       *
       *    EDQ.address.globalIntuitive.format({
       *      formatUrl: formatUrl,
       *      callback: function(data, error) {
       *        console.log(JSON.stringify(data));
       *      }
       *    })
       *  }
       * });

       * @name format
       * @function
       *
       * @param {String} formatUrl
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      format: globalIntuitiveHelper.format.bind(globalIntuitiveHelper),

      /** 
       * Returns the full address and component breakdown for the chosen address
       *
       * @name formatById
       * @function
       *
       * @param {String} addressId - address id from #search
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      formatById: globalIntuitiveHelper.formatById.bind(globalIntuitiveHelper),
    },

    /**
     * This module is a wrapper around the SOAP XML calls for Pro Web (on premise).
     * In addition to being able to call any method in EDQ.address.proWeb, e.g.
     * EDQ.address.proWebOnPremise.doSearch, it can call methods specified below.
     *
     * Additional documentation for the SOAP calls can be found here:
     *
     * <br><br> {@link https://www.edq.com/documentation/apis/address-validate/address-validate-soap/}
     *
     * @module proWebOnPremise
     */
    proWebOnPremise: {
      doSearch(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doSearch(args);
      },

      doRefine(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doRefine(args);
      },

      doGetSystemInfo(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doGetSystemInfo(args);
      },

      doGetPromptSet(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doGetPromptSet(args);
      },

      doGetLicenseInfo(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doGetLicenseInfo(args);
      },

      doGetLayouts(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doGetLayouts(args);
      },

      doGetExampleAddresses(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doGetExampleAddresses(args);
      },

      doGetAddress(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doGetAddress(args);
      },

      doCanSearch(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doCanSearch(args);
      },

      doGetData(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doGetData(args);
      },

      doGetDataMapDetail(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doGetDataMapDetail(args);
      },

      doGetDataHashCode(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doGetDataHashCode(args);
      },

      doUnlockDPV(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doUnlockDPV(args);
      },

      doGetDPVStatus(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doGetDPVStatus(args);
      },

      doBulkSearch(args) {
        args['onPremise'] = true;
        return proWebOnPremiseHelper.doBulkSearch(args);
      }

    },

    /**
     * This module is a wrapper around the SOAP XML calls for Pro Web On Demand
     * Additional documentation for the SOAP calls can be found here:
     *
     * <br><br> {@link https://www.edq.com/documentation/apis/address-validate/address-validate-soap/}
     *
     * @module proWeb
     */
    proWeb: {

      /**
       * Checks that the combination of data mapping, engine and layout are valid for searching.
       *
       * @example @executable
       * EDQ.address.proWeb.doCanSearch({
       *  country: 'USA',
       *  engineOptions: {},
       *  layout: 'EDQDemoLayout',
       *  callback: function(data, error) {
       *    console.log(JSON.stringify(data));
       *  }
       * });
       *
       * @name doCanSearch
       * @function
       *
       * @param {String} country
       * @param {Object} engineOptions
       * @param {String} engineType
       * @param {String} layout
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      doCanSearch: proWebHelper.doCanSearch.bind(proWebHelper),

      /**
       * Formats a picklist item to obtain a final, formatted address.
       *
       * @example @executable
       * EDQ.address.proWeb.doSearch({
       *  country: 'USA',
       *  engineOptions: {},
       *  engineType: 'Verification',
       *  layout: 'EDQDemoLayout',
       *  addressQuery: '125 Summer Street, Boston MA 02110',
       *  formattedAddressInPicklist: false,
       *
       *  // Monikers expires, so to use this function you have to get a fresh one, hence
       *  // the need for a doSearch
       *  callback: function(data) {
       *   EDQ.address.proWeb.doGetAddress({
       *    moniker: data.Envelope.Body.QASearchResult.QAPicklist.FullPicklistMoniker,
       *    layout: 'EDQDemoLayout',
       *    callback: function(data, error) {
       *      console.log(JSON.stringify(data));
       *    }
       *   });
       *  }
       * });
       *
       * @name doGetAddress
       * @function
       *
       * @param {String} layout
       * @param {String} moniker
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      doGetAddress: proWebHelper.doGetAddress.bind(proWebHelper),

      /**
       * Obtains a list of available data mappings
       * 
       * @example @executable
       * EDQ.address.proWeb.doGetData({
       *  callback: function(data, error) {
       *    console.log(JSON.stringify(data));
       *  }
       * });
       *
       * @name doGetData
       * @function
       *
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      doGetData: proWebHelper.doGetData.bind(proWebHelper),

      /**
       * NOTE: This only functions on the on premise version of ProWeb
       *
       * @example @executable
       * try {
       *  EDQ.address.proWeb.doGetDataMapDetail({
       *    dataMap: 'USA',
       *    callback: function(data, error) {
       *      // This function does not work
       *      console.log(data);
       *    }
       *  });
       * } catch(e) {
       *  console.log(e);
       * }

       * @name doGetDataMapDetail
       * @function
       *
       * @param {String} dataMap
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      doGetDataMapDetail: proWebHelper.doGetDataMapDetail.bind(proWebHelper),

      /**
       * Returns fully formatted example addresses
       *
       * @example @executable
       * EDQ.address.proWeb.doGetExampleAddresses({
       *  country: 'USA',
       *  layout: 'AllElements',
       *  callback: function(data, error) {
       *    console.log(JSON.stringify(data));
       *  }
       * });
       *
       * @name doGetExampleAddresses
       * @function
       *
       * @param {String} country
       * @param {String} layout
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      doGetExampleAddresses: proWebHelper.doGetExampleAddresses.bind(proWebHelper),

      /**
       * Obtains a list of layouts that have been configured within the configuration file.
       *
       * @example @executable
       * EDQ.address.proWeb.doGetLayouts({
       *  country: 'USA',
       *  callback: function(data, error) {
       *    console.log(JSON.stringify(data));
       *  }
       * });
       *
       * @name doGetLayouts
       * @function
       *
       * @param {String} country
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      doGetLayouts: proWebHelper.doGetLayouts.bind(proWebHelper),

      /**
       * Returns license information for ProWebOnDemand.
       *
       * @example @executable
       * try {
       *  EDQ.address.proWeb.doGetLicenseInfo({
       *    callback: function(data, error) {
       *      // This function does not work
       *      console.log(data);
       *    }
       *  });
       * } catch(e) {
       *  console.log(e);
       * }
       *
       * @name doGetLicenseInfo
       * @function
       *
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      doGetLicenseInfo: proWebHelper.doGetLicenseInfo.bind(proWebHelper),

      /**
       * Returns prompt set information.
       *
       * @example @executable
       * EDQ.address.proWeb.doGetPromptSet({
       *  country: 'USA',
       *  engineOptions: {},
       *  engineType: 'Verification',
       *  promptSet: 'Default',
       *  callback: function(data, error) {
       *    console.log(JSON.stringify(data));
       *    console.log(error);
       *  }
       * });
       *
       * @name doGetPromptSet
       * @function
       *
       * @param {String} country
       * @param {Object} engineOptions
       * @param {String} engineType
       * @param {String} promptSet
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      doGetPromptSet: proWebHelper.doGetPromptSet.bind(proWebHelper),

      /**
       * Returns information about the server
       * 
       * @example @executable
       * EDQ.address.proWeb.doGetSystemInfo({
       *  callback: function(data, error) {
       *    console.log(JSON.stringify(data));
       *    console.log(error);
       *  }
       * });
       *
       * @name doGetSystemInfo
       * @function
       *
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      doGetSystemInfo: proWebHelper.doGetSystemInfo.bind(proWebHelper),

      /**
       * Used to step into and refine a picklist result
       * 
       * @example @executable
       * EDQ.address.proWeb.doRefine({
       *  country: 'USA',
       *  refineOptions: {},
       *  layout: 'EDQDemoLayout',
       *  moniker: '',
       *  refinement: '',
       *  formattedAddressInPicklist: false,
       *  callback: function(data, error) {
       *    console.log(JSON.stringify(data));
       *    console.log(error);
       *  }
       * });
       *
       * @name doRefine
       * @function
       *
       * @param {String} refineOptions
       * @param {String} moniker
       * @param {String} refinement
       * @param {String} layout
       * @param {Boolean} formattedAddressInPicklist
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      doRefine: proWebHelper.doRefine.bind(proWebHelper),

      /**
       * Submits an initial search to the server
       *
       * @example @executable
       * EDQ.address.proWeb.doSearch({
       *  country: 'USA',
       *  engineOptions: {},
       *  engineType: 'Verification',
       *  layout: 'EDQDemoLayout',
       *  addressQuery: '125 Summer Street, Boston MA 02110',
       *  formattedAddressInPicklist: false,
       *  callback: function(data, error) {
       *    console.log(JSON.stringify(data));
       *    console.log(error);
       *  }
       * });
       *
       * @name doSearch
       * @function
       *
       * @param {String} country - an ISO-3 code, e.g. `USA`
       * @param {Object} engineOptions - options to customize the engine with
       * @param {String} engineType - an type of engine to run the service against, e.g. Verification
       * @param {String} layout - a layout type e.g. 'EDQDemoLayout'
       * @param {String} addressQuery - a string representing an address
       * @param {Boolean} formattedAddressInPicklist
       * @param {callback} callback
       *
       * @returns {XMLHttpRequest}
       */
      doSearch: proWebHelper.doSearch.bind(proWebHelper),
    },
  }

  /**
   * This is the callback style for all callbacks using this library.
   *
   * @callback callback
   * @param {Object} data - object with data, if the request is successful
   * @param {Object} error - an error object, if there's any
   */
}).call(this);
