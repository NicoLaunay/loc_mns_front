import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Loan } from '../../models/loan';
import { HttpClient } from '@angular/common/http';
import { ModelService } from '../../services/model-service';
import { TypeService } from '../../services/type-service';
import { EquipmentService } from '../../services/equipment-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, filter, Observable } from 'rxjs';

@Component({
  selector: 'edit-loan-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './edit-loan-form.html',
  styleUrl: './edit-loan-form.css',
})
export class EditLoanForm {
  fb = inject(FormBuilder);

  route = inject(ActivatedRoute)
  httpClient = inject(HttpClient)

  typeService = inject(TypeService)
  modelService = inject(ModelService)
  equipmentService = inject(EquipmentService)

  readonly equipmentTypes = this.typeService.allTypes
  readonly modelsOfType = this.modelService.allOfType
  readonly availableOfSelectedModel = this.equipmentService.availableEquipmentsOfModel
  readonly nbAvailable = this.equipmentService.nbAvailableOfModel
  
  loan = signal<Loan | null>(null)

  form = this.fb.group({
    type: [null],
    model: [null],
    startDate: [null],
    endDate: [null],
  });


  ngOnInit() {
    this.typeService.getAll().subscribe()

    this.onLoanDetailsChange()

    this.route.params.subscribe(  // route.params récupère les paramètres entrés avec la route
      parameter => {
        const id = +parameter['id'] // le + permet de transformer une chaine en nombre

        if (Number.isNaN(id)) {
          
        } else {
          this.httpClient
              .get<Loan>('http://localhost:8080/loan/' + id)
              .subscribe(loan => this.loan.set(loan))
        }
      }
    )
  }

  onTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.modelService.getAllOfType(Number(select.value)).subscribe();
  }

  onLoanDetailsChange(): void {
    const { model, startDate, endDate } = this.form.controls

    combineLatest([model.valueChanges, startDate.valueChanges, endDate.valueChanges])
      // .pipe(
      //   filter(([m, s, e]) => !!m && !!s && !!e)  // tous remplis
      // )
      // LE FILTER NE CONVAINC PAS L'IDE --> IF
      .subscribe(([modelId, start, end]) => {
        if (!!modelId && !!start && !!end) {

          this.equipmentService
            .getAllOfModelAvailableOnPeriod(new Date(start), new Date(end), Number(modelId))
            .subscribe()


        }
      })
  }
}
