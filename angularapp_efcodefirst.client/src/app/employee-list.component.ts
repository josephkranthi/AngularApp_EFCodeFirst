import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Employee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h2>Employees</h2>

    <form (ngSubmit)="save()" #f="ngForm">
      <input name="name" [(ngModel)]="model.name" placeholder="Name" required />
      <input name="salary" type="number" [(ngModel)]="model.salary" placeholder="Salary" required />
      <button type="submit">{{ model.id ? 'Update' : 'Create' }}</button>
      <button type="button" (click)="reset()">Clear</button> 
    </form>

    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let e of employees">
          <td>{{ e.id }}</td>
          <td>{{ e.name }}</td>
          <td>{{ e.salary }}</td>
          <td>
            <button (click)="edit(e)">Edit</button>
            <button (click)="remove(e.id!)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p *ngIf="!employees || employees.length === 0">No employees found.</p>
  `,
  styles: [
    `table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { border: 1px solid #ddd; padding: 8px; }
    form { display: flex; gap: 8px; margin-bottom: 1rem; }`
  ]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  model: Employee = { name: '', salary: 0 };

  constructor(private service: EmployeeService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    console.debug('EmployeeListComponent: loading employees');
    this.service.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => { console.error('Error loading employees', err); },
    });
  }

  save() {
    if (this.model.id) {
      this.service.updateEmployee(this.model.id, this.model).subscribe({
        next: () => { this.reset(); this.load(); },
        error: (err) => console.error(err)
      });
    } else {
      this.service.createEmployee(this.model).subscribe({
        next: () => { this.reset(); this.load(); },
        error: (err) => console.error(err)
      });
    }
  }

  edit(e: Employee) {
    this.model = { ...e };
  }

  remove(id: number) {
    if (!confirm('Delete employee?')) return;
    this.service.deleteEmployee(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }

  reset() {
    this.model = { name: '', salary: 0 };
  }
}
