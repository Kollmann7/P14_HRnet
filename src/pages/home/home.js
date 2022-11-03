import Header from '../../components/header/header'
import EmployeeForm from '../../components/employeeForm/employeeForm'
import './home.css'

export default function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <EmployeeForm />
      </div>
    </>
  )
}
