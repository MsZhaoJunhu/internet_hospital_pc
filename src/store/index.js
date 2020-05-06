import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Info = {
  state: {},
  mutations: {
    SET_STATE(state, obj) {
      for (let key in obj) {
        state[key] = obj[key]
      }
    }
  },
  actions: {},
  namespaced: true
}


const indexNumber = {
  state: {},
  mutations: {
    SET_STATE(state, obj) {
      for (let key in obj) {
        state[key] = obj[key]
      }
    }
  },
  actions: {},
  namespaced: true
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    Info,
    indexNumber
  }
})
