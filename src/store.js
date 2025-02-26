import { createStore } from 'vuex'

const store = createStore({
    state: {
        message: 'Hello world from Vuex!'
    },
    mutations: {
        setMessage(state, newMessage) {
            state.message = newMessage;
        }
    },
});

export default store