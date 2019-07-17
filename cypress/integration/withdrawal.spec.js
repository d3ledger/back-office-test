const USERNAME = Cypress.env('WITHDRAWAL_USERNAME')
const KEY = Cypress.env('WITHDRAWL_KEY')
const ADDRESS = Cypress.env('WITHDRAWL_ADDRESS')
const AMOUNT = Cypress.env('WITHDRAWL_AMOUNT')
const TOKEN = Cypress.env('WITHDRAWL_TOKEN')

if (USERNAME && KEY && ADDRESS && AMOUNT && TOKEN) {
  describe('Test wallets page without white list', () => {
    it('Make auth', () => {
      cy.visit("/")
      cy.login(USERNAME, KEY)
    })
  
    it('Go to wallets page', () => {
      cy.goToPage('wallets', 'Wallets')
    })
  
    describe('Test search', () => {
      it('Search for wallet', () => {
        cy.get('.el-input__inner')
          .type(TOKEN).should('have.value', TOKEN)
        cy.get('aside').find('a.card').should('have.length', 1)
      })
  
      it('Open wallet', () => {
        cy.get('a.card').first().click()
        cy.get('.card_header').first().should('contain', TOKEN)
      })
    })
  
    describe('Test deposit modal', () => {
      it('Open modal', () => {
        cy.get('[data-cy=deposit]').click()
        cy.get('div.el-dialog').eq(1).should('be.visible')
      })
  
      it('QR Code value and address are equal', () => {
        cy.get('[data-cy=deposit-address]').then(($span) => {
          cy.get('canvas').parent()
            .should('have.attr', 'value', $span.text())
        })
      })
  
      it('Close modal', () => {
        cy.get('i.el-dialog__close').eq(1).click()
        cy.get('div.el-dialog').eq(1).should('not.be.visible')
      })
    })
  
    describe('Test withdraw', () => {
      it('Open modal', () => {
        cy.get('[data-cy=withdraw]').click()
        cy.get('[data-cy=withdrawalModal]').should('be.visible')
      })

      it('Make withdrawal transaction', () => {
        cy.get('[data-cy=withdrawalModal]')
          .find(':nth-child(1) > .el-form-item__content > .el-input > .el-input__inner')
          .type(AMOUNT)
          .should('have.value', AMOUNT)
        cy.get('[data-cy=withdrawalModal]')
          .find('.withdraw-wallet_select')
          .click()
        cy.get(`.el-select-dropdown__item:contains("${ADDRESS}")`).eq(0)
          .click()
        cy.get('[data-cy=withdrawalModal]')
          .find('.el-form-item__content > .el-button')
          .click()
        cy.get('[data-cy=withdrawalModal]')
          .get('div.el-dialog').eq(4)
          .should('be.visible')
      })

      it('Validate approval dialog - correct', () => {
        cy.get('#approval-dialog .el-input')
          .each(function ($el, index) {
            cy.wrap($el).find('.el-input__inner')
              .clear()
              .type(KEY)
              .should('have.value', KEY)
          })
        cy.wait(2000)
        cy.get('#confirm-approval-form')
          .should('not.be.disabled')
          .click()
        cy.wait(8000)
      })

      it('Close approval modal', () => {
        cy.get('#approval-dialog i.el-dialog__close').click()
      })

      it('Close modal', () => {
        cy.get('i.el-dialog__close').eq(0).click()
        cy.get('[data-cy=withdrawalModal]').should('not.be.visible')
      })
    })
  })
}
