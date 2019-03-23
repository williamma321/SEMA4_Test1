/// <reference types="Cypress" />

describe('Google Store Checkout Form Test', function() {
  it('Test Error filling the Checkout Form', function() {
     
	 // Load Environment Variable
	 
	 const Wait3K = Cypress.env("Page_Short_Wait")
	 const Wait5K = Cypress.env("Page_Med_Wait")
	 const Wait10K = Cypress.env("Page_Long_Wait")
	 const TestSite = Cypress.env("TestURL")
	 
	 // Load Fixture for test data
	 
	 cy.fixture("profile.json").as("profile")
	 cy.fixture("Verify.json").as("TestVerify")

	cy.visit(TestSite)		
	
	cy.get(':nth-child(8) > .nav-link > .highlightable').click()

	cy.wait(Wait3K)
	
		
	cy.get('div[jscontroller="eoSTdf"] > .button-shadow').click()	
	
	cy.wait(Wait5K)
	
	// Cypress not support iframe form
	//  All call within the check out form will yield by $iframe
	
	
	cy.get('content > :nth-child(3)').click()

	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
		const $body = $iframe.contents().find('body')

		cy.wrap($body)
			.find('[data-name=ContactEmailConfirm]')
			.find('[name=ContactEmailConfirm]').click({force:true})	
	
	})
		
	
	// Verify require email address message
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
		const $body = $iframe.contents().find('body')

		cy.wrap($body)
		  .find('[data-name=ContactEmailField]')
		  .find('.b3id-input-error')
		  .should('have.text', this.TestVerify.email_Er1)
		  .and('have.attr', 'aria-hidden')
		  .and('equal', 'false')
		 
		 })
	
	// Type in Email Address
     cy.get('#paymentsParentDivIdIframe').then($iframe => {
		 
		const $body = $iframe.contents().find('body') 
		
		cy.wrap($body)
		   .find('[data-name=ContactEmailField]')
		   .find('[name=ContactEmailField]')
		   .type(this.profile.t_email)		   
		
			
		cy.wrap($body)
			.find('[data-name=RECIPIENT]')
			.find('[autocomplete=name]')		
			.click({force:true})
		
	 })

	 
	 // Verify require confirm email address error message
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 
	 
		cy.wrap($body)
			.find('[data-name=ContactEmailConfirm]')
			.find('.b3id-input-error')
			.should('have.text', this.TestVerify.email_Er2)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')
		
		// Verify the 1st email address error message no longer existed
		
		cy.wrap($body)
			.find('[data-name=ContactEmailField]')
			.find('.b3id-input-error')
			.and('have.attr', 'aria-hidden')
		    .and('equal', 'true')	 
		
		// Type in the confirm email address
		
		cy.wrap($body)
			.find('[data-name=ContactEmailConfirm]')
			.find('[name=ContactEmailConfirm]')
			.type(this.profile.t_email)	

		
	  })
	  
	  //Verify the confirm address error message no longer visibile 
	
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 
		cy.wrap($body)
			.find('[data-name=ContactEmailConfirm]')
			.find('.b3id-input-error')	
			 .should('have.attr', 'aria-hidden')
		     .and('equal', 'true')
	
		//cy.wrap($body)
		//	.find('.b3id-collapsable-container').click({multiple:true})	
		
		cy.wrap($body)
			.find('[data-name=RECIPIENT]')
			.find('[autocomplete=name]')		
			.click({force:true})
	
	  })

     // Verify the email form now show the email address and collaped	  
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 
		cy.wrap($body)			
			.find('.b3-collapsing-form-summary-text')			
			.should('have.text', this.profile.t_email)
			
		// Verify Required Name error message is now shown
		
		cy.wrap($body)
			.find('[data-name=RECIPIENT]')
			.find('.b3-address-edit-error-message')
			.should('have.text', this.TestVerify.Name_Er1)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')		
		
		// Type in the Name
		
		cy.wrap($body)
			.find('[data-name=RECIPIENT]')
			.find('[autocomplete=name]')
			//.find('.b3-text-input-container')
			.type(this.profile.t_name)			
			
		cy.wrap($body)
			.find('[data-name=ADDRESS_LINE_1]')
			.find('[autocomplete=off-street-address]')
			.click({force:true})			
			
		cy.wrap($body)
			.find('[data-name=RECIPIENT]')
			.find('[autocomplete=name]').click()
			
	
	  })
	  
	  
	  
	  cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
		const $body = $iframe.contents().find('body') 
		
		// Verify Required Name error message is no longer shown
		
		cy.wrap($body)
			.find('[data-name=RECIPIENT]')
			.find('.b3-address-edit-error-message')			
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'true')	
		
		// Verify Address line 1 required error message shown		
	 	
		cy.wrap($body)
			.find('[data-name=ADDRESS_LINE_1]')
			.find('.b3-address-edit-error-message')
			.should('have.text', this.TestVerify.Address_Er1)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')		
			
		// Type in the Address line 1	
		
		cy.wrap($body)
			.find('[data-name=ADDRESS_LINE_1]')
			.find('[autocomplete=off-street-address]')
			.type(this.profile.t_address1)
			//.type('{downarrow}')
			//.type('{enter}')
		
		// Need to click on some other editor box to trigger error messages
		
		cy.wrap($body)
			.find('[data-name=POSTAL_CODE]')
			.find('[autocomplete=postal-code]').click({force:true})	
		
		cy.wrap($body)
			.find('[data-name=LOCALITY]')
			.find('[autocomplete=address-level2]').click({force:true})
		
		cy.wrap($body)
			.find('[data-name=ADDRESS_LINE_2]')
			.find('[autocomplete=address-line2]').click({force:true})
		
		cy.wrap($body)		
			.find('[data-name=PHONE_NUMBER]')
			.find('[autocomplete=tel]').click({force:true})
	
	  })
	
	 // Verify Error message for required City and Zip code shown
	 cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
		const $body = $iframe.contents().find('body') 
		// Verify Address line 1 required error message no longer shown		
	 	
		cy.wrap($body)
			.find('[data-name=ADDRESS_LINE_1]')
			.find('.b3-address-edit-error-message')			
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'true')		
		
		// Verify Require City Error message shown
		cy.wrap($body)
			.find('[data-name=LOCALITY]')
			.find('.b3-address-edit-error-message')
			.should('have.text', this.TestVerify.Address_Er_City)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')

		// Verify Require ZipCode Error message shown	 
		cy.wrap($body)
			.find('[data-name=POSTAL_CODE]')
			.find('.b3-address-edit-error-message')
			.should('have.text', this.TestVerify.ZipCode_Er1)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')	 
		
		// Type in the full address and select the state
		
		cy.wrap($body)
			.find('[data-name=ADDRESS_LINE_2]')
			.find('[autocomplete=address-line2]').click({force:true})
			.type(this.profile.t_address2)
		
		
		cy.wrap($body)
			.find('[data-name=LOCALITY]')
			.find('[autocomplete=address-level2]').click({force:true})
			.type(this.profile.t_City)
			
		cy.wrap($body)
			.find('[data-name=POSTAL_CODE]')
			.find('[autocomplete=postal-code]').click({force:true})	
			.type(this.profile.t_zipcode)
		
		cy.wrap($body)
			.find('[data-name=ADMIN_AREA]')
			.find('.goog-flat-menu-button-dropdown').click({force:true})
			
		
		cy.wrap($body)
			.find('[data-name=ADMIN_AREA]')
			.find('.goog-flat-menu-button-open')
			.type(this.profile.t_addressSt,{force:true})
			.type('{enter}',{force:true})
	
	 })
	 
	 cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 		
		
		// Verify Require City Error message no longer shown
	 	
		cy.wrap($body)
			.find('[data-name=LOCALITY]')
			.find('.b3-address-edit-error-message')			
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'true')

		// Verify Require ZipCode Error message no longer shown	 
		cy.wrap($body)
			.find('[data-name=POSTAL_CODE]')
			.find('.b3-address-edit-error-message')			
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'true')	 
		
		cy.wrap($body)
			.find('[autocomplete=cc-number]').click({force:true})
			
		
				
		
	 })
	 
	 // Verify Phone Number field error message shown
	 cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 		
		
		cy.wrap($body)
			.find('[data-name=PHONE_NUMBER]')
			.find('.b3-address-edit-error-message')
			.should('have.text', this.TestVerify.Phone_Er1)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')	 
		
		//Type in the phone number 
		
		cy.wrap($body)
			.find('[data-name=PHONE_NUMBER]')
			.find('[autocomplete=tel]')
			.type(this.profile.t_Phone,{force:true})
			.type('{enter}',{force:true})
			
	 })
	 
	 cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 		

		// Verify Require Phone Number Error message no longer Shown
		cy.wrap($body)
			.find('[data-name=PHONE_NUMBER]')
			.find('.b3-address-edit-error-message')
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'true')	 
	
		// Click around all Credit Card Editor fields
		
		cy.wrap($body)
			.find('[autocomplete=cc-name]').click({force:true})
				
		cy.wrap($body)
			.find('[autocomplete=cc-number]').click({force:true})	

		cy.wrap($body)
			.find('[autocomplete=cc-exp-month]')
			.click({force:true})	
			
		cy.wrap($body)
			.find('[autocomplete=cc-exp-year]')
			.click({force:true})	
			
		cy.wrap($body)
			.find('[autocomplete=cc-csc]')
			.click({force:true})	
		
		cy.wrap($body)
			.find('[autocomplete=cc-name]')	
			.click({force:true})			
		
		cy.wrap($body)
			.find('[autocomplete=cc-number]').click({force:true})			
	
		cy.wrap($body)
			.find('[autocomplete=cc-exp-month]')
			.click({force:true})
	
	
	 })
	 
	 cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 		
		
		//Verify Credit Card Number and Name Error Message shown
		
		cy.wrap($body)
			.find('.b3id-card-number-input-error')
			.should('have.text', this.TestVerify.Crtd_Crd_Er1)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')	
			 
		cy.wrap($body)
			.find('.b3id-cardholder-name-input-error')
			.should('have.text', this.TestVerify.Crtd_Name_Er1)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')		 
		
		cy.wrap($body)
			.find('.b3id-card-month-input-error')
			.should('have.text', this.TestVerify.Crtd_MM_Er1)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')		

		cy.wrap($body)
			.find('.b3id-card-year-input-error')
			.should('have.text', this.TestVerify.Crtd_YY_Er1)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')					 
		
		cy.wrap($body)
			.find('.b3id-security-code-input-error')
			.should('have.text', this.TestVerify.Crtd_CSV_Er1)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')					 
		
	
		
		cy.wrap($body)
			.find('[autocomplete=cc-number]').click({force:true})		
	
	 })
	 
	 cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 		
		
		const chk_Name_Address_Phone = this.profile.t_email + this.profile.t_name + ', ' + this.profile.t_address1 + ', ' + this.profile.t_address2 + ', ' + this.profile.t_City + ', ' + this.profile.t_addressSt_Shrt + ', ' + this.profile.t_zipcode + ', ' + this.profile.t_Phone
		
		
		//After phone number typed in the form, verify the collaped form has the correct address 
		cy.wrap($body)
			//.find('[data-title=Name]')
			.find('.b3id-collapsing-form-summary-text')
			.should('have.text', chk_Name_Address_Phone)

		// Type in Credit Card information
		
		cy.wrap($body)
			.find('[autocomplete=cc-number]')
			.type(this.profile.t_Credit_Crd_N,{force:true})
			.type('{enter}',{force:true})
		
		cy.wrap($body)
			.find('[autocomplete=cc-exp-month]')
			.type(this.profile.t_Crd_data_M,{force:true})
			
		cy.wrap($body)
			.find('[autocomplete=cc-exp-year]')
			.type(this.profile.t_Crd_data_YY,{force:true})
			
		cy.wrap($body)
			.find('[autocomplete=cc-csc]')
			.type(this.profile.t_Crd_data_CVC,{force:true})
		
		cy.wrap($body)
			.find('[autocomplete=cc-name]')
			.type(this.profile.t_name,{force:true})
		
		cy.wrap($body)
			.find('[autocomplete=cc-number]').click({force:true})			
		
	 })
	 
	 cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 	
	 
	 // Since I am not using a valid credit card, not verify credit card number error message
		//.find('.b3id-card-number-input-error')
			// .and('have.attr', 'aria-hidden')
		    // .and('equal', 'true')	
	 
	 //Verify Credit Card Name Error no longer Shown
		cy.wrap($body)
			.find('.b3id-cardholder-name-input-error')			
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'true')	
	
	// Verify all other Credit Card Information Error message no longer shown
	
		cy.wrap($body)
			.find('.b3id-card-month-input-error')
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'true')		

		cy.wrap($body)
			.find('.b3id-card-year-input-error')
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'true')					 
		
		cy.wrap($body)
			.find('.b3id-security-code-input-error')
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'true')				 

	// Click Save Changes button

	 cy.wrap($body)
			.find('[data-button-type=2]')
			.find('.goog-inline-block.jfk-button.jfk-button-action.b3-button.b3id-button.b3-ripple-container.b3-primary-button')
			.should('have.text', this.TestVerify.Service_Label + this.TestVerify.SaveButton_Label)
			.click({multiple:true,force:true})
			 
	 })
	
  })
})



