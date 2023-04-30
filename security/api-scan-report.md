# ZAP Scanning Report


## Summary of Alerts

| Risk Level | Number of Alerts |
| --- | --- |
| High | 0 |
| Medium | 0 |
| Low | 0 |
| Informational | 4 |




## Alerts

| Name | Risk Level | Number of Instances |
| --- | --- | --- |
| A Client Error response code was returned by the server | Informational | 59 |
| Non-Storable Content | Informational | 1 |
| Re-examine Cache-control Directives | Informational | 1 |
| Storable and Cacheable Content | Informational | 1 |




## Alert Detail



### [ A Client Error response code was returned by the server ](https://www.zaproxy.org/docs/alerts/100000/)



##### Informational (High)

### Description

A response code of 403 was returned by the server.
This may indicate that the application is failing to handle unexpected input correctly.
Raised by the 'Alert on HTTP Response Code Error' script

* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/.env
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/.htaccess
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/8847112444247260383
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/._darcs
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.bzr
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.DS_Store
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.env
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.git/config
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.hg
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.htaccess
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.idea/WebServers.xml
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.php_cs.cache
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.ssh/id_dsa
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.ssh/id_rsa
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.svn/entries
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/.svn/wc.db
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/646163879264681613
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/_wpeprivate/config.json
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/adminer.php
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/app/etc/local.xml
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/BitKeeper
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/CHANGELOG.txt
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/composer.json
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/composer.lock
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/config/database.yml
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/config/databases.yml
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/core
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/CVS/root
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/DEADJOE
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/filezilla.xml
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/i.php
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/id_dsa
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/id_rsa
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/info.php
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/key.pem
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/lfm.php
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/myserver.key
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/phpinfo.php
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/privatekey.key
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/server-info
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/server-status
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/server.key
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/sftp-config.json
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/sitemanager.xml
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/sites/default/files/.ht.sqlite
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/sites/default/private/files/backup_migrate/scheduled/test.txt
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/test.php
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/trace.axd
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/vb_test.php
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/vim_settings.xml
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/winscp.ini
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/WS_FTP.ini
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/elmah.axd
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/trace.axd
  * Method: `GET`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`
* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/latest/meta-data/
  * Method: `OPTIONS`
  * Parameter: ``
  * Attack: ``
  * Evidence: `HTTP/1.1 403`

Instances: 59

### Solution



### Reference



#### CWE Id: [ 388 ](https://cwe.mitre.org/data/definitions/388.html)


#### WASC Id: 20

#### Source ID: 4

### [ Non-Storable Content ](https://www.zaproxy.org/docs/alerts/10049/)



##### Informational (Medium)

### Description

The response contents are not storable by caching components such as proxy servers. If the response does not contain sensitive, personal or user-specific information, it may benefit from being stored and cached, to improve performance.

* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/
  * Method: `OPTIONS`
  * Parameter: ``
  * Attack: ``
  * Evidence: `OPTIONS `

Instances: 1

### Solution

The content may be marked as storable by ensuring that the following conditions are satisfied:
The request method must be understood by the cache and defined as being cacheable ("GET", "HEAD", and "POST" are currently defined as cacheable)
The response status code must be understood by the cache (one of the 1XX, 2XX, 3XX, 4XX, or 5XX response classes are generally understood)
The "no-store" cache directive must not appear in the request or response header fields
For caching by "shared" caches such as "proxy" caches, the "private" response directive must not appear in the response
For caching by "shared" caches such as "proxy" caches, the "Authorization" header field must not appear in the request, unless the response explicitly allows it (using one of the "must-revalidate", "public", or "s-maxage" Cache-Control response directives)
In addition to the conditions above, at least one of the following conditions must also be satisfied by the response:
It must contain an "Expires" header field
It must contain a "max-age" response directive
For "shared" caches such as "proxy" caches, it must contain a "s-maxage" response directive
It must contain a "Cache Control Extension" that allows it to be cached
It must have a status code that is defined as cacheable by default (200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 501).   

### Reference


* [ https://tools.ietf.org/html/rfc7234 ](https://tools.ietf.org/html/rfc7234)
* [ https://tools.ietf.org/html/rfc7231 ](https://tools.ietf.org/html/rfc7231)
* [ http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html (obsoleted by rfc7234) ](http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html (obsoleted by rfc7234))


#### CWE Id: [ 524 ](https://cwe.mitre.org/data/definitions/524.html)


#### WASC Id: 13

#### Source ID: 3

### [ Re-examine Cache-control Directives ](https://www.zaproxy.org/docs/alerts/10015/)



##### Informational (Low)

### Description

The cache-control header has not been set properly or is missing, allowing the browser and proxies to cache content. For static assets like css, js, or image files this might be intended, however, the resources should be reviewed to ensure that no sensitive content will be cached.

* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/
  * Method: `POST`
  * Parameter: `Cache-Control`
  * Attack: ``
  * Evidence: ``

Instances: 1

### Solution

For secure content, ensure the cache-control HTTP header is set with "no-cache, no-store, must-revalidate". If an asset should be cached consider setting the directives "public, max-age, immutable".

### Reference


* [ https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching ](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#web-content-caching)
* [ https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
* [ https://grayduck.mn/2021/09/13/cache-control-recommendations/ ](https://grayduck.mn/2021/09/13/cache-control-recommendations/)


#### CWE Id: [ 525 ](https://cwe.mitre.org/data/definitions/525.html)


#### WASC Id: 13

#### Source ID: 3

### [ Storable and Cacheable Content ](https://www.zaproxy.org/docs/alerts/10049/)



##### Informational (Medium)

### Description

The response contents are storable by caching components such as proxy servers, and may be retrieved directly from the cache, rather than from the origin server by the caching servers, in response to similar requests from other users.  If the response data is sensitive, personal or user-specific, this may result in sensitive information being leaked. In some cases, this may even result in a user gaining complete control of the session of another user, depending on the configuration of the caching components in use in their environment. This is primarily an issue where "shared" caching servers such as "proxy" caches are configured on the local network. This configuration is typically found in corporate or educational environments, for instance.

* URL: https://akxo8jq0o9.execute-api.ap-northeast-1.amazonaws.com/api/
  * Method: `POST`
  * Parameter: ``
  * Attack: ``
  * Evidence: ``

Instances: 1

### Solution

Validate that the response does not contain sensitive, personal or user-specific information.  If it does, consider the use of the following HTTP response headers, to limit, or prevent the content being stored and retrieved from the cache by another user:
Cache-Control: no-cache, no-store, must-revalidate, private
Pragma: no-cache
Expires: 0
This configuration directs both HTTP 1.0 and HTTP 1.1 compliant caching servers to not store the response, and to not retrieve the response (without validation) from the cache, in response to a similar request. 

### Reference


* [ https://tools.ietf.org/html/rfc7234 ](https://tools.ietf.org/html/rfc7234)
* [ https://tools.ietf.org/html/rfc7231 ](https://tools.ietf.org/html/rfc7231)
* [ http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html (obsoleted by rfc7234) ](http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html (obsoleted by rfc7234))


#### CWE Id: [ 524 ](https://cwe.mitre.org/data/definitions/524.html)


#### WASC Id: 13

#### Source ID: 3


