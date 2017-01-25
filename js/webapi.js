import { WebAPI } from './config.json';

/*
{
    "WebAPI" : {
        "webapi_endpoint" : "https://example.com/apis",
        "urls":{
            "fetchModels": "/project/method?params"
        },
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "en-US",
            "User-Agent": "useragent",
            "Authorization": "Basic key"
        }
    }
}
*/

export default class WEBAPI {
    /**
    * return a promise object of the response
    */
    static fetchModels()
    {
        const webapi_endpoint = WebAPI.webapi_endpoint;
        let url = webapi_endpoint + WebAPI.urls.fetchModels;
        return fetch(
            url, 
            {
                method: 'GET',
                headers: WebAPI.headers
            }
        );
    }
}
