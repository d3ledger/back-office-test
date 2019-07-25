import faker from 'faker'
import FileSaver from 'file-saver'

describe('Test login page', () => {
  it('Log in with incorrect data', () => {
    cy.visit('/')
    cy.get('[name=privateKey]').type('0000000000000000000000000000000000000000000000000000000000000000')
    cy.get('[name=username]').type('this_account_doesnt_exists@d4')
    cy.get('form > div:nth-child(3) input').click()
    cy.get(Cypress.env('LOGIN_NODE')).click()
    cy.get('[data-cy=login').click()
    cy.contains(`Please check private key or username`).should('be.visible')
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
  let privateKey, username
  it('Click sign up button', () => {
    cy.visit('/')

    cy.get('[data-cy=signup]').should('be.visible')
    cy.get('[data-cy=signup]').click()

    cy.waitPage('signup')
  })

  it('Register new user', () => {
    username = faker.fake("{{name.firstName}}{{name.lastName}}").toLowerCase()
    cy.get('.el-input__inner[name="username"]').type(username)
      .should('have.value', username)
    cy.get('form > div:nth-child(2) input').click()
    cy.get(Cypress.env('SIGN_UP_NODE')).click()
    cy.get('.el-form-item__content > .el-button.fullwidth').click()
    cy.contains('Download your private key and keep it secret!', {timeout: 10000}).should('be.visible')
    cy.get('.el-button:contains("Download")').click()
    cy.get('.el-button:contains("Confirm")').click()
    cy.window().then((win) => {
      privateKey = win.Cypress.privateKey    
    })
  })

  it('Check login after registration', () => {  
    cy.wait(1000)  
    cy.login(`${username}@d3`, privateKey)
    cy.contains(`You don't have any wallets yet. Please add walets in Settings`).should('be.visible')
  })
})
