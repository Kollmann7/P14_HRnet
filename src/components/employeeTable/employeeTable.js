import * as React from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import axios from 'axios'
import { useState, useEffect } from 'react';
import './employeeTable.css'


function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
      />
    </Box>
  );
}
const columns = [{ field:'id'}, { field:'firstName'}, { field:'lastName'}, { field:'startDate'},
  { field:'department'}, { field:'birth'}, { field:'street'}, { field:'city'}, { field:'state'}, { field:'zipCode'}];

export default function QuickFilteringCustomizedGrid() {

  const [data, setData] = useState('')
  useEffect(() => {
    axios.get('http://localhost:4000/employees').then(res =>  {
      setData(res.data)
    })
  }, 
  [])

  return (
    <>
    {data &&
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <div className='employee-table'>
      <Box sx={{ height: 400, width: 1 }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterLogicOperator: GridLinkOperator.Or,
              },
            },
          }}
          components={{ Toolbar: QuickSearchToolbar }}
        />
      </Box>
      </div>
      <a href="/">Home</a>
    </div>
    }
    </>
  );
}