<template>
  <div>
    <button @click="$emit('markAllAsPaid')" class="pd">
        Pay Dues 
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style>
.pd {
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  background: #6D5BD0;
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px;
  border-radius: 6px;
}
</style>