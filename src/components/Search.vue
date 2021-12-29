<template>
  <div class="search-card" :class="{ 'active-search-card': active }">
    <img src="../assets/images/Search.png" alt="" />
    <input
      v-bind="$attrs"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="input"
      class="search-input focus:outline-none w-10/12"
      type="text"
      placeholder="Search Users by Name, Email or Date"
    />
  </div>
</template>

<script>
export default {
  name: "Search",
  inheritAttrs: false,

  data() {
    return {
      active: false,
    };
  },

  props: {},

  conputed: {},

  methods: {
    handleFocus() {
      this.active = true;
    },
    handleBlur() {
      this.active = false;
    },
    input(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style>
.search-input {
  border: none;
  background: transparent;
}
.active-search-card {
  border: 1px solid #6d5bd0;
}
</style>