/// <reference types="Cypress" />

describe('My First Test', function() {
  it('Test on Line sample GUI', function() {
     
	 const Wait3K = Cypress.env("Page_Short_Wait")
	 const Wait5K = Cypress.env("Page_Med_Wait")
	 const Wait10K = Cypress.env("Page_Long_Wait")
	 const TestSite = Cypress.env("TestURL")
	 
	 cy.fixture("profile.json").as("profile")
	 cy.fixture("Verify.json").as("TestVerify")

	cy.visit(TestSite)		
	
	cy.get(':nth-child(8) > .nav-link > .highlightable').click()

	cy.wait(Wait3K)
	
		
	cy.get('div[jscontroller="eoSTdf"] > .button-shadow').click()	
	
	cy.wait(Wait5K)
	
	//cy.get('b3id-ui-field-text-container').click()
	
	cy.get('content > :nth-child(3)').click()
	
	
	
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
		const $body = $iframe.contents().find('body')

		cy.wrap($body)
		  .find('[data-name=ContactEmailField]')
		  .find('.b3id-input-error')
		  .should('have.text', this.TestVerify.email_Er1)
		  .and('have.attr', 'aria-hidden')
		  .and('equal', 'false')
		 
		 })
		
     cy.get('#paymentsParentDivIdIframe').then($iframe => {
		 
		const $body = $iframe.contents().find('body') 
		
		cy.wrap($body)
		   .find('[data-name=ContactEmailField]')
		   .find('[name=ContactEmailField]')
		   .type(this.profile.t_email)
		   
		cy.wrap($body)
			.find('.b3id-collapsable-container').click({multiple:true})
	 })

	 
	 
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 
	 
		cy.wrap($body)
			.find('[data-name=ContactEmailConfirm]')
			.find('.b3id-input-error')
			.should('have.text', this.TestVerify.email_Er2)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')
			 
		cy.wrap($body)
			.find('[data-name=ContactEmailField]')
			.find('.b3id-input-error')
			.and('have.attr', 'aria-hidden')
		    .and('equal', 'true')	 
		
		cy.wrap($body)
			.find('[data-name=ContactEmailConfirm]')
			.find('[name=ContactEmailConfirm]')
			.type(this.profile.t_email)	

		
	  })
	
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 
		cy.wrap($body)
			.find('[data-name=ContactEmailConfirm]')
			.find('.b3id-input-error')	
			 .should('have.attr', 'aria-hidden')
		     .and('equal', 'true')
	
		cy.wrap($body)
			.find('.b3id-collapsable-container').click({multiple:true})	
	
	  })	
	cy.get('#paymentsParentDivIdIframe').then($iframe => {
		
	 	const $body = $iframe.contents().find('body') 
		cy.wrap($body)			
			.find('.b3-collapsing-form-summary-text')			
			.should('have.text', this.profile.t_email)
			
		//cy.wrap($body)
		//	.find('.b3-collapsing-form-edit-icon')
		//	.should('have.attr', 'xmlns')
		cy.wrap($body)
			.find('[data-name=RECIPIENT]')
			.find('.b3-address-edit-error-message')
			.should('have.text', this.TestVerify.Name_Er1)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')		
		
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
		cy.wrap($body)
			.find('[data-name=ADDRESS_LINE_1]')
			.find('.b3-address-edit-error-message')
			.should('have.text', this.TestVerify.Address_Er1)
			 .and('have.attr', 'aria-hidden')
		     .and('equal', 'false')		
			
		cy.wrap($body)
			.find('[data-name=ADDRESS_LINE_1]')
			.find('[autocomplete=off-street-address]')
			.type(this.profile.t_address1+"{ENTER}")
		
	
	  })
	
	
		
  })
})



