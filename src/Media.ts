import Assets from "./Assets";

export default class Media {
  public static playAudio (name:string, loop:boolean = false, time:number = 0):void {
    const audio = Assets.getAudio(name);
    audio.loop = loop;
    audio.currentTime = time;
    audio.play();
  }

  public static setGlobalVolume (volume:number):void {
    const allAudio = Assets.getAllAudio();

    for (const key in allAudio) {
      allAudio[key].volume = volume;
    }
  }

  public static setVolume (name:string, volume:number):void {
    Assets.getAudio(name).volume = Math.min(Math.max(volume, 0), 1);
  }

  public static stopAllAudio ():void {
    const allAudio = Assets.getAllAudio();

    for (const key in allAudio) {
      allAudio[key].pause();
    }
  }

  public static stopAudio (name:string):void {
    Assets.getAudio(name).pause();
  }
}
