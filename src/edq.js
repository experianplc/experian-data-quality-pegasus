/* The EDQ library */

(function() {
	const root = this;
	const previousEdq = root.EDQ;

	/* Creates a reference to the EDQ object
	 *
	 * @param {Object} object
	 * @returns undefined
	 */
	let EDQ = function(object) {
		if (object instanceof EDQ) return object;
		if (!(this instanceof EDQ)) return new EDQ;
		this._wrapped = object;
	}

	EDQ.VERSION = '0.1';

	/* TODO: This needs to read from an environment variable of configuration file */
	AUTH_TOKEN          = '46832a16-80c0-43d8-af8e-05b3dde5aaaf';
	PRO_WEB_SERVICE_URL = 'https://ws2.ondemand.qas.com/ProOnDemand/V3/ProOnDemandService.asmx';

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = EDQ;
		}

		exports.EDQ = EDQ;
	} else {
		root.EDQ = EDQ;
	}

	function _proWebHelpers() {

		this.doCanSearch = function() {
			const soapActionUrl = 'http://www.qas.com/OnDemand-2011-03/DoCanSearch';
			const xmlRequest = this.buildDoRefineMessage(...arguments);
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {String} layout
     * @param {String} moniker
     * @param {Function} callback
     *
     * @returns {String}
     */
		this.doGetAddress = function({layout, moniker, callback}) {
			const soapActionUrl = 'http://www.qas.com/OnDemand-2011-03/DoGetAddress';
			const xmlRequest = this.buildDoGetAddressMessage(...arguments);
			return this.makeRequest(xmlRequest, soapActionUrl, callback);

		};

    /*
     * @param {Function} callback
     *
     * @returns {undefined}
     */
		this.doGetData = function({callback}) {
			const soapActionUrl = 'http://www.qas.com/OnDemand-2011-03/DoGetData';
			const xmlRequest = this.buildDoGetDataMessage();
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {String} dataMap
     * @param {Function} callback
     *
     * @returns {String}
     */
		this.doGetDataMapDetail = function({dataMap, callback}) {
      if (PRO_WEB_SERVICE_URL === 'https://ws2.ondemand.qas.com/ProOnDemand/V3/ProOnDemandService.asmx') {
        throw "This SOAP method is not supported in this version of QAS Pro On Demand";
      }

			const soapActionUrl = 'http://www.qas.com/OnDemand-2011-03/DoGetDataMapDetail';
			const xmlRequest = this.buildDoGetDataMapDetail(...arguments);
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {String} country
     * @param {String} layout
     * @param {Function} callback
     *
     * @returns {String}
     */
		this.doGetExampleAddresses = function({country, layout, callback}) {
			const soapActionUrl = 'http://www.qas.com/OnDemand-2011-03/DoGetExampleAddresses';
			const xmlRequest = this.buildDoGetExampleAddressesMessage(...arguments);
			return this.makeRequest(xmlRequest, soapActionUrl, callback);

		};

    /*
     * @param {String} country
     * @param {Function} callback
     *
     * @returns {String}
     */
		this.doGetLayouts =  function({country, callback}) {
			const soapActionUrl = 'http://www.qas.com/OnDemand-2011-03/DoGetLayouts';
			const xmlRequest = this.buildDoGetLayoutsMessage(...arguments);
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {Function} callback
     */
		this.doGetLicenseInfo = function({callback}) {
      if (PRO_WEB_SERVICE_URL === 'https://ws2.ondemand.qas.com/ProOnDemand/V3/ProOnDemandService.asmx') {
        throw "This SOAP method is not supported in this version of QAS Pro On Demand";
      }

			const soapActionUrl = 'http://www.qas.com/OnDemand-2011-03/DoGetLicenseInfo';
			const xmlRequest = this.buildDoGetLicenseInfoMessage(...arguments);
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {String} country
     * @param {Object} engineOptions
     * @param {String} engineType
     * @param {String} promptSet
     * @param {Function} callback
     *
     * @returns {XMLHttpRequest}
     */
		this.doGetPromptSet = function({country, engineOptions, engineType, promptSet, callback}) {
			const soapActionUrl = 'http://www.qas.com/OnDemand-2011-03/DoGetPromptSet';
			const xmlRequest = this.buildDoGetPromptSetMessage(...arguments);
			return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    /*
     * @param {Function} callback
     *
     * @returns {undefined}
     */
    this.doGetSystemInfo = function({callback}) {
			const soapActionUrl = 'http://www.qas.com/OnDemand-2011-03/DoGetSystemInfo';
			const xmlRequest = this.buildDoGetSystemInfoMessage();
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
     * @returns {undefined}
     */
    this.doRefine = function({
      refineOptions,
      moniker,
      refinement,
      layout,
      formattedAddressInPicklist,
      callback
    }) {
			const soapActionUrl = 'http://www.qas.com/OnDemand-2011-03/DoRefine';
			const xmlRequest = this.buildDoRefineMessage(...arguments);
			this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

		/*
     * @param {String} country
		 * @param {String} engineOptions
		 * @param {String} engineType
		 * @param {String} layout
		 * @param {String} addressQuery
		 * @param {Boolean} formattedAddressInPicklist
     * @param {Function} callback
		 *
		 * @returns {String}
		 */
    this.doSearch = function({
      country,
      engineOptions,
      engineType,
      layout,
      addressQuery,
      formattedAddressInPicklist,
      callback
    }) {
      const soapActionUrl = 'http://www.qas.com/OnDemand-2011-03/DoSearch';
      const xmlRequest = this.buildDoSearchMessage(...arguments);
      return this.makeRequest(xmlRequest, soapActionUrl, callback);
		};

    this.buildDoGetExampleAddressesMessage = function({country, layout}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString() + '>' +
        '<soapenv:Body>' +
        '<ond:QAGetExampleAddresses Localisation="" RequestTag="">' +
        this._buildSoapCountryString(country) +
        this._buildSoapLayoutString(layout) +
        '</ond:QAGetExampleAddresses>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    this.buildDoGetDataMessage = function() {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString() + '>' +
        '<soapenv:Body>' +
        '<ond:QAGetData Localisation="" >' +
        '</ond:QAGetData>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    this.buildDoGetAddressMessage = function({layout, moniker}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString() + '>' +
        '<soapenv:Body>' +
        '<ond:QAGetAddress Localisation="" RequestTag="">' +
        this._buildSoapLayoutString(layout) +
        '<ond:Moniker>' + moniker + '</ond:Moniker>' +
        '</ond:QAGetAddress>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @param {String} dataMap
     *
     * @returns {String}
     */
    this.buildDoGetDataMapDetail = function({dataMap}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString() + '>' +
        '<soapenv:Body>' +
        '<ond:QAGetDataMapDetail Localisation="">' +
        this._buildSoapDataMapString(dataMap) +
        '</ond:QAGetDataMapDetail>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @returns {String}
     */
    this.buildDoGetLicenseInfoMessage = function() {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString() + '>' +
        '<soapenv:Body>' +
        '<ond:QAGetLicenseInfo Localisation=""/>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    },

    /*
     * @param {String} country
     *
     * @returns {String}
     */
    this.buildDoGetLayoutsMessage = function({country}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString() + '>' +
        '<soapenv:Body>' +
        '<ond:QAGetLayouts Localisation="">' +
        this._buildSoapCountryString(country) +
        '</ond:QAGetLayouts>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @param {String} country
     * @param {Object} engineOptions
     * @param {String} engineType
     * @param {String} promptSet
     *
     * @returns {String}
     */
    this.buildDoGetPromptSetMessage = function({country, engineOptions, engineType, promptSet}) {
      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString() + '>' +
        '<soapenv:Body>' +
        '<ond:QAGetPromptSet Localisation="">' +
        this._buildSoapCountryString(country) +
        this._buildSoapEngineString({engineOptions, engineType}) +
        this._buildSoapPromptSetString(promptSet) +
        '</ond:QAGetPromptSet>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

      return xmlString;
    };

    /*
     * @returns {String}
     */
    this.buildDoGetSystemInfoMessage = function() {

      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString() + '>' +
        '<soapenv:Body>' +
        '<ond:QAGetSystemInfo Localisation=""/>' +
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
    this.buildDoRefineMessage = function({refineOptions, moniker, refinement, layout, formattedAddressInPicklist}) {
      let threshold = this._cleanThreshold(refineOptions.threshold);
      let timeout   = this._cleanTimeout(refineOptions.timeout);

      let xmlString =
        '<soapenv:Envelope ' + this._buildSoapNamespaceSubString() + '>' +
        '<soapenv:Body>' +
        '<ond:QARefine Threshold=' + '\"'  + threshold +  '\"' + ' ' +
        'Timeout='  +  '\"' + timeout   +  '\"' + ' ' +
        'Localisation=""' + ' ' +
        'RequestTag=""' +
        '>' +
        this._buildSoapMonikerString(moniker) +
        this._buildSoapRefinementString(refinement) +
        this._buildSoapLayoutString(layout) +
        this._buildSoapFormatString(formattedAddressInPicklist) +
        '</ond:QARefine>' +
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
		 *
		 * @returns {String}
		 */
		this.buildDoSearchMessage = function({country, engineOptions, engineType, layout, addressQuery, formattedAddressInPicklist}) {
			const xmlString =
				'<soapenv:Envelope ' + this._buildSoapNamespaceSubString() + '>' +
				'<soapenv:Body>' +
				'<ond:QASearch Localisation="" RequestTag="">' +
				this._buildSoapCountryString(country) +
				this._buildSoapEngineString({engineOptions, engineType}) +
				this._buildSoapLayoutString(layout) +
				this._buildSoapSearchString(addressQuery) +
				this._buildSoapFormatString(formattedAddressInPicklist) +
				'</ond:QASearch>' +
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

      xhr.open('POST', PRO_WEB_SERVICE_URL);
      xhr.setRequestHeader('Auth-Token', AUTH_TOKEN);
      xhr.setRequestHeader('SOAPAction', soapActionUrl);
      xhr.setRequestHeader('Content-Type', 'text/xml');
      xhr.send(requestData);
    });

		/* Private methods (shouldn't be called from the service directly) */

		/* @param {Object} engineOptions - a pure javascript object containing 6 key value pairs,
		 * associated with the possible engine parameters
		 *
		 * @returns {Object} - a new object that's similar to 'engineOptions', except there are no
		 * undefined values, and instead are replaced with empty strings.
		 */

		this._cleanEngineOptions = function({flatten, intensity, promptSet, threshold, timeout}) {

			/* We cannot use 'undefined' as a string, so we use a blank string, as an alternative  */
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
			return threshold || 10000;
    };

		/*
     * @param {Number} timeout
     *
		 * @returns {Number}
		 */
		this._cleanTimeout = function(timeout) {
			return timeout || 10000;
		};

		/*
     * @param {String} formatAddress
     *
		 * @returns {String}
		 */
		this._buildSoapFormatString = function(formatAddress) {
			return '<ond:FormattedAddressInPicklist>' + formatAddress + '</ond:FormattedAddressInPicklist>';
		};

		/*
     * @param {Object} object.engineOptions - contains an object that has the engine options (see #_cleanEngineOptions)
		 * @param {String} engineType
     *
		 * @returns {String}
		 */
		this._buildSoapEngineString = function (object) {
			let engineOptions = object.engineOptions;
			let engineType    = object.engineType;

			let result = this._cleanEngineOptions(engineOptions);

			let flatten   = result.flatten;
			let intensity = result.intensity;
			let promptSet = result.promptSet;
			let threshold = result.threshold;
			let timeout   = result.timeout;

			var engineSoapString =
				'<ond:Engine' + ' ' +
				'Flatten='   + '\'' + flatten   + '\' ' +
				'Intensity=' + '\'' + intensity + '\' ' +
				'PromptSet=' + '\'' + promptSet + '\' ' +
				'Threshold=' + '\'' + threshold + '\' ' +
				'Timeout='   + '\'' + timeout   + '\' ' +
				'>' + engineType + '</ond:Engine>';

			return engineSoapString;
		};

		/*
      * @returns {String}
      */
		this._buildSoapNamespaceSubString = function() {
			return 'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
				'xmlns:ond="http://www.qas.com/OnDemand-2011-03"';
		};

		/*
     * @param {String} moniker
     *
		 * @returns {String}
		 */
		this._buildSoapMonikerString = function(moniker) {
			return '<ond:Moniker>' + moniker + '</ond:Moniker>';
		},

		/*
     * @param {String} refinement
     *
		 * @returns {String}
		 */
		this._buildSoapRefinementString = function(refinement) {
			return '<ond:Refinement>' + refinement + '</ond:Refinement>';
		};

		/*
     * @param {String} layoutType
     *
		 * @returns {String}
		 */
		this._buildSoapLayoutString = function(layoutType = 'AllElements') {
			return '<ond:Layout>' + layoutType + '</ond:Layout>';
		};

		/* @param {String} addressQuery
     *
		 * @returns {String}
		 */
		this._buildSoapSearchString = function(addressQuery) {
			return '<ond:Search>' + addressQuery + '</ond:Search>';
		};

		/* @param {String} promptSet
     *
		 * @returns {String}
		 */
		this._buildSoapPromptSetString = function(promptSet) {
			return '<ond:PromptSet>' + promptSet + '</ond:PromptSet>';
		};

		/* @param {String} country
     *
		 * @returns {String}
		 */
		this._buildSoapCountryString = function(country) {
			return '<ond:Country>' + country + '</ond:Country>';
		};

    /*
     * @param {String} dataMap
     *
     * @returns {String}
     */
    this._buildSoapDataMapString = function(dataMap) {
      return '<ond:DataMap>' + dataMap + '</ond:DataMap>';
    }

    /* Taken from X2JS */
    this._parseDOMChildren = function(node, path, config = {}) {
      config = config || {};
      initConfigDefaults();

      function initConfigDefaults() {
        if(config.escapeMode === undefined) {
          config.escapeMode = true;
        }

        config.attributePrefix = config.attributePrefix || "_";
        config.arrayAccessForm = config.arrayAccessForm || "none";
        config.emptyNodeForm = config.emptyNodeForm || "text";

        if(config.enableToStringFunc === undefined) {
          config.enableToStringFunc = true;
        }
        config.arrayAccessFormPaths = config.arrayAccessFormPaths || [];
        if(config.skipEmptyTextNodesForObj === undefined) {
          config.skipEmptyTextNodesForObj = true;
        }
        if(config.stripWhitespaces === undefined) {
          config.stripWhitespaces = true;
        }
        config.datetimeAccessFormPaths = config.datetimeAccessFormPaths || [];

        if(config.useDoubleQuotes === undefined) {
          config.useDoubleQuotes = false;
        }

        config.xmlElementsFilter = config.xmlElementsFilter || [];
        config.jsonPropertiesFilter = config.jsonPropertiesFilter || [];

        if(config.keepCData === undefined) {
          config.keepCData = false;
        }
      }

      const DOMNodeTypes = {
        ELEMENT_NODE 	   : 1,
        TEXT_NODE    	   : 3,
        CDATA_SECTION_NODE : 4,
        COMMENT_NODE	   : 8,
        DOCUMENT_NODE 	   : 9
      };

      function getNodeLocalName( node ) {
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
        var result = new Object;
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
				var result = new Object;
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
					result = '';
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

  const helper = new _proWebHelpers();

  /* Public API */
  EDQ.address = {

    /* ProWeb is an abstraction of our ProOnDemandService, which interoperates with the SOAP XML service */
    proWeb: {
      doCanSearch:           helper.doCanSearch.bind(helper),
      doGetAddress:          helper.doGetAddress.bind(helper),
      doGetData:             helper.doGetData.bind(helper),
      doGetDataMapDetail:    helper.doGetDataMapDetail.bind(helper),
      doGetExampleAddresses: helper.doGetExampleAddresses.bind(helper),
      doGetLayouts: 	       helper.doGetLayouts.bind(helper),
      doGetLicenseInfo:      helper.doGetLicenseInfo.bind(helper),
      doGetPromptSet:        helper.doGetPromptSet.bind(helper),
      doGetSystemInfo:       helper.doGetSystemInfo.bind(helper),
      doRefine: 	           helper.doRefine.bind(helper),
      doSearch: 	           helper.doSearch.bind(helper),
    },
  }

}).call(this);