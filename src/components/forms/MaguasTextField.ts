import Vue from 'vue'

export default Vue.extend({
  name: "MaguasTextField",
  props: {
    rules: {
      type: [Object, String],
      default: "",
    },
    // must be included in props
    value: {
      type: [String, Number],
    },
    name: {
      type: String,
      required: true,
    },
    noLabel: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data: () => ({
    innerValue: "",
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      if (this.$attrs.type && this.$attrs.type === "number") {
        if (newVal === "") {
          this.$emit("input", newVal);
        } else {
          if (this.$attrs.step) {
            this.$emit("input", parseFloat(newVal));
          } else {
            this.$emit("input", parseInt(newVal));
          }
        }
      } else {
        this.$emit("input", newVal);
      }
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = String(newVal);
    },
  },
  created() {
    this.innerValue = String(this.value);
  },
});
