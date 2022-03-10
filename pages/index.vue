<template>
  <div>
    <Header />
    <!--<Events />-->
    <About />
    <Experts />
    <ScheduleSession />
    <Testimonials />
    <News />
    <div class="container px-8 mx-auto 2xl:px-40 mt-[120px]">
      <div class="w-full h-[1px] bg-gray-50"></div>
    </div>
    <Instagram />
  </div>
</template>

<script>
import About from "../components/home/About.vue";
import Experts from "../components/home/Experts.vue";
import Events from "../components/home/Events.vue";
import Header from "../components/home/Header.vue";
import Instagram from "../components/home/Instagram.vue";
import News from "../components/home/News.vue";
import ScheduleSession from "../components/home/ScheduleSession.vue";
import Testimonials from "../components/home/Testimonials.vue";
export default {
  components: {
    Header,
    Events,
    About,
    Experts,
    Testimonials,
    ScheduleSession,
    News,
    Instagram,
  },
  name: "Home",
  layout: "default",
};
</script>
