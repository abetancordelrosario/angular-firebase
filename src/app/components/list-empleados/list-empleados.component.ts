import { Component, OnInit } from '@angular/core';
import { Firestore,collectionData,collection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];

  constructor(private __empleadoService: EmpleadoService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados() {
    this.__empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element:any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarEmpleado(id: string) {
    this.__empleadoService.eliminarEmpleado(id).then(() => {
      this.toastr.success('Empleado eliminado exitosamente', 'Empleado Eliminado')
      console.log("Empleado eliminado con éxito");
    }).catch(error =>{
      console.log(error)
    });
  }

}
