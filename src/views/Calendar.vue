<template>
  <div class="py-4 container-fluid">
  <div class="row">
  <div class="col-12">
    <FullCalendar ref="cal" :options="calendarOptions" />
  </div>
  </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'

export default {
components: {FullCalendar},
data() {
  return {
      calendarOptions: {events:[],
      plugins: [ dayGridPlugin, interactionPlugin ],
      firstDay:1, //monday
      eventTimeFormat: {hour:'numeric', minute:'numeric', hour12:false},
      showNonCurrentDates:false, //last/next mounths
      dayMaxEvents:true,//true/integer
      dateClick: this.handleDateClick,
      eventClick: this.handleEventClick,
      headerToolbar: {center:'dayGridMonth,dayGridDay'},
    }
  }},

  methods:{
    handleEventClick: function(info) {
      alert('Event : ' + info.event.title);
    },
  },

  mounted(){
    axios.get('http://localhost:5000/snippet')
    .then((response)=>{
      const data = response.data.rows;
      data.forEach((row)=>{
        console.log(row);
        this.calendarOptions.events.push({title:row.ajax, date:row.date})
      })
    });
  },
}
</script>