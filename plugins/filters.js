import Vue from 'vue'
export default (context) => {
  Vue.filter('toDate', function(value){
    if(!value) return '';
    return context.$dayjs(value).format('YYYY-MM-DD');
  })
}