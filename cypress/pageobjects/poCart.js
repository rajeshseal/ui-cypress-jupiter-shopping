class cart{
    cartCountTxt(){
        return cy.get(".cart-count")
    }
    
    cartButton(){
        return cy.get('#nav-cart > a')
    }

    cartTableBodyRows(){
        return cy.get('.table.table-striped.cart-items>tbody>tr')
    }
    cartTableBodyColumns(){
        return cy.get('.table.table-striped.cart-items>tbody>tr:eq(0)>td')
    }
}

export default cart