# fcc-url-shortener (lengthener)
*Give a URL, get a URL*

Send a request with a well-formed URL to receive an alternate URL 
that will redirect to the original.

## Example Input
    https://quiet-savannah-2069.herokuapp.com/new/http://www.google.com

## Example Output
    {
        originalUrl: "http://www.google.com",
        shortUrl: "https://quiet-savannah-2069.herokuapp.com/5696b9d455e54e011ca40491"
    }
        
## Example Use
    https://quiet-savannah-2069.herokuapp.com/5696b9d455e54e011ca40491

Redirects to "http://www.google.com"