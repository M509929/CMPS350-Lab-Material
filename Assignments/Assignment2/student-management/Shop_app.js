import promptSync from 'prompt-sync';
const prompt = promptSync();

const products = [
    { id: 1, label: 'Apple 14 Pro Max', cost: 4500 },
    { id: 2, label: 'iPad Pro 12.9-inch', cost: 5600 },
    { id: 3, label: 'Samsung Galaxy S14', cost: 3900 },
    { id: 4, label: 'Microsoft Surface Book 3', cost: 6700 },
    { id: 5, label: 'Sony PlayStation 5', cost: 3500 },
    { id: 6, label: 'Dell XPS 13', cost: 4500 },
    { id: 7, label: 'LG 65-inch OLED TV', cost: 9800 },
    { id: 8, label: 'Bose QuietComfort 35 II', cost: 1800 }
];

let cart = [];

export function getCart() {
    return cart;
}

export const addProduct = () => {
    console.log('\nAvailable Products:');
    for (let item of products) {
        console.log(`[${item.id}] ${item.label} - $${item.cost}`);
    }

    let selectedId = Number(prompt('Enter Product ID: '));
    let amount = Number(prompt('Enter Quantity: '));

    let selectedItem = products.find(item => item.id === selectedId);

    if (selectedItem) {
        let found = cart.find(entry => entry.item.id === selectedId);
        if (found) {
            found.count += amount;
        } else {
            cart.push({ item: selectedItem, count: amount });
        }
        console.log('Product added successfully.');
    } else {
        console.log('Invalid product ID.');
    }
}

export const changeQuantity = () => {
    if (cart.length === 0) {
        console.log('Cart is empty.');
        return;
    }

    console.log('\nCurrent Cart:');
    for (let entry of cart) {
        console.log(`[${entry.item.id}] ${entry.item.label} - Qty: ${entry.count}`);
    }

    let selectedId = Number(prompt('Enter Product ID to Modify: '));
    let newQuantity = Number(prompt('New Quantity: '));

    let found = cart.find(entry => entry.item.id === selectedId);

    if (found) {
        found.count = newQuantity;
        console.log('Quantity updated.');
    } else {
        console.log('Product not in cart.');
    }
}

export function deleteProduct() {
    if (cart.length === 0) {
        console.log('Cart is empty.');
        return;
    }

    console.log('\nCurrent Cart:');
    for (let entry of cart) {
        console.log(`[${entry.item.id}] ${entry.item.label} - Qty: ${entry.count}`);
    }

    let selectedId = Number(prompt('Enter Product ID to Remove: '));

    let index = cart.findIndex(entry => entry.item.id === selectedId);

    if (index !== -1) {
        cart.splice(index, 1);
        console.log('Product removed.');
    } else {
        console.log('Product not found.');
    }
}

export function displayInvoice() {
    if (cart.length === 0) {
        console.log('Cart is empty.');
        return;
    }

    console.log('\n--- Invoice ---');
    let totalAmount = 0;
    let expensive = cart[0];
    let cheap = cart[0];

    for (let entry of cart) {
        let total = entry.item.cost * entry.count;
        totalAmount += total;

        if (entry.item.cost > expensive.item.cost) {
            expensive = entry;
        }
        if (entry.item.cost < cheap.item.cost) {
            cheap = entry;
        }

        console.log(`${entry.item.label} - Qty: ${entry.count} - Total: $${total}`);
    }

    console.log(`\nTotal: $${totalAmount}`);
    console.log(` Most Expensive: ${expensive.item.label} - $${expensive.item.cost}`);
    console.log(` Least Expensive: ${cheap.item.label} - $${cheap.item.cost}`);
}

function displayMenu() {
    console.log('\n======== ACTION MENU ========');
    console.log('[1] Add Product');
    console.log('[2] Modify Quantity');
    console.log('[3] Remove Product');
    console.log('[4] Show Invoice');
    console.log('[5] Exit');
    console.log('============================');
}

function startApp() {
    while (true) {
        displayMenu();
        let userChoice = Number(prompt('Choose an option: '));

        if (userChoice === 1) {
            addProduct();
        } else if (userChoice === 2) {
            changeQuantity();
        } else if (userChoice === 3) {
            deleteProduct();
        } else if (userChoice === 4) {
            displayInvoice();
        } else if (userChoice === 5) {
            console.log('Thank you for shopping with us!');
            break;
        } else {
            console.log('Invalid choice. Please try again.');
        }
    }
}

startApp();
