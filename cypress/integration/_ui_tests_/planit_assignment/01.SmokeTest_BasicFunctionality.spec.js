import poHomeMenu from '../../../pageobjects/poHome'
import contact from '../../../pageobjects/poContact'
import shop from '../../../pageobjects/poShop'
import cart from '../../../pageobjects/poCart'
import _ from 'lodash'

describe('Smoke Test- Shopping cart and Contact info submission', function () {
    const objPOHome = new poHomeMenu()
    const objContact = new contact()
    const objCart = new cart()
    const objShop = new shop()
    const testContactData = require("../../../fixtures/dataContacts.json")
    const testCart1Data = require("../../../fixtures/dataAddCartTwoProduct.json")
    const testCart2Data = require("../../../fixtures/dataCartSubtotals.json")
    let totalQty

    beforeEach(function () {
        cy.visit('/');
    })

    //Test to submit contact information for 5 users
    it('TC01. To test contact info submission for 5 users', function () {
        objPOHome.menuContact().should('be.visible').click()                //user click on menu
        for (let i = 0; i < testContactData.length; i++) {                  //Iterate data file to sumbit multiple contact forms
            objContact.txtFirstName().type(testContactData[i].name)
            objContact.txtLastName().type(testContactData[i].surname)
            objContact.txtEmail().type(testContactData[i].email)
            objContact.txtPhone().type(testContactData[i].phone)
            objContact.txtMessage().type(testContactData[i].message)
            objContact.btnSubmit().click()
            objContact.msgPopUp()
                .should('be.visible')
                .contains("Sending Feedback")
            objContact.alertSubmitSucess()
                .should('be.visible')
                .contains("we appreciate your feedback")
            objContact.btnBack().click()
        }
    })

    //Test to add 2 product with 2 and 1 qty resp to cart and validate if its added to cart
    it('TC02. To test adding items to cart(dataset1-2Prod-3Items)', function () {
        totalQty = 0
        objPOHome.menuShop().contains("Shop").click()               //user click on shop menu

        for (let i = 0; i < testCart1Data.length; i++) {            //Iteration of data for all products and clicks as per product quantity
            _.times(testCart1Data[i].qty, () => objShop.productTitle().contains(testCart1Data[i].prod).parents('li').find('.btn').contains("Buy").click())
            totalQty = totalQty + parseInt(testCart1Data[i].qty)
        }

        objCart.cartCountTxt().should('have.text', totalQty)                        // check count in cart menu
        objCart.cartButton().click()                                                // click on cart
        objCart.cartTableBodyRows().should('have.length', testCart1Data.length)     // count the products in cart table
        objCart.cartTableBodyColumns().should('have.length', 5)                     //count the columns in cart table

        for (let i = 0; i < testCart1Data.length; i++) {                            //find the added product name in cart 
            objCart.cartTableBodyRows().eq(i)
                .within(function () {
                    cy.get('td').eq(0).should('contain.text', testCart1Data[i].prod)
                })
        }
    })

    //Test to add 3 product with different qty and check cart for correct subtotals
    it('TC03. To test subtotals in the cart(dataset2-3Prod-10Items)', function () {
        totalQty = 0
        objPOHome.menuShop().contains("Shop").click()           //user click action of shop menu
        for (let i = 0; i < testCart2Data.length; i++) {        //Iteration of data for all products and clicks as per product quantity
            _.times(testCart2Data[i].qty, () => objShop.productTitle().contains(testCart2Data[i].prod).parents('li').find('.btn').contains("Buy").click())
            totalQty = totalQty + parseInt(testCart2Data[i].qty)
        }

        objCart.cartCountTxt().should('have.text', totalQty)                        //check cart count
        objCart.cartButton().click()                                                //click on cart 
        objCart.cartTableBodyRows().should('have.length', testCart2Data.length)     //check the product type count in cart table
        objCart.cartTableBodyColumns().should('have.length', 5)                     //check columns in cart table

        for (let i = 0; i < testCart2Data.length; i++) {                            //find the added product name in cart and subtotals
            objCart.cartTableBodyRows().eq(i)
                .within(function () {
                    cy.get('td').eq(0).should('contain.text', testCart2Data[i].prod)
                    cy.get('td').eq(3).should('contain.text', (testCart2Data[i].price * testCart2Data[i].qty))
                })
        }
    })

    //end of describe block
})