<template>
  <div>
    <div class="w-full">
      <div class="table-head">
        <span class="act-data text-xs font-semibold w-24">DATE</span>
        <span class="act-data text-xs font-bold w-2/6">USER ACTIVITY</span>
        <div class="act-data w-2/4">
          <span
            data-tooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget."
            class="tooltip w-max flex items-center gap-1 text-xs font-bold"
            >DETAILS <img src="../assets/images/Details.png" alt=""
          /></span>
        </div>
      </div>
      <div
        class="table-head"
        v-for="(activity, index) in activities"
        :key="index"
      >
        <span class="act-data uppercase w-24 flex items-center justify-center">{{
          convertDate(activity.date)
        }}</span>
        <span class="act-data w-2/6">{{ activity.userActivity }}</span>
        <span class="act-data w-2/4">{{ activity.details }}</span>
      </div>
      <div
        class="flex items-center justify-center active-table py-10"
        v-if="!activities || activities.length === 0"
      >
        <span class="font-semibold text-base uppercase text-center leading-5"
          >NO RECORDS FOUND</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "Details",
  props: ["activities"],
  methods: {
    convertDate(x) {
      return moment(x).format("DD/MMM/YYYY");
    },
  },
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

.tooltip {
  height: auto;
  position: relative;
}

.tooltip::before,
.tooltip::after {
  --scale: 0;
  --arrow-size: 10px;
  --tooltip-color: #fff;

  position: absolute;
  top: 135px;
  left: 190%;
  transform: translateX(-50%) translateY(var(--translate-y, 0))
    scale(var(--scale));
  transition: 150ms transform;
  transform-origin: bottom center;
}

.tooltip::before {
  --translate-y: calc(-100% - 10px);

  content: attr(data-tooltip);
  color: #25213b;
  padding: 10px 10px 10px 15px;
  width: 118px;
  height: 140px;
  /* max-width: 100%; */
  background: #fff;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);
  /* transform: rotate(90deg); */
}

.tooltip:hover::before,
.tooltip:hover::after {
  --scale: 1;
}

.tooltip::after {
  --translate-y: calc(-1 * 10px);
  content: "";
  border: 5px solid transparent;
  border-top-color: #fff;
  transform-origin: top center;
}
</style>