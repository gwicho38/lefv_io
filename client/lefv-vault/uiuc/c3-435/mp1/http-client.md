---
id: http-client
created_date: 03/09/2022
updated_date: 03/09/2022
type: note
---

#  HTTP Client
- **🏷️Tags** :   
[ ](#anki-card)
## 📝 Notes

# Requirement: 

	HTTP Client - General Requirements
		- make GET request
		- filter response between (1) output, and (2) redirect (301) --- for example by using response codes
		- HTTP 1.1 
		- C++ 14
		- No stdout printing
		- executable --> http_client
		- write message body to file named 'output'
	(if 404)
		write "FILENOTFOUND" to output file
	(invalid arguments)
		write "INVALIDPROTOCOL"
	(no connection)
		write "NOCONNECTION"

	Sample Usage:
		./http_client http://hostname[:port]/path_to_file

		For example:
		
		./http_client http://illinois.edu/index.html
		
		./http_client http://localhost:5678/somedir/somefile.html

# Examples
```ad-example
title: Example GET Request
GET /test.txt HTTP/1.0
User-Agent: Wget/1.15 (linux-gnu)
Accept: \*/\*
Host: localhost:3490
Connection: Keep-Alive
```

```ad-example
title: Example GET Response

HTTP/1.1 200 OK
Date: Sun, 10 Oct 2010 23:26:07 GMT
Server: Apache/2.2.8 (Ubuntu) mod_ssl/2.2.8 OpenSSL/0.9.8g
Last-Modified: Sun, 26 Sep 2010 22:04:35 GMT
ETag: "45b6-834-49130cc1182c0"
Accept-Ranges: bytes
Content-Length: 13
Connection: close
Content-Type: text/html

Message is Hello world!

```


*Explanation*
		
	 - GET /test.txt instructs the server to return the file called test.txt in the server's top-level web directory.
	
	- User-Agent identifies the type of client program.
	
	- Accept specifies what types of files are desired – the client could say “I only want audio”, or “I want text, and I prefer html text”, etc. In this case it is saying “anything is fine”.
	
	- Host is the URL that the client was originally told to get from – exactly what the user typed. 
		- This is useful in case a single server has multiple domain names resolving to it (maybe www.cs.illinois.edu and www.math.illinois.edu), and each domain name actually refers to different content. 
		- This could be a bare IP address, if that's what the user had typed. The 3490 is the port – this server was listening on 3490, so I called “wget localhost:3490/test.txt”.

	Connection: Keep-Alive refers to TCP connection reuse for future requests.

```ad-note

Note that the newlines are technically supposed to be CRLF - “**\r\n**”. 

Only the first line is essential for a server to know what file to give back, so your HTTP GETs can be just that first line.

```


## Questions/Thoughts


## 🔗 Links
- [bgnet_usl_c_1.pdf (beej.us)](https://beej.us/guide/bgnet/pdf/bgnet_usl_c_1.pdf)
- [Index of /guide/bgnet/examples (beej.us)](https://beej.us/guide/bgnet/examples/)
- [VM install instructions]([bhNP-gdnQUGTT_oHZ4FBjQ_334b8ab2489042ccb9377979b1886dd6_VM_installation_instructions_manual.pdf (d18ky98rnyall9.cloudfront.net)](https://d18ky98rnyall9.cloudfront.net/bhNP-gdnQUGTT_oHZ4FBjQ_334b8ab2489042ccb9377979b1886dd6_VM_installation_instructions_manual.pdf?Expires=1662422400&Signature=Fq6Adgr2adaRO18hzuY64Sb6ZWghPOjtfX4XVnPfIa65SuOBx4AQjBBjbntDhlt0pQHGAsB3I0Ja3jnrslCseV5ev7rk1HjRp6JOPR-DDGJxRF3pg5h~6eredKmrRfQqBERZcGPfqyHy0weHXGz7LQPRgo8KY0VakUuHusR367I_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A))
- [The World Wide Web project (cern.ch)](http://info.cern.ch/hypertext/WWW/TheProject.html)
- [Simple C example of doing an HTTP POST and consuming the response - Stack Overflow](https://stackoverflow.com/questions/22077802/simple-c-example-of-doing-an-http-post-and-consuming-the-response)
- 