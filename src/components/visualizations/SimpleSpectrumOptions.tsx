import React, {MutableRefObject} from 'react'
import {Box, Button, ButtonGroup, Divider, List, ListItem, Slider, Typography} from "@mui/material"
import {SpectrumAnalyserType, SpectrumAnalyserTypes} from "../../models/SpectrumAnalysers";
import {GradientType, GradientTypes} from "../../models/Gradient";
import {useStateRef} from "../../utils/util";


export type SpectrumOptions = {
  barWidth: number
  gapWidth: number
  position: SpectrumAnalyserType
  gradient: GradientType
}

export type SimpleSpectrumOptionsProps = {
  initOptions: SpectrumOptions
  onOptionsUpdate: (opts: SpectrumOptions) => void
}

export const SimpleSpectrumOptions: React.FC<SimpleSpectrumOptionsProps> = ({
  initOptions,
  onOptionsUpdate
}) => {

  const [barWidth, setBarWidth] = React.useState(initOptions.barWidth)
  const [gapWidth, setGapWidth] = React.useState(initOptions.gapWidth)
  const [position, setPosition] = React.useState<SpectrumAnalyserType>(initOptions.position)
  const [gradient, setGradient] = React.useState<GradientType>(initOptions.gradient)

  React.useEffect(() => {
    onOptionsUpdate({
      barWidth, gapWidth, position, gradient
    })
  }, [barWidth, gapWidth, position, gradient])

  return (
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
  )
}