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
		
	cy.get('.cart-button-text').contains('Guest Checkout').click({force:true})		
	
	cy.wait(Wait5K)
	
	cy.get('content > :nth-child(3)').click()

	

	// Cypress not support iframe form
	//  All call within the check out form will yield by $iframe
	
     cy.get('#paymentsParentDivIdIframe').then($iframe => {
		 
		cy.iframeClick('[data-name=ContactEmailConfirm]', '[name=ContactEmailConfirm]') 
	
		// Verify require email address message
		cy.iframeVerifyMsg('[data-name=ContactEmailField]','.b3id-input-error',this.TestVerify.email_Er1)		
	
		// Type in Email Address	
		cy.iframeTypeIn(this.profile.t_email,'[data-name=ContactEmailField]','[name=ContactEmailField]')
		
		cy.iframeClick('[data-name=RECIPIENT]', '[autocomplete=name]','M')	
		
		// Verify require confirm email address error message	
		
		cy.iframeVerifyMsg('[data-name=ContactEmailConfirm]','.b3id-input-error',this.TestVerify.email_Er2)	
		
		// Verify the 1st email address error message no longer existed
		
		cy.iframeVerifyMsgNotExist('[data-name=ContactEmailField]', '.b3id-input-error')
		
		// Type in the confirm email address
		
		cy.iframeTypeIn(this.profile.t_email,'[data-name=ContactEmailConfirm]','[name=ContactEmailConfirm]')		
		
	  
		//Verify the confirm address error message no longer visibile 
	
		cy.iframeVerifyMsgNotExist('[data-name=ContactEmailConfirm]', '.b3id-input-error')	
		
		cy.iframeClick('[data-name=RECIPIENT]', '[autocomplete=name]')				  
		
		cy.iframeClick('[data-name=ADDRESS_LINE_1]', '[autocomplete=off-street-address]','M')

		// Verify the email form now show the email address and collaped	  
			
		cy.iframeVerifyCpText(this.profile.t_email,'.b3-collapsing-form-summary-text')
		
	 		
		// Verify Required Name error message is now shown
		
		cy.iframeVerifyMsg('[data-name=RECIPIENT]','.b3-address-edit-error-message',this.TestVerify.Name_Er1)		
		
		// Type in the Name
		
		cy.iframeTypeIn(this.profile.t_name,'[data-name=RECIPIENT]','[autocomplete=name]')
		
		cy.iframeClick('[data-name=ADDRESS_LINE_1]', '[autocomplete=off-street-address]')
			
		cy.iframeClick('[data-name=RECIPIENT]', '[autocomplete=name]')			
	
	
		
		// Verify Required Name error message is no longer shown
		
		cy.iframeVerifyMsgNotExist('[data-name=RECIPIENT]', '.b3-address-edit-error-message')	
				
		// Verify Address line 1 required error message shown		
	 	
		cy.iframeVerifyMsg('[data-name=ADDRESS_LINE_1]','.b3-address-edit-error-message',this.TestVerify.Address_Er1)	
		
		// Type in the Address line 1	
		cy.iframeTypeIn(this.profile.t_address1,'[data-name=ADDRESS_LINE_1]','[autocomplete=off-street-address]')
		
		// Need to click on some other editor box to trigger error messages
		
		cy.iframeClick('[data-name=POSTAL_CODE]', '[autocomplete=postal-code]','M')
		
		cy.iframeClick('[data-name=LOCALITY]', '[autocomplete=address-level2]','M')
		
		cy.iframeClick('[data-name=ADDRESS_LINE_2]', '[autocomplete=address-line2]','M')		
		
		
		// Verify Address line 1 required error message no longer shown		
	 	cy.iframeVerifyMsgNotExist('[data-name=ADDRESS_LINE_1]', '.b3-address-edit-error-message')		
			
		// Verify Error message for required City and Zip code shown	
		
		//cy.iframeClick('[data-name=POSTAL_CODE]', '[autocomplete=postal-code]','M')
		
		//cy.iframeClick('[data-name=LOCALITY]', '[autocomplete=address-level2]','M')
		
		//cy.iframeClick('[data-name=PHONE_NUMBER]', '[autocomplete=tel]','M')
		
		// Verify Require City Error message shown
		
		cy.iframeVerifyMsg('[data-name=LOCALITY]','.b3-address-edit-error-message',this.TestVerify.Address_Er_City)	
				
		// Verify Require ZipCode Error message shown	 
		cy.iframeVerifyMsg('[data-name=POSTAL_CODE]','.b3-address-edit-error-message',this.TestVerify.ZipCode_Er1)	
		
		cy.iframeTypeIn(this.profile.t_City,'[data-name=LOCALITY]','[autocomplete=address-level2]')
		
		cy.iframeTypeIn(this.profile.t_zipcode,'[data-name=POSTAL_CODE]','[autocomplete=postal-code]')		
		
		// Type in the full address and select the state
		cy.iframeClick('[data-name=LOCALITY]', '[autocomplete=address-level2]')
		
		cy.iframeTypeIn(this.profile.t_address2,'[data-name=ADDRESS_LINE_2]','[autocomplete=address-line2]')	
		
		
	})
	
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
		const $body = $iframe.contents().find('body') 
		
		cy.iframeClick('[data-name=ADMIN_AREA]', '.goog-flat-menu-button-dropdown')
		
		cy.iframeTypeIn(this.profile.t_addressSt,'[data-name=ADMIN_AREA]','.goog-flat-menu-button-open','EMF')
		
		
		// Verify Require City Error message no longer shown
	 	
		cy.iframeVerifyMsgNotExist('[data-name=LOCALITY]', '.b3-address-edit-error-message')				
					
		// Verify Require ZipCode Error message no longer shown	 
		
		cy.iframeVerifyMsgNotExist('[data-name=POSTAL_CODE]', '.b3-address-edit-error-message')				
		
		cy.wrap($body)
			.find('[autocomplete=cc-number]').click({force:true})
		
	 })
	 
	 // Verify Phone Number field error message shown
	 cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 		
		
		cy.iframeVerifyMsg('[data-name=PHONE_NUMBER]','.b3-address-edit-error-message',this.TestVerify.Phone_Er1)	
		
		//Type in the phone number 
		
		cy.iframeTypeIn(this.profile.t_Phone,'[data-name=PHONE_NUMBER]','[autocomplete=tel]','EMF')		
			
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



