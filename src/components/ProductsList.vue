<template>
    <div class="product-list-container">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>

                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.name }}</td>
                    <td>${{ product.price }}</td>
                    <td>{{ product.description }}</td>
                    <td>
                        <button class="btn-small" @click="editProduct(product.id)">Edit</button>
                        <button class="btn-small btn-danger" @click="deleteProduct(product.id)">Delete</button>
                    </td>
                </tr>

            </tbody>
        </table>

        <button @click="showAddProduct = true">Add New Product</button>

        <div v-if="showAddProduct || selectedProduct" class="product-form">
            <h2>{{ selectedProduct ? 'Edit Product' : 'Add New Product' }}</h2>
            <form>
                <input type="text" v-model="productType.name" placeholder="Product Name" >
                <input type="number" v-model="productType.price" placeholder="Product Price" >
                <textarea name="" id="" v-model="productType.description"></textarea>

                <button @click.prevent="submitProduct">{{ selectedProduct ? 'Confirmar Edición' : 'Añadir' }}</button>
                <button @click="cancel">Cancelar</button>
            </form>

        </div>
    </div>
</template>

<script>

import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default {
    name: 'ProductsList',
    data() {
        return {
            products: [],
            showAddProduct: false,
            selectedProduct: null,
            productType: {
                name: '',
                price: 0,
                description: ''
            }
        }
    },
    async created() {
        await this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            const querySnapshot = await getDocs(collection(db, 'products'));
            this.products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => a.name.localeCompare(b.name));
        },
        editProduct(id) {
            const product = this.products.find(product => product.id === id);
            this.productType = { ...product };
            this.selectedProduct = id;
            this.showAddProduct = true;
        }, 
        async deleteProduct(id) {
            await deleteDoc(doc(db, 'products', id));
            await this.fetchProducts();
        },
        async submitProduct() {
            if (this.selectedProduct) {
                await updateDoc(doc(db, 'products', this.selectedProduct), this.productType);
            } else {
                await addDoc(collection(db, 'products'), this.productType);
            }
            this.cancel();
            await this.fetchProducts();
        },
        cancel() {
            this.showAddProduct = false;
            this.selectedProduct = null;
            this.productType = {
                name: '',
                price: 0,
                description: ''
            }
        }
    }
}

</script>