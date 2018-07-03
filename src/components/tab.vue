<template name="zan-tab">
  <div class="zan-tab">
    <div v-if="tab.scroll || scroll">
      <scroll-view
        :class="['zan-tab__bd zan-tab__bd--scroll' ,fixed ? 'zan-tab__bd--fixed' : '']"
        scroll-x="true"
        :style="'height:'+ tab.height + 'px'"
      >
      <!-- <div v-for="(item,index) in tab.list" :key="index">{{item.title}}</div> -->
          <div
          v-for="(item,index) in tab.list"
          :key="index"
          v-bind:class="[tab.selectedId == item.id ? 'zan-tab__item--selected' : '','zan-tab__item']"
          @click="channgeIndex"
          :data-component-id="componentId"
          :data-item-id="item.id"
          >
          <div class="zan-tab__title">{{ item.title }}</div>
          </div>
        
      </scroll-view>
    </div>
    <div v-else>
      <div :class="['zan-tab__bd',fixed ? 'zan-tab__bd--fixed' : '']">
        <div
          v-for="(item,index) in tab.list"
          :key="index"
          v-bind:class="[tab.selectedId == item.id ? 'zan-tab__item--selected' : '','zan-tab__item']"
          @click="_handleZanTabChange"
          :data-component-id="componentId"
          :data-item-id="item.id"
          >
          <div class="zan-tab__title">{{ item.title }}</div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: "tab",
  props: {
    tab: {
      type: Object,
      default: false
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'channel',
    ])
  },  
  mounted() {
     
  },
  methods: {
    _handleZanTabChange(e) {
      const componentId = this.extractComponentId(e);
      const dataset = e.currentTarget.dataset;
      const selectedId = dataset.itemId;
      const data = { componentId, selectedId };
      // console.log(1)
      this.tab.selectedId = selectedId;
      // console.info("[zan:tab:change]", data);
      if (this.handleZanTabChange) {
        this.handleZanTabChange(data);
      } else {
        console.warn("页面缺少 handleZanTabChange 回调函数");
      }
    },
    channgeIndex(e){
      const dataset = e.currentTarget.dataset;
      const selectedId = dataset.itemId;
      if(this.tab.selectedId != selectedId){
        this.tab.selectedId = selectedId;
        this.$store.dispatch("changeChannel",selectedId);
      }
    },
    extractComponentId(event = {}) {
      const { dataset: { componentId } } = event.currentTarget || {};
      return componentId;
    }
  }
};
</script>
<style scoped>
.zan-tab {
  height: 45px;
}
.zan-tab__bd {
  width: 750rpx;
  display: flex;
  flex-direction: row;
  border-bottom: 1rpx solid #e5e5e5;
  background: #fff;
}
.zan-tab__bd--fixed {
  position: fixed;
  top: 0;
  z-index: 2;
}
.zan-tab__item {
  flex: 1;
  display: inline-block;
  padding: 0 10px;
  line-height: 0;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
}
.zan-tab__title {
  display: inline-block;
  max-width: 100%;
  height: 44px;
  line-height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  word-break: keep-all;
  font-size: 14px;
  color: #666;
}
.zan-tab__item--selected .zan-tab__title {
  color: #f44;
  border-bottom: 2px solid #f44;
}
.zan-tab__bd--scroll {
  display: block;
  white-space: nowrap;
}
.zan-tab__bd--scroll .zan-tab__item {
  min-width: 80px;
}
</style>
