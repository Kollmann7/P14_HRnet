import './employeeForm.css'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { useForm, Controller } from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import axios from 'axios'
import { states, departments } from '../../utils/constants'
import { FormControl, Select, MenuItem } from '@mui/material'
import  {Modal}  from 'modal-sk-01'

export default function EmployeeForm() {
  const { control, register, handleSubmit } = useForm()
  const [startDate, setStartDate] = React.useState(dayjs())
  const [birth, setBirth] = React.useState(dayjs())
  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = (employee) => {
    axios
      .post('http://localhost:4000/employees', { ...employee })
      .then((res) => {
        console.log('employee added', res)
      })
  }

  return (
    <>
      <Link className="link" to="/employee">
        View Current Employees
      </Link>
      <h2 className="title-employee">Create Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="employee-info">
          <label>First Name</label>
          <input {...register('firstName')} />

          <label>Last Name</label>
          <input {...register('lastName')} />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="date-wrapper">
            <label>Start Date</label>
            <DesktopDatePicker
              value={startDate}
              minDate={dayjs('2000-01-01')}
              onChange={(newValue) => {
                setStartDate(newValue)
              }}
              renderInput={(params) => (
                <TextField {...params} {...register('startDate')} />
              )}
            />
          </div>
          <div className="date-wrapper">
            <label>Date of Birth</label>
            <DesktopDatePicker
              value={birth}
              minDate={dayjs('1901-01-01')}
              onChange={(newValue) => {
                setBirth(newValue)
              }}
              renderInput={(params) => (
                <TextField {...params} {...register('birth')} />
              )}
            />
          </div>
        </LocalizationProvider>
        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input {...register('street')} />

          <label htmlFor="city">City</label>
          <input {...register('city')} />

          <div className="select-container">
            <label htmlFor="state">State</label>
            <FormControl>
              <Controller
                control={control}
                name="State"
                inputRef={register()}
                defaultValue={states[0].abbreviation}
                render={({ field: { onChange, value } }) => (
                  <Select
                    defaultValue={states[0].name}
                    value={value}
                    onChange={onChange}
                  >
                    {states.map((state) => (
                      <MenuItem key={state.name} value={state.abbreviation}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
          <label htmlFor="zip-code">Zip Code</label>
          <input {...register('zipCode')} />
        </fieldset>
        <div className="select-container">
          <label className="department" htmlFor="department">
            Department
          </label>
          <FormControl>
            <Controller
              control={control}
              name="department"
              inputRef={register()}
              defaultValue={departments[0].value}
              render={({ field: { onChange, value } }) => (
                <Select
                  defaultValue={departments[0].label}
                  value={value}
                  onChange={onChange}
                >
                  {departments.map((department) => (
                    <MenuItem key={department.label} value={department.value}>
                      {department.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
        <div className="button-container">
          <button onClick={() => setIsOpen(true)} className="submit-button">Save</button>
        </div>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} modalClassName='modal-container'>
          Employee Created!
        </Modal>
      </form>
    </>
  )
}
