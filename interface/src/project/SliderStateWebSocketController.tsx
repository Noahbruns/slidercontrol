import React, { Component } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { Box, Switch, Grid, Button, FormControlLabel } from '@material-ui/core';
import MainSlider from './Slider'
import { WEB_SOCKET_ROOT } from '../api';
import { WebSocketControllerProps, WebSocketFormLoader, WebSocketFormProps, webSocketController } from '../components';
import { SectionContent, } from '../components';

import { SliderState } from './types';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import { SliderMode_t } from './types'

export const LIGHT_SETTINGS_WEBSOCKET_URL = WEB_SOCKET_ROOT + "SliderState";

type SliderStateWebSocketControllerProps = WebSocketControllerProps<SliderState>;

class SliderStateWebSocketController extends Component<SliderStateWebSocketControllerProps> {

  render() {
    return (
      <SectionContent title='Slider Controller' titleGutter>
        <WebSocketFormLoader
          {...this.props}
          render={props => (
            <SliderStateWebSocketControllerForm {...props} />
          )}
        />
      </SectionContent>
    )
  }

}

export default webSocketController(LIGHT_SETTINGS_WEBSOCKET_URL, 100, SliderStateWebSocketController);

type SliderStateWebSocketControllerFormProps = WebSocketFormProps<SliderState>;

function SliderStateWebSocketControllerForm(props: SliderStateWebSocketControllerFormProps) {
  const { data, saveData, setData } = props;

  const onSliderRange = (event: any, value: unknown)  => {
    setData({ ...data, range_min: (value as number[])[0], range_max: (value as number[])[1] }, saveData);
  }

  const onSliderSpeed = (event: any, value: unknown)  => {
    setData({ ...data, speed: value as number }, saveData);
  }

  const onHome = (event: any)  => {
    setData({ ...data, mode: SliderMode_t.HOME}, saveData);
  }

  const onStop = (event: any)  => {
    setData({ ...data, mode: SliderMode_t.STOP}, saveData);
  }

  const onUp = (event: any)  => {
    setData({ ...data, mode: SliderMode_t.UP}, saveData);
  }

  const onDown = (event: any)  => {
    setData({ ...data, mode: SliderMode_t.DOWN}, saveData);
  }

  const onBounce = (event: any)  => {
    setData({ ...data, bounce: event.target.checked}, saveData);
  }

  return (<>
      <Box mt={8} mx={4} mb={4}>
        <MainSlider
          value={data.position}
          valueLabelDisplay="on"
          min={0}
          max={2100}
          step={1}
          track={false}
          marks={[{
            value: 2100,
            label: '2100mm'
          },{
            value: 0,
            label: '0mm'
          }]}
        />
      </Box>

      <ValidatorForm onSubmit={saveData}>
        <Box mt={5} mx={4} flexWrap="nowrap" display="flex" alignItems="center">
            <Button variant="contained"
            color={data.mode === SliderMode_t.DOWN ? "primary" : "default"}
            onClick={onDown}
            >
              <ChevronLeft />
            </Button>

            <Box flexGrow={1} mx={4} mt={3}>
              <MainSlider
                value={[data.range_min, data.range_max]}
                onChange={onSliderRange}
                valueLabelDisplay="on"
                min={0}
                max={2100}
                step={25}
                marks={[{
                  value: 0,
                  label: '0mm'
                },{
                  value: 2100,
                  label: '2100mm'
                }]}
              />
            </Box>

            <Button variant="contained"
            color={data.mode === SliderMode_t.UP ? "primary" : "default"}
            onClick={onUp}
            >
              <ChevronRight />
            </Button>
        </Box>

        <Box mt={8} mx={4} mb={4}>
          <MainSlider
            value={data.speed}
            onChange={onSliderSpeed}
            valueLabelDisplay="on"
            min={0}
            max={100}
            step={1}
            marks={[{
              value: 100,
              label: '100mm/s'
            },{
              value: 0,
              label: '0mm/s'
            }]}
          />
        </Box>


        <Grid container spacing={10}>
          <Grid item xs={4}>
            <Button variant="contained" 
            style={{padding: '20px 0', width: '100%'}}
            color={data.mode === SliderMode_t.HOME ? "primary" : "default"}
            onClick={onHome}
            >
              HOME
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained"
            style={{padding: '20px 0', width: '100%'}}
            color={data.mode === SliderMode_t.STOP ? "primary" : "secondary"}
            onClick={onStop}
            >
              STOP
            </Button>
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Switch
                  name="checkedB"
                  color='primary'
                  checked={data.bounce}
                  onChange={onBounce}
                />
              }
              label="Bounce"
            />
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}
