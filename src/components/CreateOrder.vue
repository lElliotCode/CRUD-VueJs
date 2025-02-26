<template>
    <div class="create-order-container">
        <h1>Create New Order</h1>

        <form @submit.prevent="submitOrder">
            <input v-model="newOrder.orderNumber" placeholder="Order Number" class="input-style" />

            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in availableProducts" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td>
                            <input type="number" v-model="product.quantity" min="0" class="input-style" />
                        </td>
                        <td>
                            <button @click="addProductToOrder(product)" class="add-button" :disabled="isProductAdded(product)">Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2>Selected Products: </h2>
            <ul>
                <li v-for="(item, index) in newOrder.products" :key="index">
                    {{ item.name }} - Quantity: {{ item.quantity }} - Total: ${{ item.total }}
                    <button @click.prevent="removeProductFromOrder(index)" class="btn-small btn-danger">Remove</button>
                </li>
            </ul>
            <p><strong>Order Total: ${{ newOrder.total }}</strong></p>

            <button type="submit" class="submit-button">Submit</button>
        </form>
    </div>
</template>

<script>

import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default {
    data() {
        return {
            newOrder: {
                orderNumber: '',
                products: [],
                total: 0
            },
            availableProducts: [],

        }
    },
    async created() {
        await this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            const querySnapshot = await getDocs(collection(db, 'products'));
            this.availableProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), quantity: 0 }))
        },
        addProductToOrder(selectedProduct) {
            if (selectedProduct.quantity <= 0) {
                alert('Please enter a valid quantity');
                return;
            }
            const productTotal = selectedProduct.price * selectedProduct.quantity;
            const productToAdd = {
                ...selectedProduct,
                total: productTotal
            };
            this.newOrder.products.push(productToAdd);
            this.calculateOrderTotal();
        },
        calculateOrderTotal(){
            this.newOrder.total = this.newOrder.products.reduce((acc, item) => acc + item.total, 0);
        }, 
        isProductAdded(product){
            return this.newOrder.products.some(item => item.id === product.id);
        },
        removeProductFromOrder(index){
            this.newOrder.products.splice(index, 1);
            this.calculateOrderTotal();
        },
        async submitOrder(){
            if(this.newOrder.products.length === 0){
                alert('Please add products to the order');
                return;
            }
            await addDoc(collection(db, 'orders'), this.newOrder);
            alert('Order created successfully');
            this.resetOrderForm();
        },
        resetOrderForm(){
            this.newOrder = {
                orderNumber: '',
                products: [],
                total: 0
            }
            this.availableProducts.forEach(product => product.quantity = 0);
        }
    }
}
</script>