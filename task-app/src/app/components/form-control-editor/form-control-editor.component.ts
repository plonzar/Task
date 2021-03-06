import { Conditions } from './../../enums/conditions.enum';
import { Types } from './../../enums/types.enum';
import { FormBuilderService } from './../../service/form-builder.service';
import { FormControlModel } from './../../model/form-control.model';
import { Component, OnInit, Input } from '@angular/core';
import { Type } from '../../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-form-control-editor',
  templateUrl: './form-control-editor.component.html',
  styleUrls: ['./form-control-editor.component.css']
})
export class FormControlEditorComponent implements OnInit {

  @Input() formControlInstance: FormControlModel;
  constructor(private service: FormBuilderService) { }

  ngOnInit() {
    if (this.formControlInstance.parent != null) {
      switch (this.formControlInstance.parent.type) {
      case Types.number:
      case Types.text:
        if (this.formControlInstance.displayCondition.condition === '') {
          this.formControlInstance.displayCondition.condition = Conditions.Equals;
        }
        break;
      case Types.radio:
        this.formControlInstance.displayCondition.condition = Conditions.Equals;
        this.formControlInstance.displayCondition.value = 'yes';
        break;
    }
    }
  }

  addSubItem() {
    this.service.addSubForm(this.formControlInstance);
  }

  delete() {
    this.service.removeForm(this.formControlInstance);
  }

  change() {
    this.service.updateForm(this.formControlInstance);
  }
}
