<template>
  <div>
    <div class="filter-row mt-8_2">
      <label class="capitalize">
        {{ label }}
      </label>
      <input
        v-bind="$attrs"
        type="radio"
        :checked="checked"
        :name="name"
        :value="value"
        :id="id"
        @input="onInput"
        @click="$emit('handleClick')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseRadioButton",
  inheritAttrs: false,
  model: {
    prop: "modelValue",
    event: "update",
  },
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    modelValue: {
      default: "",
    }

  },
  data() {
    return {};
  },
  computed: {
    checked() {
      return this.modelValue === this.value;
    },
  },
  methods: {
    onInput(event) {
      this.$emit("update", event.target.value);
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