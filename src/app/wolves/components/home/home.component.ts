import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgProgressRef, NgProgress } from 'ngx-progressbar';
import { WolvesService } from '../../services/wolves.service';
import { WolvesSharedService } from '../../services/wolves-shared.service';
import { UtilityService } from '../../services/utility.service'
import { postsModel, fromData } from '../../models/wolves.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  getWolvesSubscription: Subscription;
  postWolvesSubscription: Subscription;
  posts: postsModel[];
  formdata:any
  isOnAddNewPost: boolean;
  progressRef: NgProgressRef;
  constructor(
    private wolvesService: WolvesService,
    private wolvesSharedService: WolvesSharedService,
    private utility: UtilityService,
    private progress: NgProgress
  ) { }

  ngOnInit(): void {
    this.initializeVariables();
    this.progressRef.start();
    this.getAllWolves();

    this.wolvesSharedService.currentCompleteEditWolves.subscribe(wolves => {
      if(!this.utility.isEmptyObject(wolves)) {
        this.getAllWolves();
      }
    }); 
  }

  getAllWolves() {
    this.getWolvesSubscription = 
    this.wolvesService.getWolves().subscribe((data: postsModel[]) => {
      this.posts = data;
      this.progressRef.complete();
    });
  }

  onAddPostClicked() {
    this.isOnAddNewPost = !this.isOnAddNewPost;
  }

  onCancelAddingNewPost() {
    this.isOnAddNewPost = !this.isOnAddNewPost;
  }

  onClickSubmit(data: fromData) {
    const {formName, formGender, formBirth} = data;
    this.progressRef.start();
    this.postWolvesSubscription = 
    this.wolvesService.createNewWolf(formName, formGender, formBirth).subscribe(data => {
      this.posts.push(data);
      this.progressRef.complete();
    });
  }

  initializeVariables() {
    this.isOnAddNewPost = false;
    this.progressRef = this.progress.ref('homeProgress');
    this.formdata = new FormGroup({
      formName: new FormControl(''),
      formGender: new FormControl(''),
      formBirth: new FormControl('')
   });
  }

  ngOnDestroy() {
    this.getWolvesSubscription.unsubscribe();
    this.postWolvesSubscription.unsubscribe();
  }

}
