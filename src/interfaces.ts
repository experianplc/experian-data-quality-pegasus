interface Window {
  EdqConfig?: EdqConfigObject
}

interface EdqConfigObject {
  PRO_WEB_AUTH_TOKEN?: string,
  PHONE_VALIDATE_PLUS_AUTH_TOKEN: string,
  GLOBAL_PHONE_VALIDATE_AUTH_TOKEN: string,
  EMAIL_VALIDATE_AUTH_TOKEN: string,
  GLOBAL_INTUITIVE_AUTH_TOKEN: string,
  PRO_WEB_SERVICE_URL: string
}

interface EDQ {
  email: any,
  phone: object,
  address: object
}

interface ConfigObject {
  escapeMode: boolean,
  attributePrefix: string,
  arrayAccessForm: string,
  emptyNodeForm: string,
  enableToStringFunc: string,
  arrayAccessFormPaths: Array<any>,
  skipEmptyTextNodesForObj: string,
  datetimeAccessFormPaths: Array<any>,
  useDoubleQuotes: boolean,
  xmlElementsFilter: Array<any>,
  jsonPropertiesFilter: Array<any>,
  keepCData: boolean,
  stripWhitespaces: boolean
}

class ResultNode {
  __cnt: number;
  __prefix: string;
  __text: any;
  __cdata: any;
}
