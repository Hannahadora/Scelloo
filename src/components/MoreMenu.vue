<template>
  <div class="relative" @blur="openMenu = false">
    <div class="flex items-center justify-between">
      <span class="view-more-btn" @click="$emit('openDetails')">View more</span>
      <img
        v-if="!openMenu"
        class="menu-icon"
        src="../assets/images/More.png"
        alt=""
        @click.self="openMenu = true"
      />
    </div>
    <div v-if="openMenu" class="menu-card absolute right-1 top-0">
      <img
        class="absolute -top-3 -right-3 cursor-pointer"
        src="../assets/images/Close.png"
        alt=""
        @click="closeMenu"
      />
      <ul>
        <li class="menu-items-row text-pry-var" @click="markPaid">Edit</li>
        <li class="menu-items-row text-pry-var"  @click="viewProfile">View Profile</li>
        <li class="menu-items-row positive mb-2" @click="toggleUserStatus">{{ initText }}</li>
        <li class="menu-items-row negative del-btn" @click="deleteUser">Delete</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoreMenu",
  data() {
    return {
      openMenu: false,
    };
  },

  props: ['initText'],

  methods: {
    closeMenu() {
      this.openMenu = false
    },

    toggleUserStatus() {
      this.$emit('toggleUserStatus')
      this.openMenu = false
    },

    markPaid() {
      this.$emit('markPaid')
      this.openMenu = false
    },

    deleteUser() {
      this.$emit('deleteUser')
      this.openMenu = false
    },

    viewProfile() {
      this.$emit('viewProfile')
      this.openMenu = false
    },
    
  }
};
</script>

<style>
.menu-card {
  background: #ffffff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 10px 5px;
  width: 154px;
  z-index: 50;
}

.menu-items-row {
  margin-bottom: 5px;
  padding: 5px 10px;
  font-weight: 400;
  cursor: pointer;
}

.menu-items-row:hover {
  background-color: #f2f0f9;
  border-radius: 4px;
}

.view-more-btn {
  font-size: 12px !important;
  padding: 5px;
  cursor: pointer;
}

.view-more-btn:hover {
  background: #f2f0f9;
}

.del-btn {
  border-top: 1px solid #F2F0F9;
  margin-top: 5px
}

.menu-icon {
  cursor: pointer;
}

.menu-icon:hover {
  background: #25213B;
}
</style>