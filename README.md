# URL Shortener Microservice
For the third project of FreeCodeCamp API and Microservices curriculum, we have to make a URL Shortener Microservice with basic Node, basic Express, and Mongoose.

## Live Demo on Repl
https://url-shortener-microservices.jordyf15.repl.co/

## Test/User-Stories
1. I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
    Example : {"original_url":"www.google.com","short_url":1}
2. If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format,
    the JSON response will contain an error like {"error":"invalid URL"}
    HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
3. When I visit the shortened URL, it will redirect me to my original link.

## Example Input
https://www.pixiv.net/en/

## Example Output
The output are JSON Object with the following key/value pairs:  
1. original_url: the original url
2. short_url: the shortened url   
Example:  
original_url: "https://www.pixiv.net/en/"  
short_url: 5

## Example Usage
[project url]/api/shorturl/5 will redirect to https://www.pixiv.net/en/

## Technology Used
1. HTML
2. CSS
3. Javascript
4. Node.js version 12.16.3
5. Express version 4.17.1
6. Mongoose version 5.10.0
7. body-parser version 1.19.0
8. ejs version: 3.1.5

## Note
The source code here and with the one on repl are slightly different in the listener part since they were host on different server. This one are on localhost and on port 3000. Other than that everything else is the same.

