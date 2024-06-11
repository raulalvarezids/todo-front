import axios from "axios"
import { GetTasks } from "../interfaces/getTask"
import { Tasks } from "../interfaces/task"
import { ResponseErrores } from "../interfaces/response"


const url = import.meta.env.VITE_HOST


export const getTasks = async (token:String) : Promise<GetTasks>  =>  {
    
    const headers =  {
        headers : {
        'Authorization': `Bearer ${token}`   
        }
    }
    let data : GetTasks = {
        error : false,
        data : []
    }
    

    await axios.get(url+'/tasks',headers)
    .then(response => {               
        data.data=response.data
    })
    .catch(error => {                                
        data.error=true    
    })

    return data
}

export const updateTask = async (token:String,status:boolean,id? : string)  : Promise<ResponseErrores>  => {
    
    const headers =  {
        headers : {
        'Authorization': `Bearer ${token}`   
        }
    }

    let statusResponse : ResponseErrores = {
        NoError:false,
        AuthError:false,
        FetchError:false        
    }

    await axios.patch(url+'/tasks/'+id,{status:status},headers)
    .then(response => statusResponse.NoError=true)
    .catch(error => {        
                         

        if(error.response.data.statusCode == 401){
            statusResponse.AuthError=true            
        }else{
            statusResponse.FetchError=true
        }
    })

    return statusResponse
}

export const deleteTask = async (token:string,id:string) : Promise<ResponseErrores> => {

    const headers =  {
        headers : {
        'Authorization': `Bearer ${token}`   
        }
    }

    let status : ResponseErrores = {
        NoError:false,
        AuthError:false,
        FetchError:false        
    }

    await axios.delete(url+'/tasks/'+id,headers)
    .then(response => status.NoError=true)
    .catch(error => {        
                         

        if(error.response.data.statusCode == 401){
            status.AuthError=true            
        }else{
            status.FetchError=true
        }
    })

    return status
}

export const addTask = async (task:Tasks,token:string) : Promise<ResponseErrores> => {
    
    const headers =  {
        headers : {
        'Authorization': `Bearer ${token}`   
        }
    }


    let status : ResponseErrores = {
        NoError:false,
        AuthError:false,
        FetchError:false        
    }

    await axios.post(url+'/tasks',task,headers)
    .then(response => status.NoError=true)
    .catch(error =>  {        
                        
        if(error.response.data.statusCode == 401){
            status.AuthError=true            
        }else{
            status.FetchError=true
        }

    })

    return status
}