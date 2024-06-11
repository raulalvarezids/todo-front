import { defineStore } from "pinia";
import { User } from "../interfaces/user";
import { UserLogin } from "../interfaces/userLogin";
import axios from "axios";

export const useUserStore = defineStore('user',{
    state:  () : User => {
        return {
            token : null,
            error : null
        }
    },
    actions : {
         async login (user : UserLogin) {
            const url = import.meta.env.VITE_HOST            
            
            await axios.post(url+'/users/login',user)
            .then(response => {
                this.error = null                
                this.token = response.data.token
            })
            .catch(error => {                
                this.token=null
                this.error = error.response.data.message
            })

            

        },
        async register (user : UserLogin) {
            const url = import.meta.env.VITE_HOST

            await axios.post(url+'/users',user)
            .then(response => {
                this.error = null                
                this.token = response.data.token
            })
            .catch(error => {                  
                this.token=null
                this.error = error.response.data.message
            })
        },
        deleteData () {
            this.token=null
            this.error=null
        }
    },
    persist:true
})