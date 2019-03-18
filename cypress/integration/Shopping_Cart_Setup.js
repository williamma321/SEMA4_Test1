/// <reference types="Cypress" />

describe('Setup Shopping Cart Test', function() 

{
  it('Setup Google Store Shopping Cart', function() {
	  
	 const Wait3K = Cypress.env("Page_Short_Wait")
	 const Wait5K = Cypress.env("Page_Med_Wait")
	 const Wait10K = Cypress.env("Page_Long_Wait")
	 
    cy.visit('https://store.google.com/')		
	
	cy.get('.header-search-icon > .highlightable > svg').click()
		 
	cy.get('.quantumWizAutocompleteInputText').type('google pixel 3{ENTER}')
	
	cy.get('.container-sm-lock')
	
	cy.get('.text-container')
	.contains('Google Pixel 3').click()	 
	
	cy.wait(Wait3K)
	
	//cy.pause()
	cy.get('.pdp-bar-button-wrap').contains('Buy').click()
	//cy.contains('Buy now', { timeout: Wait10K }).click() 
		
	cy.wait(Wait5K)
	
	cy.get('.mqn-lobby__card__buttons',{timeout :Wait10K})
	.contains('Select').click()
	
	cy.wait(Wait3K)

	cy.contains('Verizon').click()
	
	cy.wait(Wait3K)
	
	cy.get('.mqn-button')
	.contains('Select').click()
	
	cy.wait(Wait3K)
	
	cy.contains('128GB').click()
	
	cy.wait(Wait3K)
	
	cy.get('.mqn-headline__button > .mqn-button')
	.contains('Skip').click()

	cy.wait(Wait3K)
	
	//cy.contains('Next').click()
	
	cy.get('.cta-button-container > .mdc-button')
	.contains('Add to cart').click()
	
	cy.wait(Wait3K)
	
	cy.get('[jsaction="JIbuQc:IXVHne"] > .mdc-button')
	.contains('Go to cart').click()
	
	cy.wait(Wait3K)
	
	cy.get('div[jscontroller="eoSTdf"] > .button-shadow')
	.contains('Guest Checkout').click()
		
	cy.get('.nav-link > .body-text-4')
	 
  })
})