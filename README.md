# Experian Pegasus
Experian's JavaScript library for Data Quality.

## Usage
To use the package, source the hosted version of our package like so:

```html
<script type="text/javascript" href="https://edqprofservus.blob.core.windows.net/assets/production/edq.js"></script>
```

In addition, you will want to have a configuration file sourced like so (below is an example for our address offerring) :

```html
<script>
      window.EdqConfig = {
        DEBUG: false,

        /** Authorization tokens **/

        /* Address */
        PRO_WEB_AUTH_TOKEN: "auth-token-here",
        GLOBAL_INTUITIVE_AUTH_TOKEN: "auth-token-here",
        PRO_WEB_COUNTRY: "USA",
      };
    </script>
```

Finally, the last thing to note is that when you call one of the functions on the `EDQ` object (as referenced in the documentation below), the `callback` has two parameters, `data`, and `error`. For any callback only one will be populated. `data` in cases where the HTTP response returned valid `xml` or `json`, and `error` for any other situation. `error` will contain the error information as contained in the `XMLHttpRequest` object.

## Documentation Site
https://experianplc.github.io/experian-data-quality-pegasus/
