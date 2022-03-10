<template>
  <div></div>
</template>

<script>
export default {
  layout: "panel",
  middleware: ["authorized"],
  created() {
    const userRole = this.$auth.user.role;

    switch (userRole) {
      case "admin":
        this.$router.push("/panel/admin/users");
        break;
      case "expert":
        this.$router.push("/panel/expert");
        break;
      case "user":
        this.$router.push("/panel/user");
        break;
    }
  },
};
</script>
