import React from 'react'
import {Box} from "@mui/material"
import {VisOptionsComponent} from "./VisOptionsComponent";
import {VisAnalyserComponent} from "./VisAnalyserComponent";
import {scale} from "../../utils/util";
import _ from 'lodash'
import {SimpleSpectrumOptions, SpectrumOptions} from "./SimpleSpectrumOptions";
import {Gradient, GradientTypes} from "../../models/Gradient";
import {SpectrumAnalyser, SpectrumAnalyserTypes} from "../../models/SpectrumAnalysers";

type VisStereoPageProps = {}

const initOptions: SpectrumOptions = {
  barWidth: 3,
  gapWidth: 1,
  position: SpectrumAnalyserTypes.Bottom(),
  gradient: GradientTypes.RainbowVertical()
}

export const VisStereoPage: React.FC<VisStereoPageProps> = () => {

  const spectrumOptionsRef = React.useRef<SpectrumOptions>(initOptions)

  return (
    <Box sx={{
      height: '100%'
    }}>
      <VisOptionsComponent
        options={
          <SimpleSpectrumOptions
            initOptions={initOptions}
            onOptionsUpdate={opts => spectrumOptionsRef.current = opts}
          />
        }
      >
        <VisAnalyserComponent
          onAnimate={(ctx, analyser, height, width) => {
            const barWidth = spectrumOptionsRef.current.barWidth
            const gapWidth = spectrumOptionsRef.current.gapWidth
            const bars = _.floor(width / barWidth)
            const leftData = new Uint8Array(bars);
            const rightData = new Uint8Array(bars);
            analyser.left.getByteFrequencyData(leftData);
            analyser.right.getByteFrequencyData(rightData);
            let start = 0;
            Gradient.fromType(spectrumOptionsRef.current.gradient, ctx, height, width)
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < leftData.length; i++) {
              start = i * (barWidth + gapWidth);
              const leftValue = scale(leftData[i], [0, 255], [0, height / 2])
              const leftY = {
                start: height / 2,
                end: -leftValue
              }
              const rightValue = scale(rightData[i], [0, 255], [0, height / 2])
              ctx.fillRect(start, leftY.start, barWidth, leftY.end)
              const rightY = {
                start: height / 2,
                end: rightValue
              }
              ctx.fillRect(start, rightY.start, barWidth, rightY.end)
            }
          }}
        />
      </VisOptionsComponent>
    </Box>
  )
}