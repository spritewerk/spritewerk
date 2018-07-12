import Assets from "./Assets";

export default class Media {
  private assets:Assets;

  constructor (assets:Assets) {
    this.assets = assets;
  }

  public playAudio (name:string, loop:boolean = false, time:number = 0):void {
    const audio = this.assets.audio[name];
    audio.loop = loop;
    audio.currentTime = time;
    audio.play();
  }

  public setGlobalVolume (volume:number):void {
    const allAudio = this.assets.audio;

    for (const key in allAudio) {
      allAudio[key].volume = volume;
    }
  }

  public setVolume (name:string, volume:number):void {
    this.assets.audio[name].volume = Math.min(Math.max(volume, 0), 1);
  }

  public stopAllAudio ():void {
    const allAudio = this.assets.audio;

    for (const key in allAudio) {
      allAudio[key].pause();
    }
  }

  public stopAudio (name:string):void {
    this.assets.audio[name].pause();
  }
}
