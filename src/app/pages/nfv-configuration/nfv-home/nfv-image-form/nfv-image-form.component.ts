import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-nfv-image-form',
  templateUrl: './nfv-image-form.component.html',
  styleUrls: ['./nfv-image-form.component.scss']
})
export class NfvImageFormComponent implements OnInit {

  constructor(public windowRef: NbWindowRef) { }
  form = new FormGroup({});
  model = { email: '', ip: '' };
  fields: FormlyFieldConfig[] = [];

  fieldList = {
    "IMAGE": [{
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },
      validators: {
        validation: Validators.compose([Validators.required])
      }
    },
    {
      key: 'ip',
      type: 'input',
      templateOptions: {
        label: 'IP Address (pattern = /(\d{1,3}\.){3}\d{1,3}/)',
        pattern: /(\d{1,3}\.){3}\d{1,3}/,
        required: true,
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid IP Address`,
        },
      },
    },
    {
      key: 'whyNot',
      type: 'textarea',
      expressionProperties: {
        'templateOptions.placeholder': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'Too bad... It really is awesome! Wasn\'t that cool?';
          } else {
            return 'Type in here... I dare you';
          }
        },
        'templateOptions.disabled': 'formState.awesomeIsForced',
      },
      hideExpression: 'model.awesome',
      templateOptions: {
        label: 'Why Not?',
        placeholder: 'Type in here... I dare you',
      },
    },
    {
      key: 'candy',
      type: 'select',
      defaultValue: 'milky_way',
      templateOptions: {
        label: 'Favorite Candy (initialized via default value',
        options: [
          { label: 'Snickers', value: 'snickers' },
          { label: 'Baby Ruth', value: 'baby_ruth' },
          { label: 'Milky Way', value: 'milky_way' },
        ],
      },
    }],
    "NS": [{
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: ' Email address',
        placeholder: 'Enter email',
        required: true,
      }
    },
    {
      key: 'comment',
      type: 'textarea',
      templateOptions: {
        label: 'Comment (maxLength = 100)',
        required: true,
        maxLength: 100,
        rows: 5,
      },
    },
    {
      key: 'awesome',
      type: 'checkbox',
      templateOptions: { label: '' },
      expressionProperties: {
        'templateOptions.disabled': 'formState.awesomeIsForced',
        'templateOptions.label': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'Too bad, formly is really awesome...';
          } else {
            return 'Is formly totally awesome? (uncheck this and see what happens)';
          }
        },
      },
    }]
  };

  submit(model) {
    console.log(model);
    this.close();
  }
  ngOnInit() {
    this.fields = this.fieldList[this.windowRef.config.title];
  }
  close() {
    this.windowRef.close();
  }

}
