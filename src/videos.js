import { Hls } from "hls.js";

export class Video {
  constructor(video) {
    this.elm = video.querySelector("video");
    this.init(video);
  }

  init(video) {
    if (!video.dataset.video || video.dataset.video.length === 0) return;

    // Check if HLS is supported
    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(video.dataset.video);
      this.hls.attachMedia(this.elm);
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        console.log(event, data);
        console.log("--->", video.dataset.video);
      });
    } else if (this.elm.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      this.elm.src = video.dataset.video;
    } else {
      console.warn("HLS is not supported in this browser");
    }
  }
}

document.querySelectorAll("[data-video]").forEach((video) => {
  new Video(video);
});
