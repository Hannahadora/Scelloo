import Vue from 'vue'
import Vuex from 'vuex'
// import api from "../api/index";

import axios from 'axios';

import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // headers: {
  //   Authorization: 'Bearer {token}'
  // }
})

Vue.use(Vuex)

export default new Vuex.Store({

  plugins: [
    createPersistedState({
      paths: ["users"],
      // storage: {
      //   getItem: (key) => Cookies.get(key),
      //   setItem: (key, value) =>
      //     Cookies.set(key, value, { expires: 3, secure: true }),
      //   removeItem: (key) => Cookies.remove(key),
      // },
    }),
  ],

  state: {
    users: [],
    loading: false
  },
  mutations: {
    SET_USERS: (state, users) => state.users = users,
    SET_LOADING: (state, loading) => state.loading = loading
  },
  actions: {
    fetchUsers: async ({ commit, dispatch }) => {
      commit("SET_LOADING", true);
      try {
        const res = await api.get('/users/O6Jd07x7M09NkSl')
        commit('SET_USERS', res.data)
        if(res.status === 'true') {
          commit('SET_USERS', res.data)
        }
      } catch(err) {
        console.log(err);
      } finally {
        commit("SET_LOADING", false, { root: true });
      }
    },

    removeUser: async ({ commit, dispatch }, id) => {
      commit("SET_LOADING", true);
      try {
        const res = await api.delete(`/remove-user/${id}`)
        if(res.status === 'true') {
          commit('SET_USERS', res.data)
        }
      } catch(err) {
        console.log(err);
      } finally {
        await dispatch('fetchUsers')
        commit("SET_LOADING", false, { root: true });
      }
    },

    markAsPaid: async ({ commit, dispatch }, id) => {
      commit("SET_LOADING", true);
      try {
        const res = await api.patch(`/mark-paid/${id}`)
        if(res.status === 'true') {
          commit('SET_USERS', res.data)
        }
      } catch(err) {
        console.log(err);
      } finally {
        await dispatch('fetchUsers')
        commit("SET_LOADING", false, { root: true });
      }
    },
    deactivate: async ({ commit, dispatch }, id) => {
      commit("SET_LOADING", true);
      try {
        const res = await api.patch(`/deactivate-user/${id}`)
        if(res.status === 'true') {
          commit('SET_USERS', res.data)
        }
      } catch(err) {
        console.log(err);
      } finally {
        await dispatch('fetchUsers')
        commit("SET_LOADING", false, { root: true });
      }
    },
    activate: async ({ commit, dispatch }, id) => {
      commit("SET_LOADING", true);
      try {
        const res = await api.patch(`/activate-user/${id}`)
        if(res.status === 'true') {
          commit('SET_USERS', res.data)
        }
      } catch(err) {
        console.log(err);
      } finally {
        await dispatch('fetchUsers')
        commit("SET_LOADING", false, { root: true });
      }
    },

  },

  getters: {
    getUsers:(state)=>state.users.data
  },

  modules: {
  }
})
