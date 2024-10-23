import React from 'react'
import {
  Box, Button,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  Slider,
  Typography
} from "@mui/material"
import {VisOptionsComponent} from "../components/visualizations/VisOptionsComponent";
import _ from "lodash";
import {scale, useStateRef} from "../utils/util";
import {VisAnalyserComponent} from "../components/visualizations/VisAnalyserComponent";
import {Gradient, GradientType, GradientTypes} from "../models/Gradient";
import {SpectrumAnalyser, SpectrumAnalyserType, SpectrumAnalyserTypes} from "../models/SpectrumAnalysers";

type SimpleVisPageProps = {}

export const SimpleVisPage: React.FC<SimpleVisPageProps> = () => {

  const [barWidth, setBarWidth, barWidthRef] = useStateRef(3)
  const [gapWidth, setGapWidth, gapWidthRef] = useStateRef(1)
  const [position, setPosition, positionRef] = useStateRef<SpectrumAnalyserType>(SpectrumAnalyserTypes.Bottom())
  const [gradient, setGradient, gradientRef] = useStateRef<GradientType>(GradientTypes.RainbowVertical())

  return (
    <Box sx={{
      height: '100%'
    }}>
      <VisOptionsComponent
        options={
          <Box>
            <List>
              <ListItem sx={{display: "flex", flexDirection: 'column', alignItems: 'flex-start'}}>
                <Typography>Bar Width</Typography>
                <Slider
                  valueLabelDisplay='auto'
                  value={barWidth}
                  min={1}
                  max={10}
                  onChange={(e, v) => {
                    setBarWidth(p => typeof v === 'number' ? v : p)
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem sx={{display: "flex", flexDirection: 'column', alignItems: 'flex-start'}}>
                <Typography>Gap Width</Typography>
                <Slider
                  valueLabelDisplay='auto'
                  value={gapWidth}
                  min={1}
                  max={10}
                  onChange={(e, v) => {
                    setGapWidth(p => typeof v === 'number' ? v : p)
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem sx={{display: "flex", flexDirection: 'column', alignItems: 'flex-start'}}>
                <Typography>Position</Typography>
                <Box sx={{
                  alignSelf: 'center',
                }}>
                  <ButtonGroup variant="outlined">
                    <Button variant={SpectrumAnalyserTypes.is.Top(position) ? 'contained': 'outlined'} onClick={() => setPosition(SpectrumAnalyserTypes.Top())}>Top</Button>
                    <Button variant={SpectrumAnalyserTypes.is.Center(position) ? 'contained': 'outlined'} onClick={() => setPosition(SpectrumAnalyserTypes.Center())}>Center</Button>
                    <Button variant={SpectrumAnalyserTypes.is.Bottom(position) ? 'contained': 'outlined'} onClick={() => setPosition(SpectrumAnalyserTypes.Bottom())}>Bottom</Button>
                  </ButtonGroup>
                </Box>
              </ListItem>
              <Divider />
              <ListItem sx={{display: "flex", flexDirection: 'column', alignItems: 'flex-start'}}>
                <Typography>Gradient</Typography>
                <Box sx={{
                  alignSelf: 'center',
                }}>
                  <ButtonGroup variant="outlined">
                    <Button variant={GradientTypes.is.RainbowVertical(gradient) ? 'contained': 'outlined'} onClick={() => setGradient(GradientTypes.RainbowVertical)}>Vert</Button>
                    <Button variant={GradientTypes.is.RainbowDiagonal(gradient) ? 'contained': 'outlined'} onClick={() => setGradient(GradientTypes.RainbowDiagonal)}>Diag</Button>
                    <Button variant={GradientTypes.is.RainbowHorizontal(gradient) ? 'contained': 'outlined'} onClick={() => setGradient(GradientTypes.RainbowHorizontal)}>Horiz</Button>
                  </ButtonGroup>
                </Box>
              </ListItem>
              <Divider />
            </List>
          </Box>
        }
      >
        <VisAnalyserComponent
          onAnimate={(ctx, analyser, height, width) => {
            const barWidth = barWidthRef.current
            const gapWidth = gapWidthRef.current
            const bars = _.floor(width / barWidth)
            const songData = new Uint8Array(bars);
            analyser.getByteFrequencyData(songData);
            let start = 0;
            Gradient.fromType(gradientRef.current, ctx, height, width)
            ctx.clearRect(0, 0, width, height);
            const getY = SpectrumAnalyser.fromType(positionRef.current, ctx, height)
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