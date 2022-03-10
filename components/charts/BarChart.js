import { Bar } from "vue-chartjs";

const options = {
  responsive: true,
  maintainAspectRatio: false,

  legend: {
    display: false,
  },

  tooltips: {
    backgroundColor: "#6e9fb1",
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
          drawBorder: false,
          drawOnChartArea: false,
          display: false,
          zeroLineColor: "transparent",
          drawTicks: false,
        },

        ticks: {
          padding: 20,
          reverse: false,
          fontColor: 'black'
        },
      },
    ],
    yAxes: [
      {
        position: "left",
        ticks: {
          beginAtZero: true,
          fontColor: 'black'
        },
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
          drawBorder: false,
        },
      },
    ],
  },
};
export default {
  extends: Bar,
  props: {
    labels: {
      type: Array,
      default: () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    data: {
      type: Array,
      default: () =>  [0, 100, 300, 500, 1000, 5000]
    },
   
  },
  methods: {
    render() {
      options.scales.xAxes[0].ticks.reverse = 
      this.$i18n.locale == "ar" ? true : false;
      options.scales.yAxes[0].position = 
      this.$i18n.locale == "ar" ? "right" : "left";

      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
             data: this.data,
             barPercentage: 0.9,
             backgroundColor: "#D3EAF2",
              borderRadius: "40px",
            },
          ],
        },
        options,

      );
    }
  },
  mounted() {
    this.render();
  },
  watch: {
    data() {
      this.render();
    }
  }
};