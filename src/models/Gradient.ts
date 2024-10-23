import {unionize, UnionOf} from "unionize";

export const GradientTypes = unionize({
  RainbowDiagonal: {},
  RainbowHorizontal: {},
  RainbowVertical: {},
})

export type GradientType = UnionOf<typeof GradientTypes>

export const Gradient = {
  fromType: (type: GradientType, ctx: CanvasRenderingContext2D, height: number, width: number): void => {
    return GradientTypes.match(type, {
      RainbowDiagonal: () => Gradient.diagonalRainbow(ctx, height, width),
      RainbowHorizontal: () => Gradient.horizontalRainbow(ctx, height, width),
      RainbowVertical: () => Gradient.verticalRainbow(ctx, height, width),
    })
  },
  rainbow: (gradient: CanvasGradient): void => {
    gradient.addColorStop(0.00, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green')
    gradient.addColorStop(4 / 6, 'aqua');
    gradient.addColorStop(5 / 6, 'blue');
    gradient.addColorStop(1.00, 'purple');
  },
  diagonalRainbow: (ctx: CanvasRenderingContext2D, height: number, width: number): void => {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      width,
      height
    )
    Gradient.rainbow(gradient)
    ctx.fillStyle = gradient
  },
  horizontalRainbow: (ctx: CanvasRenderingContext2D, height: number, width: number): void => {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      width,
      0
    )
    Gradient.rainbow(gradient)
    ctx.fillStyle = gradient
  },
  verticalRainbow: (ctx: CanvasRenderingContext2D, height: number, width: number): void => {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      0,
      height
    )
    Gradient.rainbow(gradient)
    ctx.fillStyle = gradient
  }
}