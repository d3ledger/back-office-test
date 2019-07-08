import faker from 'faker'

const fakeKeyPath = 'fake@d3.priv'

describe('Test login page', () => {
  it('Log in with incorrect data', () => {
    cy.visit('/')
    cy.upload_file(fakeKeyPath, 'input.el-upload__input')
    cy.get('form > div:nth-child(3) input').click()
    cy.get('.el-scrollbar__view > :nth-child(1)').click()
    cy.get('[data-cy=login').click()
    cy.contains('Login error').should('be.visible')
    cy.get('.el-button:contains("OK")').click()
  })

  if (Cypress.env('LOGIN_USERNAME')) {
    it('Log in', () => {
      cy.visit('/')
      cy.login(Cypress.env('LOGIN_USERNAME'), Cypress.env('LOGIN_KEY'))
    })
  
    it('Log out', () => {
      cy.get('.el-side-menu .el-menu-item:contains("Logout")').click({ force: true })
      cy.contains('Welcome to D3').should('be.visible')
    })
  }
})

describe('Test register page', () => {
  it('Click sign up button', () => {
    cy.get('[data-cy=signup]').should('be.visible')
    cy.get('[data-cy=signup]').click()

    cy.waitPage('signup')
  })

  it('Register new user', () => {
    const username = faker.fake("{{name.firstName}}{{name.lastName}}").toLowerCase()
    cy.get('.el-input__inner[name="username"]').type(username)
      .should('have.value', username)
    cy.get('.el-form-item__content > .el-button.fullwidth').click()
    cy.waitForConfirmation(10000)
    cy.contains('Download your private key and keep it secret!').should('be.visible')
  })
})
