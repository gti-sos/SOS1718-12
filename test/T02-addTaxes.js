/*global expect*/
/*global browser*/
/*global element*/
/*global by*/
describe('addTax',function () {
    
    it('should add new tax',function(){
        
        browser.get('https://sos1718-12.herokuapp.com/#!/api/v2/taxes-stats')
        .then(function(){
            
            element.all(by.repeater('tax in taxesstats')).then(function(initialTaxes){
                
                browser.driver.sleep(2000);
                
                element(by.model('newTax.country')).sendKeys(Math.random());
                element(by.model('newTax.year')).sendKeys('2010');
                element(by.model('newTax.region')).sendKeys('asia');
                element(by.model('newTax.income_group')).sendKeys('low');
                element(by.model('newTax.country_code')).sendKeys('yeah');
                
                
                element(by.buttonText('Add')).click().then(function(){
                    
                    element.all(by.repeater('tax in taxesstats')).then(function(taxes){
                        
                       expect(taxes.length).toEqual(initialTaxes.length+1); 
                        
                    });
                });

             });
          });
      });
 });