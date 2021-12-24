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
        <div class="filter-row mt-8_2">
          <label for="default">Default</label>
          <input
            type="radio"
            name="sorts"
            id="default"
            v-model="allDef"
            checked
          />
        </div>
        <div class="filter-row">
          <label for="firstName">First Name</label>
          <input type="radio" name="sorts" id="firstName" v-model="firstName" />
        </div>
        <div class="filter-row">
          <label for="lastName">Last Name</label>
          <input type="radio" name="sorts" id="lastName" v-model="lastName" />
        </div>
        <div class="filter-row">
          <label for="dueDate">Due Date</label>
          <input type="radio" name="sorts" id="dueDate" v-model="dueDate" />
        </div>
        <div class="filter-row">
          <label for="lastLogin">Last Login</label>
          <input type="radio" name="sorts" id="lastLogin" v-model="lastLogin" />
        </div>
      </div>
      <div class="mt-8_2">
        <span class="filter-title">users:</span>
        <div class="filter-row mt-8_2">
          <label for="all">All</label>
          <input
            type="radio"
            name="userSort"
            id="all"
            v-model="allKind"
            checked
          />
        </div>
        <div class="filter-row">
          <label for="active">Active</label>
          <input type="radio" name="userSort" id="active" v-model="active" />
        </div>
        <div class="filter-row">
          <label for="inactive">Inactive</label>
          <input
            type="radio"
            name="userSort"
            id="inactive"
            v-model="inactive"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HFilter",
  data() {
    return {
      openFilter: false,
      allDef: true,
      firstName: false,
      lastName: false,
      dueDate: false,
      lastLogin: false,
      allKind: true,
      active: false,
      inactive: false,
    };
  },

  props: {
    displayedArray: Array,
  },

  watch: {
    allDef() {
      if (this.allDef) {
        return this.displayedArray;
      }
    },
    firstName() {
      if (this.firstName) {
        return this.displayedArray.sort((a, b) => a.firstName - b.firstName);
      }
    },
    lastName() {
      if (this.lastName) {
        return this.displayedArray.sort((a, b) => a.lastName - b.lastName);
      }
    },
    lastLogin() {
      if (this.lastLogin) {
        return this.displayedArray.sort((a, b) => b.lastLogin - a.lastLogin);
      }
    },
    dueDate() {
      if (this.dueDate) {
        return this.displayedArray.sort((a, b) => b.dueDate - a.dueDate);
      }
    },
    allKind() {
      if (this.allKind) {
        return this.displayedArray;
      }
    },
    active() {
      if (this.active) {
        return this.displayedArray.filter((el) => el.userStatus === "active");
      }
    },
    inactive() {
      if (this.inactive) {
        return this.displayedArray.filter((el) => el.userStatus === "inactive");
      }
    },
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

.filter-row {
  margin-bottom: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #25213b;
  font-weight: 400;
}

.filter-row:hover {
  background-color: #f2f0f9;
  border-radius: 4px;
}

.filter-sect1 {
  border-bottom: 1px solid #f2f0f9;
}

label {
  font-weight: 400;
  color: #25213b;
}
</style>