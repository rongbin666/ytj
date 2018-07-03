import Vue from 'vue'
import Vuex from 'vuex'
// import api from '@/utils/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    channel:0,
  },
  mutations: {
    CHANGE_CHANNEL: (state, num) => {
      state.channel = num
    },
    news (state, data) {
      state.news = data
    },
    topics (state, data) {
      state.topics = data
    }
  },
  getters: {
    topics: state => state.topics,
    channel: state => state.channel,
  },
  actions: {
    changeChannel({ commit }, num) {
      commit('CHANGE_CHANNEL', num)
    },
    getNewsList({ state, commit }, init) {
      
    },
    getTopics({ state, commit }, init) {
      
    }
  }
})

export default store
