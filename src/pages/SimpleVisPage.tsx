import React from 'react'
import {Box} from "@mui/material"
import {VisOptionsComponent} from "../components/visualizations/VisOptionsComponent";
import _ from "lodash";
import {scale} from "../utils/util";
import {VisAnalyserComponent} from "../components/visualizations/VisAnalyserComponent";
import {Gradient, GradientTypes} from "../models/Gradient";
import {SpectrumAnalyser, SpectrumAnalyserTypes} from "../models/SpectrumAnalysers";
import {SimpleSpectrumOptions, SpectrumOptions} from "../components/visualizations/SimpleSpectrumOptions";

type SimpleVisPageProps = {}

const initOptions: SpectrumOptions = {
  barWidth: 3,
  gapWidth: 1,
  position: SpectrumAnalyserTypes.Bottom(),
  gradient: GradientTypes.RainbowVertical()
}

export const SimpleVisPage: React.FC<SimpleVisPageProps> = () => {

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
            const songData = new Uint8Array(bars);
            analyser.getByteFrequencyData(songData);
            let start = 0;
            Gradient.fromType(spectrumOptionsRef.current.gradient, ctx, height, width)
            ctx.clearRect(0, 0, width, height);
            const getY = SpectrumAnalyser.fromType(spectrumOptionsRef.current.position, ctx, height)
            for (let i = 0; i < songData.length; i++) {
              start = i * (barWidth + gapWidth);
              const value = scale(songData[i], [0, 256], [0, height])
              const y = getY(value)
              ctx.fillRect(start, y.start, barWidth, y.end);
            }
          }}
        />
      </VisOptionsComponent>
    </Box>
  )
}