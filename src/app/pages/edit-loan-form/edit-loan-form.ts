import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Loan } from '../../models/loan';
import { HttpClient } from '@angular/common/http';
import { ModelService } from '../../services/model-service';
import { TypeService } from '../../services/type-service';
import { EquipmentService } from '../../services/equipment-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, filter, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoanService } from '../../services/loan-service';
import { Equipment } from '../../models/equipment';
import { UserService } from '../../services/user-service';
import { Model } from '../../models/model';
import { Type } from '../../models/type';
import { NotificationService } from '../../services/notification';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'edit-loan-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './edit-loan-form.html',
  styleUrl: './edit-loan-form.css',
})
export class EditLoanForm {
  fb = inject(FormBuilder);

  route = inject(ActivatedRoute)
  router = inject(Router)
  httpClient = inject(HttpClient)
  notification = inject(NotificationService)
  
  typeService = inject(TypeService)
  modelService = inject(ModelService)
  authService = inject(AuthService)
  equipmentService = inject(EquipmentService)
  loanService = inject(LoanService)

  readonly equipmentTypes = this.typeService.allTypes
  readonly modelsOfType = this.modelService.allOfType
  readonly availableOfSelectedModel = this.equipmentService.availableEquipmentsOfModel
  readonly nbAvailable = this.equipmentService.nbAvailableOfModel
  
  editedLoan = signal<Loan | null>(null)

  form = this.fb.group({
    type: this.fb.control<Type | null>(null),
    model: this.fb.control<Model | null>(null),
    startDate: this.fb.control<Date | null>(null, Validators.required),
    endDate: this.fb.control<Date | null>(null, Validators.required),
    amount: this.fb.control<number>(1)
  });

  nbWanted = signal<number>(1)

  isEnoughAvailable = true


  ngOnInit() {
    this.typeService.getAll().subscribe()

    this.onLoanDetailsChange()

    this.route.params.subscribe(  // route.params récupère les paramètres entrés avec la route
      parameter => {
        const id = +parameter['id'] // le + permet de transformer une chaine en nombre

        if (Number.isNaN(id)) {
          
        } else {
          this.httpClient
              .get<Loan>(environment.serverUrl + '/loan/' + id)
              .subscribe(loan => this.editedLoan.set(loan))
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
      .subscribe(([modelId, start, end]) => {
        if (!!modelId && !!start && !!end) {

          this.equipmentService
            .getAllOfModelAvailableOnPeriod(new Date(start), new Date(end), Number(modelId))
            .subscribe()

        }
      })
  }

  onAmountChange(event: Event): void {
    const select = event.target as HTMLSelectElement
    this.nbWanted.set(Number(select.value))

    // Vérification si assez de stock disponible
    this.isEnoughAvailable = this.nbAvailable() >= this.nbWanted()
    if (!this.isEnoughAvailable) {
      select.classList.add("error")
    } else {
      select.classList.remove("error")
    }
  }

  onValidation(): void {
    if (this.form.valid) {

      const user = this.authService.connectedUser()
      const startDate = this.form.controls.startDate.value
      const endDate = this.form.controls.endDate.value
      
      if (!user || !startDate || !endDate) {
        this.notification.open('Formulaire incomplet', 'error')
      } else {

        // Sélection des équipements à emprunter
        const equipmentsToBorrow = this.availableOfSelectedModel().slice(0, this.nbWanted())

        var newLoans = []

        for (var equipment of equipmentsToBorrow) {
          const newLoan = {
            id: null,
            user: user,
            equipment: equipment,
            startDate: startDate,
            endDate: endDate,
            returnDate: null
          }
          newLoans.push(newLoan)
          this.loanService.newLoans.set(newLoans)
        }

        // Redirection vers la page de validation
        this.router.navigate(['validation'], {
          relativeTo: this.route
        })
      }
    }
  }
}
