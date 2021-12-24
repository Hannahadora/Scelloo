<template>
  <div
    class="h-label flex items-center gap-1"
    :class="{
      activeStyle: active,
      inactiveStyle: inactive,
      paidStyle: paid,
      unpaidStyle: unpaid,
      overdueStyle: overdue,
    }"
  >
    <div
      class="h-eclipse"
      :class="{
        'bg-active': active,
        'bg-pry': inactive,
        'bg-positive': paid,
        'bg-unpaid': unpaid,
        'bg-negative': overdue,
      }"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Label",
  data() {
    return {};
  },

  props: {
    active: {
      type: Boolean,
    },
    inactive: {
      type: Boolean,
    },
    paid: {
      type: Boolean,
    },
    unpaid: {
      type: Boolean,
    },
    overdue: {
      type: Boolean,
    },
  },

  computed: {},
};
</script>

<style>
.h-label {
  width: auto;
  padding: 5px;
  font-size: 12px;
  line-height: 15px;
  border-radius: 10px;
  text-transform: capitalize;
}

.h-eclipse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.activeStyle {
  background: #e6e6f2;
  color: #4a4aff;
}

.inactiveStyle {
  background: #f2f0f9;
  color: #6e6893;
}

.paidStyle {
  background: #cdffcd;
  color: #007f00;
}

.unpaidStyle {
  background: #ffeccc;
  color: #965e00;
}
.overdueStyle {
  background: #ffe0e0;
  color: #d30000;
}

.bg-active {
  background: #4a4aff;
}
.bg-unpaid {
  background: #965e00;
}
</style>