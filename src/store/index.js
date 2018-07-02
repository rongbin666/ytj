import Vue from 'vue'
import Vuex from 'vuex'
// import api from '@/utils/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    slides: [],
    news: [],
    topics: 1,
  },
  mutations: {
    slides (state, data) {
      state.slides = data
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
  },
  actions: {
    async getSlides({ commit }) {
      
    },
    async getNewsList({ state, commit }, init) {
      
    },
    async getTopics({ state, commit }, init) {
      
    }
  }
})

export default store
