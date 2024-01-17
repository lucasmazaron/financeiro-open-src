import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { OrigemReceita } from "../../controle-mensal.component";

@Component({
  selector: "app-form-receitas",
  templateUrl: "./form-receitas.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class FormReceitasComponent {
  @Input() form: FormGroup;

  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() salvar: EventEmitter<any> = new EventEmitter();

  origemReceita = OrigemReceita;

  salvarForm() {
    this.salvar.emit(this.form.getRawValue());
  }

  cancelarForm() {
    this.cancelar.emit();
  }
}
