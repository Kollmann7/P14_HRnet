import './employeeForm.css'
import * as React from 'react';
import dayjs from 'dayjs';
import { useForm} from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import axios from 'axios'

export default function EmployeeForm () {
  const {register, handleSubmit} = useForm()
  const [value, setValue] = React.useState(dayjs())

  const onSubmit = (employee) => {
    axios.post('http://localhost:4000/employees',
    {...employee})
    .then(res => {
      console.log("employee added", res)
    })
  }
  return( 
    <>
      <a href="/employee">View Current Employees</a>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='employee-info'>
          <label>First Name</label>
          <input {...register('firstName')} />

          <label>Last Name</label>
          <input {...register('lastName')} />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className='date-wrapper'>
            <label>Start Date</label>
            <DesktopDatePicker
            value={value}
            minDate={dayjs('2000-01-01')}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            renderInput={(params) => <TextField {...params}  {...register('birth')}/>}
            />
          </div>
          <div className='date-wrapper'>
            <label>Date of Birth</label>
            <DesktopDatePicker
              value={value}
              minDate={dayjs('2000-01-01')}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              renderInput={(params) => <TextField {...params}  {...register('startDate')}/>}
            />
          </div>
        </LocalizationProvider>
        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input {...register('street')}/>

          <label htmlFor="city">City</label>
          <input  {...register('city')} />

          <label htmlFor="state">State</label>
          <select {...register('state')}></select>

          <label htmlFor="zip-code">Zip Code</label>
          <input {...register('zipCode')}/>
        </fieldset>

        <label className='department' htmlFor="department">Department</label>
          <select {...register('department')}>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>

        <button className='submit-button' >Save</button>
      </form>

    </>
  )
}