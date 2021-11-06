export interface postsModel {
    name: string;
    gender: string,
    id: number;
    birthday: Date,
    created_at:Date,
    update_at: Date
}

export interface fromData {
    formName: string,
    formGender: string,
    formBirth: string,
    formId?:string
}

export interface DialogData {
    id:string
  }

  export interface UpdateData {
    name:string,
    gender:string,
    birthday:string,
    id:string
  }