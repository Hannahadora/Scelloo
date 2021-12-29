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

      <p class="lg:my-0 my-3">
        Total payable amount:
        <span class="font-bold">${{ totalPayableAmount }}</span> USD
      </p>
    </div>

    <div class="h-card mt-5 w-full">
      <div class="px-5 py-4 flex md:flex-row flex-col md:items-center items-end justify-between">
        <div class="flex items-center gap-5">
          <HFilter :displayedArray="filteredUsers" />
          <Search v-model="searchWord" />
        </div>

        <PayDues class="md:mt-0 mt-2"/>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <tr>
            <th>
              <input
                class="chec"
                type="checkbox"
                @click="selectAll"
                v-model="allSelected"
              />
            </th>
            <th>name</th>
            <th class="pr-48">user status</th>
            <th>payment</th>
            <th class="text-right">amount</th>
            <th>
              <div class="flex items-center justify-end">
                <img src="../assets/images/More.png" alt="" />
              </div>
            </th>
          </tr>

          <tbody class="w-full" v-for="user in displayedUsers" :key="user.id">
            <tr
              class="cursor-pointer"
              :class="{ 'active-table': currentUser === user.id }"
            >
              <td>
                <div class="flex items-center justify-center gap-5">
                  <input
                    class="chec"
                    type="checkbox"
                    :value="user.id"
                    v-model="userIds"
                    @click="setSelectedUser()"
                  />
                  <img
                    src="../assets/images/Union.png"
                    alt=""
                    v-if="currentUser === user.id"
                  />
                  <img src="../assets/images/Down.png" alt="" v-else />
                </div>
              </td>
              <td>
                <span class="text-pry-var"
                  >{{ user.firstName }} {{ user.lastName }}</span
                ><br />
                <span class="text-pry">{{ user.email }}</span>
              </td>
              <td class="" :class="{ 'pr-16': currentUser === user.id }">
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
                <span class="text-pry-var"
                  >${{ user.amountInCents * 0.01 }}</span
                ><br />
                <span class="text-xs">USD</span>
              </td>
              <td class="w-max">
                <MoreMenu
                  :initText="
                    user.userStatus === 'active'
                      ? 'Deactivate User'
                      : 'Activate User'
                  "
                  @openDetails="setCurrentUser(user)"
                  @toggleUserStatus="toggleUserStatus(user)"
                  @deleteUser="deleteUser(user)"
                  @markPaid="markAsPaid(user)"
                  @ViewProfile="viewProfile(user)"
                />
              </td>
            </tr>
            <tr class="" v-if="currentUser === user.id">
              <td class="act-add" colspan="6">
                <Details :activities="user.activities" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="users"
        class="paginator flex items-center justify-end py-4 px-5"
      >
        <div class="flex items-center gap-3">
          <span class="">Rows per page: {{ totalNumPerPage }}</span>
          <img src="../assets/images/Polygon 3.png" alt="" />
        </div>
        <span
          >{{ firstIndex }}-{{ lastIndex }} of
          {{ filteredUsers ? filteredUsers.length : "loading" }}</span
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
import Details from "../components/Details.vue";
export default {
  name: "Home",
  components: { HFilter, Search, PayDues, Label, MoreMenu, Details },
  data() {
    return {
      type: "",
      searchWord: "",
      totalNumPerPage: "",
      pageNumber: 1,
      totalPages: null,
      currentUser: "",
      firstIndex: 1,
      lastIndex: 10,
      isSelected: null,
      userIds: "",
      allSelected: "",
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

    pageNumber() {
      if (this.pageNumber === 1) {
        this.firstIndex = this.pageNumber;
      } else this.firstIndex = this.pageNumber + 10 - 1;
      this.lastIndex = this.pageNumber * 10;
    },

    filteredUsers() {
      if (this.filteredUsers.length <= 9) {
        this.totalNumPerPage = this.filteredUsers.length;
      } else this.totalNumPerPage = 10;
      this.totalPages = this.filteredUsers.length / this.totalNumPerPage;
    },
  },

  computed: {
    ...mapGetters({
      users: ["getUsers"],
    }),

    displayedUsers() {
      return this.filteredUsers.slice(this.firstIndex - 1, this.lastIndex);
    },

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
      if (this.allDef) {
        return this.users;
      }
      if (this.firstName) {
        return this.users.sort((a, b) => a.firstName - b.firstName);
      }
      if (this.lastName) {
        return this.users.sort((a, b) => a.lastName - b.lastName);
      }
      if (this.lastLogin) {
        return this.users.sort((a, b) => b.lastLogin - a.lastLogin);
      }
      if (this.dueDate) {
        return this.users.sort((a, b) => b.dueDate - a.dueDate);
      }
      if (this.allKind) {
        return this.users;
      }
      if (this.active) {
        return this.users.filter((el) => el.userStatus === "active");
      }
      if (this.inactive) {
        return this.users.filter((el) => el.userStatus === "inactive");
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
        return (totalDues * 0.01).toFixed(2);
      }
      return "0.00";
    },

    userLength() {
      return this.filteredUsers && this.filteredUsers.length;
    },
  },

  methods: {
    filterType(type) {
      this.type = type;
    },

    setCurrentUser(user) {
      if (this.currentUser === user.id) {
        this.currentUser = "";
      } else this.currentUser = user.id;
    },

    selectAll() {
      if (this.allSelected) {
        this.users.forEach((user) => {
          this.userIds.push(user.id.toString());
        });
      } else {
        this.userIds = [];
      }
    },

    setSelectedUser() {
      this.allSelected = false;
    },

    toggleUserStatus(user) {
      if (user.userStatus === "active") {
        this.$store.dispatch("deactivate", user.id);
        alert(`${user.firstName} ${user.lastName} decativated`);
      } else {
        this.$store.dispatch("activate", user.id);
        alert(`${user.firstName} ${user.lastName} activated`);
      }
    },

    markAsPaid(user) {
      if (user.paymentStatus === "paid") {
        alert(`${user.firstName} ${user.lastName} has already paid`);
      } else {
        this.$store.dispatch("markAsPaid", user.id);
        alert(`${user.firstName} ${user.lastName} marked as paid`);
      }
    },

    deleteUser(user) {
      if (
        confirm(
          `Are you sure you want to delete ${user.firstName} ${user.lastName}`
        )
      ) {
        this.$store.dispatch("removeUser", user.id);
        alert(`${user.firstName} ${user.lastName} deleted`);
      }
    },

    viewProfile(user) {},

    nextPage() {
      if (this.totalPages > this.pageNumber) {
        this.pageNumber++;
      }
    },

    previousPage() {
      if (this.pageNumber <= this.totalPages && this.pageNumber !== 1) {
        this.pageNumber--;
      }
    },

    markAllAsPaid() {
      this.users.find((el) => {
        if (this.userIds.includes(el.id)) {
          this.$store.dispatch("markAsPaid", el.id);
        }
      });
    },
  },

  async beforeMount() {
    await this.$store.dispatch("fetchUsers");
  },

  created() {},
};
</script>

<style scoped>
.paginator {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  background: #f4f2ff;
  gap: 50px;
}

.act-add {
  padding: 0px !important;
}
</style>
