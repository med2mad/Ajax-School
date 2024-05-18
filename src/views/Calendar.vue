<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="FullCalendar">
        <FullCalendar ref="cal" :options="calendarOptions" />
      </div>
      <div class="offCanvas">
        <FullCalendar ref="cal2" :options="calendarOptions2">

        </FullCalendar>
      </div>
    </div>
  </div>

  <div>            
    <router-link to="/Showresult"> <div class="btn">back asldkfjdslfjs lfsjflsjfdslkfjs;lfdsl</div> </router-link>
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
      calendarOptions: {
      plugins: [ dayGridPlugin, interactionPlugin ],
      firstDay:1,
      eventTimeFormat: {hour:'numeric', minute:'numeric', hour12:false},
      showNonCurrentDates:false,
      dayMaxEvents:true,
      dateClick: this.handleDateClick,
      eventClick: this.handleEventClick,
      headerToolbar: {center:'today prev,next', end:''},
    },
    calendarOptions2: {
      plugins: [ dayGridPlugin ],
      initialView:'dayGrid',
      eventTimeFormat: {hour:'numeric', minute:'numeric', hour12:false},
      eventClick: this.handleEventClick
    }
  }},

  methods:{
    handleDateClick: function(info) {
      this.$refs.cal2.calendar.gotoDate(info.dateStr);
    },
    handleEventClick: function(info) {
      alert('event')
    },
  },

  mounted(){
    axios.get('http://localhost:5000/snippet')
    .then((response)=>{
      const data = response.data.rows;
      data.forEach((row)=>{
        this.$refs.cal.calendar.addEvent( {"date":row.date, "title":row.ajax + ' ' + row.action} )
        this.$refs.cal2.calendar.addEvent( {"date":row.date, "title":row.ajax, "description":row.ajax+' '+row.action +"\n"+row.snippet} )
      })
    });
  },
}
</script>

<style>
  .row{
    display: flex;
  }
  .offCanvas{
    flex:1;
  }
  .FullCalendar{
    flex:2;
  }
</style>