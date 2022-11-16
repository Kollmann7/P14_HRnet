import * as React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {columns} from '../../utils/constants'
import './employeeTable.css'
import { BASE_URL } from '../../api/api'

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
  )
}

export default function QuickFilteringCustomizedGrid() {
  const [data, setData] = useState('')

  useEffect(() => {
    axios.get(`${BASE_URL}/employees`).then((res) => {
      setData(res.data)
    })
  }, [])

  return (
    <>
      {data && (
        <div id="employee-div" className="container">
          <h1 className="title-current-employee">Current Employees</h1>
          <div className="employee-table">
            <Box sx={{ height: 500, width: 1 }}>
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
          <Link className="link" to="/">
            Home
          </Link>
        </div>
      )}
    </>
  )
}
