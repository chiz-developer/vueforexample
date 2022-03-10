export default {
  created() {
    let errors = {};
    let fields = {};
    if (this.schema) {
      for (let i = 0; i < this.schema.fields.length; i++) {
        const element = this.schema.fields[i];
        errors[element.model] = true;
        fields[element.model] = element.default || "";
      }

      if(this.schema.groups) {
        for (let i = 0; i < this.schema.groups.length; i++) {
          for (let t = 0; t < this.schema.groups[i].fields.length; t++) {
            const element = this.schema.groups[i].fields[t];
            errors[element.model] = true;
            fields[element.model] = element.default || "";
          }
        }
      }

      this.errors = errors;

      if (!this.editMode) {
        this.model = fields;
      }
    }
  },

  data() {
    return {
      editMode: false,
      model: {},
      errors: {},
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
      },
      vfgRefs: ["form"],
    };
  },

  methods: {
    validator(a, b, c) {
      return this.errors[b.model];
    },
    setApiErrors(error) {
      if (error.response?.status === 422) {
        this.errors = error.response.data.errors;
        this.triggerFormValidator();
      }
    },

    triggerFormValidator() {
      this.vfgRefs.forEach((r) => {
        if(this.$refs[r]) {
          this.$refs[r].validate()
        }
      });
    },
  },
};
