<template>
  <div class="search-card">
    <img src="../assets/images/Search.png" alt="" />
    <input
      class="search-input focus:outline-none w-10/12"
      type="text"
      placeholder="Search Users by Name, Email or Date"
    />
  </div>
</template>

<script>
export default {};
</script>

<style>
.search-card {
  width: 392px;
  height: 40px;
  background: #f4f2ff;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px;
}
.search-input {
  border: none;
  background: transparent;
}
</style>