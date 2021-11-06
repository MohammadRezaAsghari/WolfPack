import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData, UpdateData } from '../../models/wolves.model';
import { WolvesService } from '../../services/wolves.service';
import { WolvesSharedService } from '../../services/wolves-shared.service';
import { postsModel } from '../../models/wolves.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  formData: UpdateData
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private wolvesService: WolvesService,
    private wolvesShareService: WolvesSharedService){
    }

  ngOnInit(): void {
    this.initializeVariables();
  }

  onClickSubmit() {
    this.wolvesService.updateWolf(this.formData).subscribe((data:postsModel) => {
      this.wolvesShareService.completeEditingProcess(data);
    });
  }

  initializeVariables() {
    this.formData = {
      name: '',
      gender: '',
      birthday: '',
      id: this.data.id
    }
  }
}
