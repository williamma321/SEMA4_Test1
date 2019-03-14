/// <reference types="Cypress" />

describe('My First Test', function() {
  it('Visits the Kitchen Sink', function() {
    cy.visit('https://store.google.com/')
	 
	//cy.pause()
	
	cy.get('.header-search-icon').click()
	cy.get('.quantumWizAutocompleteInputText').type('google pixel 3{ENTER}')
	 
	cy.get('.text-container')
	.contains('Google Pixel 3').click()
	 
	cy.contains('Buy now').click() 
	
	 
	//cy.get('product-text')
	
	
	
	
	
	//cy.contains('Google Pixelbook').click()
	
	//cy.contains('type').click()
	//cy.url().should('include', 'Browse')
	
	// Get an input, type into it and verify that the value has been updated
    //cy.get('.logo-bg').click()
    //  .type('fake@email.com')
    //  .should('have.value', 'fake@email.com')
  })
})