public with sharing class FastAndFuriousController {
    public FastAndFuriousController() {

    }

    @AuraEnabled(cacheable=true)    
    public static Map<String, Object> returnJSON() {
        Map<String, Object> results = new Map<String, Object>();

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.gradientworks.dev/ff/movies');
        request.setMethod('GET');

        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200) {        
            results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug(results);
        }
        return results;
    }
}
