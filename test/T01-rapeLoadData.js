describe('Data is loaded', function () {
	it('should show 15 data', function (){
		browser.get('https://personal-sos161709mjtr.c9users.io/#!/api/v2/rape-stats')
		.then(function (){
		    
		    element.all(by.repeater("data in database"))
		    .then(function(data){
		        expect(data.length).toBeGreaterThan(14);
		    });
		    
		});

		});
	});
