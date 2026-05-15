import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Type } from '../../models/type';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'new-model-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new-model-form.html',
  styleUrl: './new-model-form.css',
})
export class NewModelForm {
  protected equipmentTypes: Type[] = Array<Type>()

  components = [
    {
      id: 1,
      name: "composant 1",
      description: "description",
      type: {
        id: 1,
        name: "RAM",
        icon: ""
      },
      isComponent: true,
      // documentations: Array<Documentation>;
      components: [],
      // icon: String = ""
    }
  ]

  private formBuilder = inject(FormBuilder)

  form: FormGroup = this.formBuilder.group({
    name: [''],
    description: [''],
    type: [''],
    isComponent: [false],
    lineComponent: this.formBuilder.array([])
  });

  get lineComponent(): FormArray {
    return this.form.get('lineComponent') as FormArray;
  }

  newLine(): FormGroup {
    return this.formBuilder.group({ component: [''], amount: [1] });
  }

  addComponent(): void {
    this.lineComponent.push(this.newLine());
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
