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

    <div class="mt-5 bg-white px-5 py-4 flex items-center justify-between">
      <div class="flex items-center gap-5">
        <FilterBtn />
        <Search />
      </div>

      <PayDues />
    </div>

    <table class="w-full">
      <th>
        <td><input type="checkbox"></td>
        <td>name</td>
        <td>user status</td>
        <td>payment</td>
        <td>amount</td>
      </th>

      <tbody>
         <td><input type="checkbox"></td>
      </tbody>
    </table>
  </div>
</template>

<script>
import FilterBtn from "../components/FilterBtn.vue";
import PayDues from '../components/PayDues.vue';
import Search from "../components/Search.vue";
export default {
  name: "Home",
  components: { FilterBtn, Search, PayDues },
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
