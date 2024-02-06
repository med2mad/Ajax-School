<template >

    <nav>
        <ul class="pagination">
            <li class="page-item" @click="changeCurrent(current-1)"><span class="page-link">&laquo;</span></li>
            <li v-for="i in pagination.pages" :key="i" class="page-item" :class="{currentStyle: current==i}" @click="changeCurrent(i)"><span class="page-link">{{i}}</span></li>
            <li class="page-item" @click="changeCurrent(current+1)"><span class="page-link">&raquo;</span></li>
        </ul>
    </nav>

</template>

<script>
export default{
    emits:['changepage'],
    props: { pagination:{type:Object} },
    data(){return{
                current:1,
            }
        },
    methods:{
        changeCurrent(i){
            if(i>=this.pagination.startPage && i<=this.pagination.endPage)//check for next/previous buttons
            {
                this.current=i;
                this.$emit('changepage', i); 
            }
        },
    }
}
</script> 

<style>
@font-face {
    font-family: Rajdhani-Regular;
    src: url('C:\Users\MED\Desktop\AJAX Paradise\public\fonts\Rajdhani-Regular.ttf');
}

.pagination{
    list-style-type:none;
    /* background-color: white;
    border: solid 1px black;
    border-radius: 5px;*/
    margin: auto;
    width: 50%; /* remove in mobile */
    max-width: 500px; /* remove in mobile */
    display: flex;
    /* justify-content: space-between; */
    justify-content:center;
}

.page-item{
    min-width:36px; /* edit in mobile */
}
.page-item:hover{
    cursor: pointer;
}

.page-link{
    font-family: Rajdhani-Regular, sans-serif;
    font-size: 1.2rem;
    text-decoration: none;
    color: rgb(0, 0, 140);
}

.currentStyle{
    font-weight: bold;
    border-bottom: solid 1px rgb(0, 0, 140);
}
</style>