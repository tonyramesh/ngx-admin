
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

export class ConnectionPoint {

  constructor(
    public firstName: FormControl,
    public lastName: FormControl,
    public email: FormControl,
    public password: FormControl,
    public language: FormControl
  ) { }

}
