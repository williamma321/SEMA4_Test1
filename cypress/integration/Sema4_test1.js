/// <reference types="Cypress" />

describe('My First Test', function() {
  it('Visits the Kitchen Sink', function() {
    cy.visit('https://store.google.com/')
	 
	//cy.pause()
	
	cy.get('.header-search-icon').click()
	cy.get('.quantumWizAutocompleteInputText').type('google pixel 3{ENTER}')
	 
	cy.get('.text-container')
	.contains('Google Pixel 3').click()	 
	
	cy.pause()
	 
	cy.contains('Buy now').click() 
	
	 
	//cy.get('product-text')
	cy.pause()
	
	cy.get('.mqn-lobby__card__buttons')
	.contains('Select').click()
	
	cy.pause()
	
	cy.contains('Verizon').click()
	
	cy.pause()
	
	cy.get('.mqn-button')
	.contains('Select').click()
	
	cy.pause()
	
	cy.contains('128GB').click()
	
	cy.pause()
	
	cy.get('.mqn-headline__button > .mqn-button')
	.contains('Skip').click()
	
	//cy.get('.mqn-headline__button').dblclick()
	cy.pause()
	
	//cy.contains('Next').click()
	
	cy.get('.cta-button-container > .mdc-button')
	.contains('Add to cart').click()
	
	cy.pause()
	
	cy.get('[jsaction="JIbuQc:IXVHne"] > .mdc-button')
	.contains('Go to cart').click()
	
	cy.pause()
	
	cy.get('div[jscontroller="eoSTdf"] > .button-shadow')
	.contains('Guest Checkout').click()
	
	
	//cy.contains('Google Pixelbook').click()
	
	//cy.contains('type').click()
	//cy.url().should('include', 'Browse')
	
	// Get an input, type into it and verify that the value has been updated
    //cy.get('.logo-bg').click()
    //  .type('fake@email.com')
    //  .should('have.value', 'fake@email.com')
  })
})