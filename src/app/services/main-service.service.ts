import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService extends BaseService {

  constructor() {
    super('');
  }

  async login(body:any){
    return await this.Post("login",body)
  }
  async register(body:any){
    return await this.Post("register",body)
  }
  async roles(){
    return await this.Get("roles")
  }
  async users(){
    return await this.Get("all-users")
  }
  async uploadFile(fileType:string,base64:string){
    const body ={
      fileType:fileType,
      fileLink:base64
    }
    return await this.Post("upload-file",body)
  }
}
