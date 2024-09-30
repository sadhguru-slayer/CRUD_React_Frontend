/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate,useParams } from 'react-router-dom'
import AxiosInstance from './Axios'




const Delete = () => {
    const MyParam = useParams()
    const MyId = MyParam.id
  
    const [myData,setMydata] = useState()
    const [loading,setLoading] = useState(true)
  
    const GetData = () => {
      AxiosInstance.get(`project/${MyId}`).then((res) =>{
        setMydata(res.data)
        console.log(res.data)
        setLoading(false)
   
      })
  
    }
    
  
    useEffect(() => {
      GetData();
    },[] )
  
    const navigate = useNavigate()
  
  
    const submission = (data) => 
    { 
      AxiosInstance.delete( `project/${MyId}/`)
      .then((res) =>{
        navigate(`/`)
      })
      }
    
  return (
    <div>
     
    { loading ? <p>Loading data...</p> :
    <div>
    
    <Box sx={{display:'flex',width:'100%',backgroundColor:"#37699a",marginBottom:"2rem",padding:"1rem",borderRadius:'1rem',boxShadow:'1px 1px 5px',backdropFilter:'blur(3px)'}}>
       <Typography sx={{marginLeft:'20px', color:'#fff'}}>
            Delete project: {myData.name}
         </Typography>
    </Box>
    <Box sx={{display:'flex',width:'100%',backgroundColor:"#fff",marginBottom:"2rem",padding:"1rem",borderRadius:'1rem',boxShadow:'1px 0.5px 4px gray',backdropFilter:'blur(3px)',flexDirection:'column',}} >

    <Box sx={{
      display:'flex',
      justifyContent:'space-around',
      padding:4,
      alignItems:'center',
    }}>
    
    <Box sx={
        {
          width:"30%"
        }
      }>
      <Button variant='contained' type='submit' sx={{
        width:"100%",
        backgroundColor:'red'
      }}
      onClick={submission}>
      Delete this project
      </Button>
      </Box>
    </Box>


    
    </Box>

    </div>
    }
    </div>
  )
}

export default Delete