<template>
    <div>
        <h1>Order List</h1>
        <table>
            <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.orderNumber }}</td>
                    <td>{{ order.total }}</td>
                    <td>
                        <button @click="editOrder(order.id)" class="btn-small">Edit</button>
                        <button @click="deleteOrder(order.id)" class="btn-small btn-danger">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <router-link to="/create-order" class="add-order-link">Create Order</router-link>
    </div>
</template>

<script>

import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

export default {
    data() {
        return {
            orders: [],
        };
    },
    async created() {
        await this.fetchOrders();

    },
    methods: {
        async fetchOrders() {
            const querySnapshot = await getDocs(collection(db, 'orders'));
            this.orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        },
        async deleteOrder(id) {
            await deleteDoc(doc(db, 'orders', id));
            await this.fetchOrders();
        },
        editOrder(id) {
            this.$router.push({ name: 'EditOrder', params: { id } });
        }
    }
}

</script>