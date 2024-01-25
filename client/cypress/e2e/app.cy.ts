/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/')
  })

  it('displays two todo items by default', () => {
    cy.get('.MuiList-root>a', { timeout: 100000 }).should('have.length', 2)
    cy.get('.MuiList-root>a', { timeout: 100000 }).eq(1)
    .should('have.text', '2Alice — Move the desk to the new location')
  })

  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const newItem = 'Feed the cat'
    cy.get('.MuiInputBase-input').type(`${newItem}`)
    cy.contains('Add ticket').click()
    cy.get('.MuiList-root>a', { timeout: 100000 }).should('have.length', 3)
    cy.get('.MuiList-root>a', { timeout: 100000 }).eq(2)
      .should('have.text', `3unassigned — ${newItem}`)
  })
})

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.MuiList-root', { timeout: 100000 }).contains('1').click()
  })

  it('cy.go() - go back or forward in the browser\'s history', () => {
    // https://on.cypress.io/go

    cy.location('pathname').should('include', '1')

    cy.go('back')
    cy.location('pathname').should('not.include', '1')

    cy.go('forward')
    cy.location('pathname').should('include', '1')

    // clicking back
    cy.go(-1)
    cy.location('pathname').should('not.include', '1')

    // clicking forward
    cy.go(1)
    cy.location('pathname').should('include', '1')
  })

  it('cy.reload() - reload the page', () => {
    // https://on.cypress.io/reload
    cy.reload()

    // reload the page without using the cache
    cy.reload(true)
  })
})

context('Window', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('cy.window() - get the global window object', () => {
    // https://on.cypress.io/window
    cy.window().should('have.property', 'top')
  })

  it('cy.document() - get the document object', () => {
    // https://on.cypress.io/document
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
  })

  it('cy.title() - get the title', () => {
    // https://on.cypress.io/title
    cy.title().should('include', 'Tickets')
  })
})

export {}