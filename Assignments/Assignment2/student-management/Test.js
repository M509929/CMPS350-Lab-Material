import { expect } from "chai";
import { addProduct, changeQuantity, deleteProduct, getCart, displayInvoice } from "./Shop_app.js";

describe('Shopping App Tests', () => {
    
    describe('Testing addProduct function', () => {
        it('expect adding product', () => {
            const initialLength = getCart().length;
            addProduct(1, 5);  
            const newLength = getCart().length;
            expect(newLength).to.equal(initialLength + 1);  
        });
    });

    describe('Testing changeQuantity function', () => {
        it('expect changing quantity', () => {
            addProduct(1, 5);  
            let cart = getCart();
            const initialQuantity = cart[0].count;
            changeQuantity(1, 10); 
            const newQuantity = cart[0].count;
            expect(newQuantity).to.not.equal(initialQuantity);  
        });
    });

    describe('Testing deleteProduct function', () => {
        it('expect deleting existing product', () => {
            addProduct(1, 5);  
            const initialLength = getCart().length;
            deleteProduct(1);  
            const newLength = getCart().length;
            expect(newLength).to.equal(initialLength - 1);  
        });
    });

})
