describe('Burrito Builder Home Page', () => {
	beforeEach(() => {
			cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
					statusCode: 200,
					body: {
						orders: [
							{
								id: 1,
								name: 'Pat',
								ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
							},
							{
								id: 2,
								name: 'Sam',
								ingredients: ['steak', 'pico de gallo', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
							},
							{
								id: 3,
								name: 'Alex',
								ingredients: ['sofritas', 'beans', 'sour cream', 'carnitas', 'queso fresco']
							}
						]
					}
			})
			cy.visit('http://localhost:3000');
	})

	it('should have a sample test', () => {
    expect(true).to.equal(true);
  })

	it('should visit the base url', () => {
    cy.url().should('eq', 'http://localhost:3000/');
  })

	it('should display the apps title', () => {
			cy.get('header').should('be.visible')
			.get('h1').contains('Burrito Builder')
	})

	it('should display the OrderForm on the base url', () => {
			cy.get('header')
			cy.get('form').should('be.visible')
			cy.get('form').find('input[type=text]').should('be.visible')
			cy.get('form').find('button').contains('beans')
			cy.get('form').find('button').contains('steak')
			cy.get('form').find('button').contains('carnitas')
			cy.get('form').find('button').contains('sofritas')
			cy.get('form').find('button').contains('lettuce')
			cy.get('form').find('button').contains('queso fresco')
			cy.get('form').find('button').contains('pico de gallo')
			cy.get('form').find('button').contains('hot sauce')
			cy.get('form').find('button').contains('guacamole')
			cy.get('form').find('button').contains('jalapenos')
			cy.get('form').find('button').contains('cilantro')
			cy.get('form').find('button').contains('sour cream')
	}) 

	it('should display the Order cards', () => {
			cy.get('section')
			cy.get('.order').get('h3').contains('Pat')
			cy.get('li').contains('beans')
			cy.get('li').contains('lettuce')
			cy.get('li').contains('carnitas')
			cy.get('li').contains('queso fresco')
			cy.get('li').contains('jalapeno')

			cy.get('.order').get('h3').contains('Sam')
			cy.get('li').contains('steak')
			cy.get('li').contains('pico de gallo')
			cy.get('li').contains('lettuce')
			cy.get('li').contains('carnitas')
			cy.get('li').contains('queso fresco')
			cy.get('li').contains('jalapeno')

			cy.get('.order').get('h3').contains('Alex')
			cy.get('li').contains('sofritas')
			cy.get('li').contains('beans')
			cy.get('li').contains('sour cream')
			cy.get('li').contains('carnitas')
			cy.get('li').contains('queso fresco')
	}) 

	it('should be able to add new card to the page', () => {
		cy.get('form').find('input[type=text]').type('Bernie Sanders')
		cy.get('form').find('button').contains('steak').click()
		cy.get('form').find('button').contains('jalapenos').click()
		cy.get('form').find('button').contains('sour cream').click()
		cy.get('form').find('button').contains('Submit Order').click()

		cy.intercept('POST', 'http://localhost:3001/api/v1/orders').then(({response}) => {
		 expect(expect(response.statusCode).to.eq(201))
		})

		cy.get('.order').get('h3').contains('Bernie Sanders')
		cy.get('li').contains('steak')
		cy.get('li').contains('jalapenos')
		cy.get('li').contains('sour cream')

	})

})