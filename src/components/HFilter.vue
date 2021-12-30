<template>
  <div class="relative">
    <div
      class="filter-btn cursor-pointer"
      :class="{ 'active-filter-btn': openFilter }"
      @click="openFilter = !openFilter"
    >
      <img src="../assets/images/Vector.png" alt="" />
      <span>Filter</span>
    </div>
    <div class="filter-card absolute mt-2" v-if="openFilter">
      <div class="filter-sect1">
        <span class="filter-title">sort by:</span>
        <BaseRadioButton :options="options1" v-model="sortOptions" />
      </div>
      <div class="mt-8_2">
        <span class="filter-title">users:</span>
         <BaseRadioButton :options="options2" v-model="userOptions" />
      </div>
    </div>
  </div>
</template>


<script>
import BaseRadioButton from "./BaseRadioButton.vue";
export default {
  components: { BaseRadioButton },
  name: "HFilter",
  data() {
    return {
      openFilter: false,
      options1: [
        { value: "allDef", name: "default" },
        { value: "firstName", name: "firstName" },
        { value: "lastName", name: "lastName" },
        { value: "lastLogin", name: "Last Login" },
        { value: "dueDate", name: "Due Date" },
      ],
      options2: [
        { value: "allUsers", name: "all" },
        { value: "active", name: "active" },
        { value: "inactive", name: "inactive" },
      ],
    };
  },

  watch: {},

  props: {
   
  },

  computed: {},
};
</script>

<style scoped>
.filter-btn {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border: 1px solid #c6c2de;
  box-sizing: border-box;
  border-radius: 6px;
}

.active-filter-btn {
  border: 1px solid #6d5bd0;
}

.filter-card {
  padding: 20px 10px;
  width: 224px;
  background: #ffffff;
  border: 1px solid #c6c2de;
  box-sizing: border-box;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.filter-title {
  text-transform: uppercase;
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  letter-spacing: 0.05em;
}
</style>