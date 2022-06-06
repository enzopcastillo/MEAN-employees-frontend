import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }
  

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(
      (result)=>{
        this.employeeService.employees = result;
      },
      (error)=>{
        alert('Error en la peticion.');
      }
    )
  }

  addEmployee(form: NgForm){
    if (form.value._id){
      this.employeeService.updateEmployee(form.value).subscribe(
        (result)=>{
          this.resetForm(form);
          this.getEmployees();
        },
        (error)=>{
          alert('Error en la peticion.');
        }
      )
    } else{
      this.employeeService.createEmployee(form.value).subscribe(
        (result)=>{
          this.getEmployees();
          this.resetForm(form);
        },
        (error)=>{
          alert('Error en la peticion.');
        }
      )
    }
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(_id: string, form: NgForm){
    this.employeeService.deleteEmployee(_id).subscribe(
      (result)=>{
        this.getEmployees();
        this.resetForm(form);
      },
      (error)=>{
        alert('Error en la peticion.');
      }
    )
  }

  resetForm(form: NgForm){
    form.reset();
    this.employeeService.selectedEmployee = new Employee();
  }
}
