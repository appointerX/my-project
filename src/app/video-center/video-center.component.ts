import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.less'],
  providers:[VideoService]
})
export class VideoCenterComponent implements OnInit {
  selectedVideo : any;
  videos : any;
  private hideNewVideo:boolean = true;
  constructor(private _videoService:VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(res => this.videos = res);
  }
  
  onSelectedVideo(video:any){
    
    this.selectedVideo = video;
    this.hideNewVideo = true;
  }
  onSubmitform(vid: Video){
    this._videoService.addVideo(vid)
    .subscribe(newVideo => {
      this.videos.push(newVideo);
      this.selectedVideo = newVideo;
      this.hideNewVideo = true;
    });
  }
  onNewVideo(){
    this.hideNewVideo = false;
  }
  onUpdateVideoEvent(video: any) {
    this._videoService.updateVideo(video)
      .subscribe(resUpdatedVideo => this.videos = resUpdatedVideo);
    this.selectedVideo = null;
  };

  onDeleteVideoEvent(video: any) {
    let videoArray = this.videos;
    this._videoService.deleteVideo(video)
      .subscribe(resDeletedVideo => {
        for (let i = 0; i < videoArray.length; i++) {
          if (videoArray[i]._id === video._id) {
            videoArray.splice(i, 1);
          }
        }
      });
    this.selectedVideo = null;
  };
}
