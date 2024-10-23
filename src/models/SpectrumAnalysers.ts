import {unionize, UnionOf} from "unionize";

export const SpectrumAnalyserTypes = unionize({
  Top: {},
  Center: {},
  Bottom: {}
})

export type SpectrumAnalyserType = UnionOf<typeof SpectrumAnalyserTypes>


export type GetY = (value: number) => {start: number, end: number}

export const SpectrumAnalyser = {
  fromType: (type: SpectrumAnalyserType, ctx: CanvasRenderingContext2D, height: number): GetY => {
    return SpectrumAnalyserTypes.match(type, {
      Top: () => SpectrumAnalyser.top(ctx, height),
      Center: () => SpectrumAnalyser.center(ctx, height),
      Bottom: () => SpectrumAnalyser.bottom(ctx, height),
    })
  },
  top: (ctx: CanvasRenderingContext2D, height: number): GetY => {
    return value => ({start: 0, end: value})
  },
  center: (ctx: CanvasRenderingContext2D, height: number): GetY => {
    return value => {
      const start = height - ((height - value) / 2)
      const end = -value
      return {start, end}
    }
  },
  bottom: (ctx: CanvasRenderingContext2D, height: number): GetY => {
    return value => ({start: height, end: -value})
  }
}