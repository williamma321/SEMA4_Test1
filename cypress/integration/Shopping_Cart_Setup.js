/// <reference types="Cypress" />

describe('Setup Shopping Cart Test', function() 

{
  it('Setup Google Store Shopping Cart', function() {
	  
	 const Wait3K = Cypress.env("Page_Short_Wait")
	 const Wait5K = Cypress.env("Page_Med_Wait")
	 const Wait10K = Cypress.env("Page_Long_Wait")
	 const TestSite = Cypress.env("TestURL")
	 
	 cy.fixture('Shopitems.json').as('Shopitem')	 

	 cy.visit(TestSite)		
	
	//  The test setup will not add a new item if there is at least 1 item already in the shopping cart
	cy.get('[data-item-count=0]').then(($item_Count) =>{
	
	const my_Val = $item_Count.text()
	
	cy.log(my_Val)	   
	
		if (my_Val === "0" )
		{
	
	cy.get('.header-search-icon > .highlightable > svg').click()
		 
	cy.get('.quantumWizAutocompleteInputText').type(this.Shopitem.name+"{ENTER}",{force:true})
	
	cy.get('.container-sm-lock')
	
	cy.wait(Wait5K)
	
	cy.get(':nth-child(1) > .card-link-target > .card-inner > .text-wrapper > .text-container > .product-text')
	.contains(this.Shopitem.name).click({force:true})	 
	
	cy.wait(Wait5K)	
	
	cy.get('.price-and-button-container > .button-wrap > div > .button > .button-text').contains('Buy').click()
		
	cy.wait(Wait5K)
	
	cy.SelectPixelType(this.Shopitem.Phtype)	
	
	cy.wait(Wait5K)
    	
	cy.SelectCarrerType(this.Shopitem.Carrier)
	
	cy.wait(Wait3K)
	
	cy.SelectPhColor(this.Shopitem.Color)
	
	cy.wait(Wait3K)
	
	cy.SelectPhStorage(this.Shopitem.Memory)
	
	
	cy.wait(Wait3K)
	
	cy.get('.mqn-headline__button > .mqn-button')
	.contains('Skip').click()

	cy.wait(Wait3K)
	
	cy.get('.cta-button-container > .mdc-button')
	.contains('Add to cart').click()
	
	cy.wait(Wait3K)
	
	cy.get(':nth-child(8) > .nav-link > .highlightable').click()
	
	cy.get('.cart-button-text')
	 .contains('Guest Checkout')
	 .click({force:true})	
	
	 
		}
		
	})
	
	cy.get('[data-item-count=1]').then(($item_CountE) => {
	
	const checkitem2 = $item_CountE.text()
	
	expect(checkitem2,'0')
	
		
	})
	
	 
  })
})