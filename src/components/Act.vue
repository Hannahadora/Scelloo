<template>
  <div>
    <table class="w-full">
      <tr>
        <th>Date</th>
        <th>User activity</th>
        <th>Details</th>
      </tr>
      <tr
        class="px-24"
        v-for="(activity, index) in activities"
        :key="index"
      >
        <td>{{ activity.date }}</td>
        <td>{{ activity.userActivity }}</td>
        <td>{{ activity.details }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
    props: ['activities']
};
</script>

<style>
</style>