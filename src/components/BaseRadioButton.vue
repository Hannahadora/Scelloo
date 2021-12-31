<template>
  <div>
    <div
      class="filter-row mt-8_2"
      v-for="option in options"
      :key="option.value"
    >
      <label :for="option" class="capitalize">
        {{ option.name }}
      </label>
      <input
        v-bind="$attrs"
        type="radio"
        :name="options"
        :value="option.value"
        :id="option.value"
        @change="$emit('input', option.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseRadioButton",
  inheritAttrs: false,
  props: {
    options: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style>
.filter-row {
  margin-bottom: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #25213b;
  font-weight: 400;
}

.filter-row:hover {
  background-color: #f2f0f9;
  border-radius: 4px;
}

.filter-sect1 {
  border-bottom: 1px solid #f2f0f9;
}

label {
  font-weight: 400;
  color: #25213b;
}
</style>