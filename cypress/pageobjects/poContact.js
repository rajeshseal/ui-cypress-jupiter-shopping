class contact{
    txtFirstName(){
        return cy.get("#forename")
    }
    txtLastName(){
        return cy.get("#surname")
    }
    txtEmail(){
        return cy.get("#email")
    }
    txtPhone(){
        return cy.get("#telephone")
    }
    txtMessage(){
        return cy.get("#message")
    }
    btnSubmit(){
        return cy.get(".btn-contact.btn.btn-primary")
    }
    btnBack(){
        return cy.get('div.ng-scope > .btn')
    }
    msgPopUp(){
        return cy.get('.popup')
    }
    alertSubmitSucess(){
        return cy.get(".alert.alert-success", { timeout: 30000 })
    }

}

export default contact