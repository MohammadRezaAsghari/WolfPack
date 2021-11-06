import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgProgressRef, NgProgress } from 'ngx-progressbar';
import { WolvesService } from '../../services/wolves.service';

import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  removeWolveSubscription: Subscription;
  @Output() getWolvesEvent = new EventEmitter<string>();
  @Input() name = '';
  @Input() gender = '';
  @Input() birthday = '';
  @Input() id = null;
  progressRef: NgProgressRef;
  constructor(
    private wolvesService: WolvesService,
    private progress: NgProgress,
    public dialog: MatDialog
  ) {
   }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('postProgress');
  }

  callGetAllWolves() {
    this.getWolvesEvent.next('');
  }

  getID(evt:PointerEvent) {
    return evt['path'][3].attributes[5].value;
  }

  onRemovePost(evt:PointerEvent) {
    let id:string = this.getID(evt);
    this.removeWolfById(id);
  }

  onEditPost(e:PointerEvent) {
    const id = this.getID(e)
    this.dialog.open(EditDialogComponent, {
      height: '410px',
      width: '500px',
      data: {
        id
      }
    });
  }

  removeWolfById(id:string) {
    this.progressRef.start();
    this.removeWolveSubscription = 
    this.wolvesService.removeWolf(id).subscribe(data => {
      this.callGetAllWolves();
      this.progressRef.complete();
    })
  }

  ngOnDestroy():void {
    if (this.removeWolveSubscription) {
      this.removeWolveSubscription.unsubscribe();
    }
  }

}
