<template>
  <div class="home">
    <h1 class="mb-5">Table Heading</h1>

    <div class="nav-header">
      <ul class="nav">
        <li>All</li>
        <li>Paid</li>
        <li>Unpaid</li>
        <li>Overdue</li>
      </ul>

      <p>Total payable amount: <span class="font-bold">$900.00</span> USD</p>
    </div>

   <div class="h-card mt-5 w-full">
    <div class="px-5 py-4 flex items-center justify-between">
      <div class="flex items-center gap-5">
        <FilterBtn />
        <Search />
      </div>

      <PayDues />
    </div>

      <table class="w-full">
      <tr>
        <th><input type="checkbox"></th>
        <th>name</th>
        <th>user status</th>
        <th>payment</th>
        <th>amount</th>
        <th>  <img src="../assets/images/More.png" alt="" /></th>
      </tr>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="flex items-center gap-7">
            <input type="checkbox">
            <img src="../assets/images/Down.png" alt="" />
          </td>
          <td>
            <span class="text-pry-var">{{ user.firstName }} {{ user.lastName }}</span><br>
            <span class="text-pry">{{ user.email }}</span>
          </td>
          <td>
            <Label active >{{ user.userStatus }}</Label><br>
            <span class="text-pry-var text-xs">Last login: {{ user.lastLogin }}</span>
          </td>
          <td>{{ user.paymentStatus }}</td>
          <td>
            <span>{{ user.amountInCents }}</span><br>
            <span>USD</span>
          </td>
          <td class="flex items-center gap-7">
            <span>View more</span>
            <img src="../assets/images/More.png" alt="" />
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Label from "../components/Label.vue";
import FilterBtn from "../components/FilterBtn.vue";
import PayDues from '../components/PayDues.vue';
import Search from "../components/Search.vue";
export default {
  name: "Home",
  components: { FilterBtn, Search, PayDues, Label },

  computed: {
    ...mapGetters({
      users: ['getUsers']
    })
  },

  mounted() {
    this.$store.dispatch('fetchUsers')
  }
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
</style>
