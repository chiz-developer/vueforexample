export const state = () => ({
  appointments: {
    date: new Date(),
    items: [],
  },
});

export const mutations = {
  setAppointmentsItems(state, data) {
    state.appointments.items = data;
  },

  setAppointmentsDate(state, date) {
    state.appointments.date = date;
  }
};

export const actions = {
  async fetchAppointments({ commit, state }) {
    try {
      const { data } = await this.$axios.$get("/user/appointments", {
        params: {
          date: this.$dayjs(state.appointments.date).format("YYYY-MM-DD"),
        },
      });

      commit("setAppointmentsItems", data);
    } catch (err) {
      throw new Error(err);
    }
  },
};

export const getters = {
  appointmentsItems: (state) => state.appointments.items,
};
