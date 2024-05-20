<template>
  <div class="row">
      <FullCalendar class="cal1" ref="cal1" :options="calendarOptions1" />
      <FullCalendar class="cal2" ref="cal2" :options="calendarOptions2" />
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
    calendarOptions1: {
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
      plugins: [ dayGridPlugin, interactionPlugin ],
      initialView:'dayGrid',
      eventTimeFormat: {hour:'numeric', minute:'numeric', hour12:false},
      headerToolbar: false,
      dayHeaders:false,
      displayEventTime:false,
      eventDidMount: function(info) {
          var target = info.el.getElementsByClassName('fc-event-title')[0];
          if (target === undefined) return;
          var div = document.createElement('div');
          div.innerHTML = '' + (!!info.event.extendedProps.description?info.event.extendedProps.description:' ') + '';
          target.parentNode.insertBefore(div.firstChild, target.nextSibling);
          info.el.setAttribute('data-event-id',info.event.id);
      },
    }
  }},

  methods:{
    handleDateClick: function(info) {
      this.$refs.cal2.calendar.gotoDate(info.dateStr);
    },
    handleEventClick: function(info) {
      this.$refs.cal2.calendar.gotoDate(info.event.start);
    }
  },

  mounted(){
    axios.get('http://localhost:5000/snippet')
    .then((response)=>{
      const data = response.data.rows;
      for (let row of data) {
        let desc = '<p><span class="subtitle">Back:</span><br>' + row.back + '<br><br>'
            desc += '<span class="subtitle">Snippet:</span><br><span class="snippet">' + row.snippet + '</span></p>';
        this.$refs.cal1.calendar.addEvent( {"start":new Date(row.date).toISOString(), "title":row.ajax+' '+row.action, "description":desc, display:'block'} );
        this.$refs.cal2.calendar.addEvent( {"start":new Date(row.date).toISOString(), "title":row.ajax+' '+row.action + ' ' + new Date(row.date).getHours()+':'+new Date(row.date).getMinutes(), "description":desc, display:'block'} );
      }
    });
  },
}
</script>

<style>
  .row{
    display: flex;
  }
  .cal1{
    flex-grow: 1;
    flex:2;
  }
  .cal2{
    flex: 1;
  }
  .cal2 .fc-event {
    margin-bottom: 6px;
    overflow: auto;
  }
  .cal2 .fc-event .fc-event-title{
    font-weight: bold;
    border:solid 1px black;
    width:100%;
    border-radius: 5px;
    background-color: rgb(160, 206, 214);
    color:black;
    text-align: center;
  }
  .cal2 .fc-event .subtitle{
    text-decoration:underline;
    font-weight: bold;
  }
</style>