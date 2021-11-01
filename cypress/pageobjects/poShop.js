class shop{
    productGroup(){
        return cy.get(".products.ng-scope")
    }
    productGroupChildren(){
        return cy.get(".products.ng-scope").children()
    }
    productTitle()
    {
        return cy.get("div > .product-title")
    }
    findBuyButton()
    {
        return cy.find('.btn').contains("Buy")
    }


}

export default shop