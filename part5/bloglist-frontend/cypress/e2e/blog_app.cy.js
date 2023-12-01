describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Gio Salad',
      username: 'giosalad',
      password: 'asdfasdf'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Blogs') // h2
    cy.contains('Login') // button
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input.username').type('giosalad')
      cy.get('input.password').type('asdfasdf')
      cy.get('#login-button').click()

      cy.contains('giosalad logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input.username').type('giosalad')
      cy.get('input.password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Invalid credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'giosalad logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input.username').type('giosalad')
      cy.get('input.password').type('asdfasdf')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('input#title').type('A blog created by Cypress')
      cy.get('input#author').type('Cypress')
      cy.get('input#url').type('https://www.cypress.io/')
      cy.contains('Create').click()
      cy.contains('A blog created by Cypress')
    })

    it('a blog can be liked', function () {
      cy.contains('New Blog').click()
      cy.get('input#title').type('A blog created by Cypress')
      cy.get('input#author').type('Cypress')
      cy.get('input#url').type('https://www.cypress.io/')
      cy.contains('Create').click()

      cy.contains('A blog created by Cypress').click()
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.contains('Likes: 1')
    })

    it.only('a blog can be deleted by the user who created it', function () {
      cy.contains('New Blog').click()
      cy.get('input#title').type('A blog created by Cypress')
      cy.get('input#author').type('Cypress')
      cy.get('input#url').type('https://www.cypress.io/')
      cy.contains('Create').click()

      cy.contains('A blog created by Cypress').click()
      cy.contains('View').click()
      cy.contains('Delete').click()

      cy.get('div.blogs').should('not.contain', 'A blog created by Cypress')
    })
  })
})