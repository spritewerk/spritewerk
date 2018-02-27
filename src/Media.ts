import Assets from "./Assets";

export default class Media {
  private volume:number = 1;

  public static playAudio (name:string, loop:boolean = false, time:number = 0):void {
    const audio = Assets.getAudio(name);
    audio.loop = loop;
    audio.currentTime = time;
    audio.play();
  }

  public static setVolume (volume:number, ...names:string[]):void {
    for (const name of names) {
      Assets.getAudio(name).volume = volume;
    }
  }

  public static stopAudio (name:string):void {
    Assets.getAudio(name).pause();
  }
}
