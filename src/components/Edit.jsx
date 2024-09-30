import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import MyTextFields from './forms/MyTextFields'
import MyMultiLineFields from './forms/MyMultiLineFields'
import MyDatePickerFields from './forms/MyDatePickerFields'
import MySelectFields from './forms/MySelectFields'
import { useForm } from 'react-hook-form'
import Dayjs from 'dayjs'
import { useNavigate,useParams } from 'react-router-dom'
import AxiosInstance from './Axios'




const Edit = () => {
    const myParams = useParams();
    const myid = myParams.id;

//   const [loading, setLoading] = useState(true);
const [projectmanager, setProjectmanager] = useState(null);
const [loading,setLoading] = useState(true)


  const getData = () => {
    AxiosInstance.get(`projectmanager/`).then((res) =>{
      setProjectmanager(res.data)
      console.log(res.data)

    })
    AxiosInstance.get(`project/${myid}`)
      .then((res) => {
        console.log(res.data)
        setValue('name',res.data.name)
        setValue('status',res.data.status)
        setValue('start_date',Dayjs(res.data.start_date))
        setValue('end_date',Dayjs(res.data.end_date))
        setValue('comments',res.data.comments)
        setValue('projectmanager',res.data.projectmanager)
        setLoading(false);
      })
      
  };

  useEffect(() => {
    getData();
  }, []);

  
  const Navigate = useNavigate();
  const hardcoded_options = [
    {id:'', name:'None'}, 
    {id:'Open', name:'Open'}, 
    {id:'In progress', name:'In progress'}, 
    {id:'Completed', name:'Completed'}, 
  ]
  const defaultValues = {
    name:'',
    comments:'',
    start_date:'',
    end_date:'',
    status:'',
  }
  const {handleSubmit,reset,setValue,control} = useForm({defaultValues:defaultValues});
  // const {label,placeholder,control,name} = props
  const submission = (data) =>{
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD");
    AxiosInstance.put(
      `project/${myid}/`,{
        name:data.name,
        status:data.status,
        comments:data.comments,
        projectmanager:data.projectmanager,
        start_date:StartDate,
        end_date:EndDate,
      }
    ).then((res)=>{
      Navigate(`/`)
    })
  }
  return (
    <div>
    { loading ? <p>Loading......</p>:
    <form onSubmit={handleSubmit(submission)}>
    <Box sx={{display:'flex',width:'100%',backgroundColor:"#37699a",marginBottom:"2rem",padding:"1rem",borderRadius:'1rem',boxShadow:'1px 1px 5px',backdropFilter:'blur(3px)'}}>
    <Typography sx={
      {
        color:'white',
      }
    }>
Edit
    </Typography>
    </Box>
    <Box sx={{display:'flex',width:'100%',backgroundColor:"#fff",marginBottom:"2rem",padding:"1rem",borderRadius:'1rem',boxShadow:'1px 0.5px 4px gray',backdropFilter:'blur(3px)',flexDirection:'column',}} >
    <Box sx={{
      display:'flex',
      justifyContent:'space-around',
      padding:4,
      alignItems:'center',
    }}>
    <MyTextFields
    label="Name"
    name="name"
    control={control}
    placeholder="Provide a project name"
    width={'30%'}
    />
    <MyDatePickerFields
    label="Start date"
    name="start_date"
    control={control}
    width={'30%'}
    />
    <MyDatePickerFields
    label="End date"
    name="end_date"
    control={control}
    width={'30%'}
    />

    </Box>


    <Box sx={{
      display:'flex',
      justifyContent:'space-around',
      alignItems:'center',
      gap:1,
      padding:4,
    }}>
    <MyMultiLineFields
    label="Comments"
    name="comments"
    control={control}
    placeholder="Provide a Comments"
    width={'30%'}
    />
    <MySelectFields
    label="Status"
    name="status"
    control={control}
    options={hardcoded_options}
    width={'30%'}

    />
    <MySelectFields
    label="Project Manager"
    name="projectmanager"
    control={control}
    options = {projectmanager}
    width={'30%'}
    />
<Box sx={
  {
    width:"30%"
  }
}>
<Button variant='contained' type='submit' sx={{
  width:"100%"
}}>
Submit
</Button>
</Box>
    </Box>
    </Box>

    </form>
}
    </div>
  )
}

export default Edit