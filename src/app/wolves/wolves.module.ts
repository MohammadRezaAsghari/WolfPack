import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { NgProgressModule } from 'ngx-progressbar';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent, PostComponent, EditDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgProgressModule,
    FormsModule
  ],
  exports: [HomeComponent]
})
export class WolvesModule {
  

 }
