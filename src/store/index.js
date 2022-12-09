import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    usuarioDB: ''
  },
  getters: {
    isActive: state => !!state.token
  },
  mutations: {
    getUser(state, payload) {
      console.log(state,'state')
      state.token = payload;
      if (payload == '') {
        state.usuarioDB = ''
      } else {
        state.usuarioDB = decode(payload);
        //router.push({name: 'categorias'});
      }
    }
  },
  actions: {
    saveUser({commit}, payload) {
      localStorage.setItem('token', payload);
      commit('getUser', payload)
    },
    closeSession({commit}) {
      commit('getUser', '');
      localStorage.removeItem('token');
      router.push({name: 'login'});
    },
    readToken({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('getUser', token);
      } else {
        commit('getUser', '');
      }
    }
  },
  modules: {
  }
})
