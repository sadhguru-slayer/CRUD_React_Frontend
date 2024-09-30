// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'
import MyTextFields from './forms/MyTextFields'
import MyMultiLineFields from './forms/MyMultiLineFields'
import MyDatePickerFields from './forms/MyDatePickerFields'
import MySelectFields from './forms/MySelectFields'
import { useForm } from 'react-hook-form'
import Dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import AxiosInstance from './Axios'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const Create = () => {
  const width="30%";
  const [projectmanager, setProjectmanager] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const getData = () => {
    AxiosInstance.get('projectmanager/')
      .then((res) => {
        setProjectmanager(res.data);
        console.log(res.data)
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
    projectmanager:'',
  }

  const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    status: yup.string().required('Status is required'),
    start_date: yup.date().required('Start date is required'),
    end_date: yup.date().required('End dateis required').min(yup.ref('start_date'),"The end date must not precede the start date."),
    comments: yup.string('Optional'),
    projectmanager: yup.string().required('Manager is required'),
  })
  .required()

  const {handleSubmit,control} = useForm({defaultValues:defaultValues,resolver:yupResolver(schema)});
  // const {label,placeholder,control,name} = props
  const submission = (data) =>{
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD");
    AxiosInstance.post(
      `project/`,{
        name:data.name,
        status:data.status,
        comments:data.comments,
        start_date:StartDate,
        end_date:EndDate,
        projectmanager:data.projectmanager,
      }
    ).then(()=>{
      Navigate(`/`)
    })
  }
  return (
    <div>
    { loading ?<p>Please wait.....</p>:
    <form onSubmit={handleSubmit(submission)}>
    <Box sx={{display:'flex',width:'100%',backgroundColor:"#37699a",marginBottom:"2rem",padding:"1rem",borderRadius:'1rem',boxShadow:'1px 1px 5px',backdropFilter:'blur(3px)'}}>
    <Typography sx={
      {
        color:'white',
      }
    }>
Create
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
    width={width}
    />
    <MyDatePickerFields
    label="Start date"
    name="start_date"
    control={control}
    width={width}
    />
    <MyDatePickerFields
    label="End date"
    name="end_date"
    control={control}
    width={width}
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
    width={width}
    />
    <MySelectFields
    label="Project Status"
    name="status"
    control={control}
    options = {hardcoded_options}
    width={width}
    />
    <MySelectFields
    label="Project Manager"
    name="projectmanager"
    control={control}
    options = {projectmanager}
    width={width}
    />
    </Box>
    </Box>
    <Box sx={
      {
        width:"100%",
        justifyContent:'center'
      }
    }>
    <Button variant='contained' type='submit' sx={{
      width:"30%"
    }}>
    Submit
    </Button>
    </Box>

    </form>
}
    </div>
  )
}

export default Create