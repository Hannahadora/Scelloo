<template>
  <div>
    <div
      class="
        table-head
        px-5
        py-3
        w-full
        flex
        items-center
        justify-between
        uppercase
      "
    >
      <div class="w-1/2 flex items-center gap-7">
        <span class="flex items-center gap-5"
          ><input class="chec" type="checkbox" />
          <img src="../assets/images/Down.png" alt=""
        /></span>
        <span class="w-2/5">name</span>
        <span class="w-2/5">user status</span>
      </div>
       <div class="w-1/2 flex items-center gap-7">
        <span>payment</span>
        <span class="w-2/5 text-right">amount</span>
        <span class="w-2/5 flex items-center justify-end">
          <img src="../assets/images/More.png" alt="" />
        </span>
      </div>
    </div>

    <div class="" v-for="user in filteredUsers" :key="user.id">
      <div
        class="cursor-pointer flex items-center justify-between"
        @click="openDetails = !openDetails"
      >
          <div class="w-1/2 flex items-center gap-7">
          <div class="flex items-center gap-5">
            <input class="chec" type="checkbox" />
            <img src="../assets/images/Down.png" alt="" />
          </div>
          <div>
            <span class="text-pry-var"
              >{{ user.firstName }} {{ user.lastName }}</span
            ><br />
            <span class="text-pry">{{ user.email }}</span>
          </div>
          <div>
            <div class="flex">
              <Label
                :active="user.userStatus === 'active'"
                :inactive="user.userStatus === 'inactive'"
                >{{ user.userStatus }}</Label
              >
            </div>
          </div>
          <span class="text-pry-var text-xs"
            >Last login: {{ user.lastLogin }}</span
          >
        </div>
        <span>
          <div class="flex">
            <Label
              :paid="user.paymentStatus === 'paid'"
              :unpaid="user.paymentStatus === 'unpaid'"
              :overdue="user.paymentStatus === 'overdue'"
              >{{ user.paymentStatus }}</Label
            >
          </div>
          <span class="text-pry-var text-xs">Paid on: {{ user.paidOn }}</span>
        </span>
        <span class="text-right">
          <span class="text-pry-var">${{ user.amountInCents * 0.01 }}</span
          ><br />
          <span class="text-xs">USD</span>
        </span>
        <span class="">
          <MoreMenu
            @activateUser="activateUser(user.id)"
            @deleteuser="deleteUser(user.id)"
          />
        </span>
      </div>
      <div class="" v-if="openDetails">
        <span class="act-add" colspan="5">
          <Act :activities="user.activities" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Label from "../components/Label.vue";
import HFilter from "../components/HFilter.vue";
import PayDues from "../components/PayDues.vue";
import Search from "../components/Search.vue";
import MoreMenu from "../components/MoreMenu.vue";
import Act from "./Details.vue";
import TestData from "../components/testData.vue";
export default {
  name: "Home",
  components: { HFilter, Search, PayDues, Label, MoreMenu, Act, TestData },
  data() {
    return {
      type: "",
      searchWord: "",
      openDetails: false,
      totalNumPerPage: 10,
      pageNumber: 1,
      totalPages: null,
      currentUser: "",
    };
  },

  watch: {
    searchWord() {
      if (this.searchWord) {
        return this.filteredUsers.filter((user) =>
          user.firstName.toLowerCase().includes(this.searchWord)
        );
      } else {
        return this.filteredUsers;
      }
    },
  },

  computed: {
    ...mapGetters({
      users: ["getUsers"],
    }),

    filteredUsers() {
      if (this.searchWord) {
        return (
          this.users &&
          this.users.filter(
            (user) =>
              user.firstName.toLowerCase().includes(this.searchWord) ||
              user.lastName.toLowerCase().includes(this.searchWord) ||
              user.email.toLowerCase().includes(this.searchWord)
          )
        );
      }
      return (
        this.users &&
        this.users.filter((user) => {
          switch (this.type) {
            case "paid":
              return user.paymentStatus === "paid";
            case "unpaid":
              return user.paymentStatus === "unpaid";
            case "overdue":
              return user.paymentStatus === "overdue";
            default:
              return true;
          }
        })
      );
    },

    totalPayableAmount() {
      if (this.users) {
        const dues =
          this.users &&
          this.users.filter(
            (user) =>
              user.paymentStatus === "unpaid" ||
              user.paymentStatus === "overdue"
          );
        const totalDues =
          dues && dues.map((el) => el.amountInCents).reduce((a, b) => a + b);
        return totalDues * 0.01;
      }
      return "0.00";
    },
  },

  methods: {
    filterType(type) {
      this.type = type;
    },

    activateUser(id) {
      this.$store.dispatch("activate", id);
    },

    deleteUser(id) {
      this.$store.dispatch("removeUser", id);
    },

    getTotalPages() {
      if (this.users) {
        this.totalPages = this.users.length / this.totalNumPerPage;
      }
      this.totalPages = 0;
    },

    nextPage() {
      if (this.totalPages > this.pageNumber) {
        this.pageNumber++;
      }
    },

    previousPage() {
      if (this.pageNumber <= this.totalPages && this.pageNumber !== 0) {
        this.pageNumber--;
      }
    },
  },

  mounted() {
    this.$store.dispatch("fetchUsers");
    this.getTotalPages();
  },
};
</script>

<style>
</style>