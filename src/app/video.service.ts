import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Video } from './video';
@Injectable()
export class VideoService {

  private _getUrl = "api/videos";
  private _postUrl = "api/video";
  private _putUrl = "/api/video/";
  private _deleteUrl = "/api/video/";
  constructor(private _http: HttpClient) { }
  getVideos() {
    
    return this._http.get(this._getUrl)
    .map((response) => response);
  }
  addVideo(vid:Video){
    const headers = new HttpHeaders()
            .set('Content-Type','application/json');
    return this._http.post(this._postUrl,vid)
    .map((response) => response);
  }
  updateVideo(video: Video) {
    
    return this._http.put(this._putUrl + video._id, video)
      .map((response) => response);
  }

  deleteVideo(video: Video) {
    return this._http.delete(this._deleteUrl + video._id)
      .map((response) => response);
  }
}
