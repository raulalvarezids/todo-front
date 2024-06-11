<template>
    <div >
        
        <input type="checkbox" v-model="status" @change="handleUpdataStatus" >

        <h3 :class="{
            styling:status
        }">{{ props.text }}</h3>
                
        <v-icon name="md-deleteforever" color="red" @click="handleDelete" class="icon" animation="wrench" hover="true"/>

    </div>
    
</template>

<script lang="ts" setup>
import {  ref } from 'vue';
import { useUserStore } from '../store/user';
import { deleteTask, updateTask } from '../utils/FetchingTasks';
import { ResponseErrores } from '../interfaces/response';

const store = useUserStore()

const emits = defineEmits(['handledeleted','deleting'])


const handleDelete = async  () => {

    if(store.token == null){        
        emits('handledeleted',props.id)    
    }else{
        emits('deleting', props.id)        
    }
    
}

const handleUpdataStatus = async () =>{    
    if(store.token !== null){       

        const resStatus : ResponseErrores= await updateTask(store.token,status.value,props.id)


        if(!resStatus.NoError){
            if(resStatus.AuthError){
                manageLogOut()
            }else{
                alert('Sorry, try later')
                status.value = !status.value
            }            
        }
    }

}


const manageLogOut = () => {
    alert('session ended')
    store.deleteData()
}

const props = defineProps({
    text:{type:String}, 
    status:{type:Boolean},
    id:String
})

let status = ref<boolean>(props.status) 

</script>

<style scoped>

div{
    display: flex;
    background-color: #F3F4F6;
    border: 1px solid rgba(0, 0, 0, 0.151);
    border-radius: 5px;    
    align-items: center;
    padding: 5px;    
    margin-block: 10px;
}

.icon{
    cursor: pointer;
}

h3{
    flex-grow: 1;
    margin-left: 10px
}

.styling{
    text-decoration:line-through;
}

@media(min-width:1100px) {
    .icon{
        cursor: pointer;        
    }

    h3{
        font-size: 20px
    }

    .styling{
        text-decoration:line-through;
    }

}


</style>