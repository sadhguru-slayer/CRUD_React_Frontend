
import {React, useEffect, useMemo, useState} from 'react'
import AxiosInstance from './Axios'
import { MaterialReactTable } from 'material-react-table';
import Dayjs from 'dayjs';
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {Link} from 'react-router-dom'

const Home = () => {

  const [myData, setMyData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const getData = () => {
    AxiosInstance.get('project/')
      .then((res) => {
        setMyData(res.data);
        setLoading(false);
      })
      
  };

  useEffect(() => {
    getData();
  }, []);

  
  const columns = useMemo(
      () => [
        {
          accessorKey: 'name', //access nested data with dot notation
          header: 'Name',
          size: 150,
        },
        {
          accessorKey: 'status',
          header: 'Status',
          size: 150,
        },
        {
          accessorKey: 'comments', //normal accessorKey
          header: 'Comments',
          size: 200,
        },
        {
          accessorKey: 'projectmanager', //normal accessorKey
          header: 'Project Manager',
          size: 200,
        },
        {
          accessorFn: (data) => Dayjs(data.start_date).format('DD-MM-YYYY'),
          header: 'Start date',
          size: 150,
        },
        {
          accessorFn: (data) => Dayjs(data.end_date).format('DD-MM-YYYY'),
          header: 'End date',
          size: 150,
        },
      ],
      [],
    );

  return (
    <div>
        { loading ? <p>Loading data...</p> :
        <MaterialReactTable 
            columns={columns} 
            data={myData} 
            enableRowActions
            renderRowActions={({row}) => (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>

                  <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
                      <DeleteIcon />
                  </IconButton>
            </Box>
      )}    
            />
        }
        
    </div>
  )
}

export default Home