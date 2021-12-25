<template>
  <div class="home">
    <h1 class="mb-5">Table Heading</h1>

    <div class="nav-header">
      <ul class="nav">
        <li :class="{ 'active-nav': type === '' }" @click="filterType('')">
          All
        </li>
        <li
          :class="{ 'active-nav': type === 'paid' }"
          @click="filterType('paid')"
        >
          Paid
        </li>
        <li
          :class="{ 'active-nav': type === 'unpaid' }"
          @click="filterType('unpaid')"
        >
          Unpaid
        </li>
        <li
          :class="{ 'active-nav': type === 'overdue' }"
          @click="filterType('overdue')"
        >
          Overdue
        </li>
      </ul>

      <p>
        Total payable amount:
        <span class="font-bold">${{ totalPayableAmount }}</span> USD
      </p>
    </div>

    <div class="h-card mt-5 w-full">
      <div class="px-5 py-4 flex items-center justify-between">
        <div class="flex items-center gap-5">
          <HFilter :displayedArray="filteredUsers" />
          <Search v-model="searchWord" />
        </div>

        <PayDues />
      </div>

      <table class="w-full">
        <tr>
          <th><input class="chec" type="checkbox" /></th>
          <th>name</th>
          <th>user status</th>
          <th>payment</th>
          <th class="text-right">amount</th>
          <th class="flex items-center justify-end">
            <img src="../assets/images/More.png" alt="" />
          </th>
        </tr>

        <tbody v-for="user in filteredUsers" :key="user.id">
          <tr class="cursor-pointer" @click="openDetails = !openDetails">
            <td class="flex items-center gap-7">
              <input class="chec" type="checkbox" />
              <img src="../assets/images/Down.png" alt="" />
            </td>
            <td>
              <span class="text-pry-var"
                >{{ user.firstName }} {{ user.lastName }}</span
              ><br />
              <span class="text-pry">{{ user.email }}</span>
            </td>
            <td>
              <div class="flex">
                <Label
                  :active="user.userStatus === 'active'"
                  :inactive="user.userStatus === 'inactive'"
                  >{{ user.userStatus }}</Label
                >
              </div>
              <span class="text-pry-var text-xs"
                >Last login: {{ user.lastLogin }}</span
              >
            </td>
            <td>
              <div class="flex">
                <Label
                  :paid="user.paymentStatus === 'paid'"
                  :unpaid="user.paymentStatus === 'unpaid'"
                  :overdue="user.paymentStatus === 'overdue'"
                  >{{ user.paymentStatus }}</Label
                >
              </div>
              <span class="text-pry-var text-xs"
                >Paid on: {{ user.paidOn }}</span
              >
            </td>
            <td class="text-right">
              <span class="text-pry-var">${{ user.amountInCents * 0.01 }}</span
              ><br />
              <span class="text-xs">USD</span>
            </td>
            <td class="">
              <MoreMenu
                @activateUser="activateUser(user.id)"
                @deleteuser="deleteUser(user.id)"
              />
            </td>
          </tr>
          <tr v-if="openDetails">
            <td colspan="5"><Act :activities="user.activities" /> </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="users"
        class="paginator flex items-center justify-end py-4 px-5"
      >
        <div class="flex items-center gap-3">
          <span class="">Rows per page: {{ totalNumPerPage }}</span>
          <img src="../assets/images/Polygon 3.png" alt="" />
        </div>
        <span
          >{{ pageNumber }}-{{ totalNumPerPage }} of
          {{ users ? users.length : "loading" }}</span
        >
        <img
          class="cursor-pointer"
          src="../assets/images/Vector (3).png"
          alt=""
          @click="previousPage"
        />
        <img
          class="cursor-pointer"
          src="../assets/images/Vector (4).png"
          alt=""
          @click="nextPage"
        />
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
import Act from '../components/Act.vue';
export default {
  name: "Home",
  components: { HFilter, Search, PayDues, Label, MoreMenu, Act },
  data() {
    return {
      type: "",
      searchWord: "",
      openDetails: false,
      totalNumPerPage: 10,
      pageNumber: 1,
      totalPages: null,
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
      if(this.totalPages > this.pageNumber) {
        this.pageNumber++
      }
    },

    previousPage() {
      if(this.pageNumber <= this.totalPages && this.pageNumber !== 0) {
        this.pageNumber--
      }
    }
  },

  mounted() {
    this.$store.dispatch("fetchUsers");
    this.getTotalPages();
  },
};
</script>

<style scoped>
.nav-header {
  margin-top: 20px;
  border-bottom: 1px solid #c6c2de;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.chec {
  width: 20px;
  height: 20px;
}

.paginator {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  background: #f4f2ff;
  gap: 50px;
}
</style>
