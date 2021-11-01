class poHomeMenu{
    menuContact(){
        return cy.get("a[href='#/contact']")
    }
    menuShop(){
        return cy.get("li[id='nav-shop'] a")
    }
    menuCart(){
       return cy.get('#nav-cart > a')
    }
    menuHome(){
       return  cy.get('#nav-home > a')
    }
}

export default poHomeMenu