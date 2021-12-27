<template>
  <div>
    <div class="w-full">
      <div class="table-head">
        <span class="act-data">DATE</span>
        <span class="act-data">USER ACTIVITY</span>
        <span class="act-data">DETAILS</span>
      </div>
      <div
        class="table-head"
        v-for="(activity, index) in activities"
        :key="index"
      >
        <span class="act-data">{{ activity.date }}</span>
        <span class="act-data">{{ activity.userActivity }}</span>
        <span class="act-data">{{ activity.details }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['activities']
};
</script>

<style>
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

.act-add {
  padding: 0px !important;
}
</style>