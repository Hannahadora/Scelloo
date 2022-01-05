<template>
  <div class="relative" v-click-outside="closeFilter">
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
        <BaseRadioButton
          v-for="option in options1"
          :key="option.value"
          :label="option.name"
          name="options1"
          :id="option.value"
          :value="option.value"
          v-model="sortOptions"
        />
      </div>
      <div class="mt-8_2">
        <span class="filter-title">users:</span>
        <BaseRadioButton
          v-for="option in options2"
          :key="option.value"
          :label="option.name"
          name="options2"
          :id="option.value"
          :value="option.value"
          v-model="userOptions"
        />
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import BaseRadioButton from "./BaseRadioButton.vue";
export default {
  components: { BaseRadioButton },
  name: "HFilter",
  data() {
    return {
      openFilter: false,
      vcoConfig: {
        handler: this.handler,
        middleware: this.middleware,
        events: ["dblclick", "click"],
        isActive: true,
        detectIFrame: true,
      },
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
      sortOptions: "allDef",
      userOptions: "allUsers",
    };
  },

  props: {},

  watch: {
    sortOptions() {
      if (this.sortOptions === "allDef") {
        return this.users;
      }
      if (this.sortOptions === "firstName") {
        return this.users.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
      }
      if (this.sortOptions === "lastName") {
        return this.users.sort((a, b) => a.lastName.localeCompare(b.lastName));
      }
      if (this.sortOptions === "lastLogin") {
        return this.users.sort(
          (a, b) => new Date(b.lastLogin) - new Date(a.lastLogin)
        );
      }
      if (this.sortOptions === "dueDate") {
        return this.users.sort(
          (a, b) => new Date(b.paidOn) - new Date(a.paidOn)
        );
      }
    },

    userOptions() {
      if (this.userOptions === "allUsers") {
        return this.users;
      }
      if (this.userOptions === "active") {
       return this.users.sort((a, b) => a.userStatus.localeCompare(b.userStatus));
      }
      if (this.userOptions === "inactive") {
         return this.users.sort((a, b) => b.userStatus.localeCompare(a.userStatus));
      }
    },
  },

  computed: {
    ...mapGetters({
      users: ["getUsers"],
    }),
  },

  methods: {
    closeFilter() {
      this.openFilter = false;
    },
  },
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