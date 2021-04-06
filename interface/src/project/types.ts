export enum SliderMode_t {
  STOP = 0,
  UP = 1,
  DOWN = 2,
  HOME = -1,
}

export interface SliderState {
  range_min: number,
  range_max: number,
  position: number,
  speed: number,
  mode: SliderMode_t,
  bounce: boolean,
}