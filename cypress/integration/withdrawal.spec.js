const USERNAME_BTC = Cypress.env('WITHDRAWAL_BTC_USERNAME')
const KEY_BTC = Cypress.env('WITHDRAWL_BTC_KEY')
const ADDRESS_BTC = Cypress.env('WITHDRAWL_BTC_ADDRESS')
const AMOUNT_BTC = Cypress.env('WITHDRAWL_BTC_AMOUNT')
const TOKEN_BTC = 'Bitcoin'

const USERNAME_ETH = Cypress.env('WITHDRAWAL_ETH_USERNAME')
const KEY_ETH = Cypress.env('WITHDRAWL_ETH_KEY')
const ADDRESS_ETH = Cypress.env('WITHDRAWL_ETH_ADDRESS')
const AMOUNT_ETH = Cypress.env('WITHDRAWL_ETH_AMOUNT')
const TOKEN_ETH = 'Ether'

if (USERNAME_BTC && KEY_BTC && ADDRESS_BTC && AMOUNT_BTC) {
  describe('Test btc withdrawal', () => {
    it('Make auth', () => {
      cy.visit("/")
      cy.login(USERNAME_BTC, KEY_BTC)
    })
  
    it('Go to wallets page', () => {
      cy.goToPage('wallets', 'Wallets')
    })
  
    describe('Test search', () => {
      it('Search for wallet', () => {
        cy.get('.el-input__inner')
          .type(TOKEN_BTC).should('have.value', TOKEN_BTC)
        cy.get('aside').find('a.card').should('have.length', 1)
      })
  
      it('Open wallet', () => {
        cy.get('a.card').first().click()
        cy.get('.card_header').first().should('contain', TOKEN_BTC)
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
          .type(AMOUNT_BTC)
          .should('have.value', AMOUNT_BTC)
        cy.get('[data-cy=withdrawalModal]')
          .find('.withdraw-wallet_select')
          .click()
        cy.get(`.el-select-dropdown__item:contains("${ADDRESS_BTC}")`).eq(0)
          .click()
        cy.get('[data-cy=withdrawalModal]')
          .find('.el-form-item__content > .el-button')
          .click()
        cy.get('[data-cy=withdrawalModal]')
          .get('div.el-dialog').eq(4)
          .should('be.visible')
      })

      it('Validate approval dialog - correct', () => {
        cy.confirm([KEY_BTC])
        cy.contains('Withdrawal request is submitted to notary', {timeout: 20000})
      })
    })
  })
}

if (USERNAME_BTC && KEY_BTC && ADDRESS_BTC && AMOUNT_BTC) {
  describe('Test eth withdrawal', () => {
    it('Make auth', () => {
      cy.visit("/")
      cy.login(USERNAME_BTC, KEY_BTC)
    })
  
    it('Go to wallets page', () => {
      cy.goToPage('wallets', 'Wallets')
    })
  
    describe('Test search', () => {
      it('Search for wallet', () => {
        cy.get('.el-input__inner')
          .type(TOKEN_BTC).should('have.value', TOKEN_BTC)
        cy.get('aside').find('a.card').should('have.length', 1)
      })
  
      it('Open wallet', () => {
        cy.get('a.card').first().click()
        cy.get('.card_header').first().should('contain', TOKEN_BTC)
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
          .type(AMOUNT_BTC)
          .should('have.value', AMOUNT_BTC)
        cy.get('[data-cy=withdrawalModal]')
          .find('.withdraw-wallet_select')
          .click()
        cy.get(`.el-select-dropdown__item:contains("${ADDRESS_BTC}")`).eq(0)
          .click()
        cy.get('[data-cy=withdrawalModal]')
          .find('.el-form-item__content > .el-button')
          .click()
        cy.get('[data-cy=withdrawalModal]')
          .get('div.el-dialog').eq(4)
          .should('be.visible')
      })

      it('Validate approval dialog - correct', () => {
        cy.confirm([KEY_BTC])
        cy.contains('Withdrawal request is submitted to notary', {timeout: 20000})
      })
    })
  })
}

if (USERNAME_ETH && KEY_ETH && ADDRESS_ETH && AMOUNT_ETH) {
  describe('Test eth withdrawal', () => {
    it('Make auth', () => {
      cy.visit("/")
      cy.login(USERNAME_ETH, KEY_ETH)
    })
  
    it('Go to wallets page', () => {
      cy.goToPage('wallets', 'Wallets')
    })
  
    describe('Test search', () => {
      it('Search for wallet', () => {
        cy.get('.el-input__inner')
          .type(TOKEN_ETH).should('have.value', TOKEN_ETH)
        cy.get('aside').find('a.card').should('have.length', 1)
      })
  
      it('Open wallet', () => {
        cy.get('a.card').first().click()
        cy.get('.card_header').first().should('contain', TOKEN_ETH)
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
          .type(AMOUNT_ETH)
          .should('have.value', AMOUNT_ETH)
        cy.get('[data-cy=withdrawalModal]')
          .find('.withdraw-wallet_select')
          .click()
        cy.get(`.el-select-dropdown__item:contains("${ADDRESS_ETH}")`).eq(0)
          .click()
        cy.get('[data-cy=withdrawalModal]')
          .find('.el-form-item__content > .el-button')
          .click()
        cy.get('[data-cy=withdrawalModal]')
          .get('div.el-dialog').eq(4)
          .should('be.visible')
      })

      it('Validate approval dialog - correct', () => {
        cy.confirm([KEY_ETH])
        cy.contains('Withdrawal request is submitted to notary', {timeout: 20000})
      })
    })
  })
}