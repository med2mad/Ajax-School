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
    handleDateClick: function(arg) {
      this.calendarOptions.events.push({title:'sdfdsf', date: arg.dateStr+'T00:00:00'})
    },
    handleEventClick: function(info) {
      alert('Event : ' + info.event.title);
    },

  }
}
</script>