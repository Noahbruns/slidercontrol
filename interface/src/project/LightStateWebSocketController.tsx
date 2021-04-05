import React, { Component, useState } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { Box, Switch, Grid, Button, FormControlLabel } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { WEB_SOCKET_ROOT } from '../api';
import { WebSocketControllerProps, WebSocketFormLoader, WebSocketFormProps, webSocketController } from '../components';
import { SectionContent, } from '../components';

import { LightState } from './types';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

export const LIGHT_SETTINGS_WEBSOCKET_URL = WEB_SOCKET_ROOT + "lightState";

type LightStateWebSocketControllerProps = WebSocketControllerProps<LightState>;

class LightStateWebSocketController extends Component<LightStateWebSocketControllerProps> {

  render() {
    return (
      <SectionContent title='Slider Controller' titleGutter>
        <WebSocketFormLoader
          {...this.props}
          render={props => (
            <LightStateWebSocketControllerForm {...props} />
          )}
        />
      </SectionContent>
    )
  }

}

export default webSocketController(LIGHT_SETTINGS_WEBSOCKET_URL, 100, LightStateWebSocketController);

type LightStateWebSocketControllerFormProps = WebSocketFormProps<LightState>;

function LightStateWebSocketControllerForm(props: LightStateWebSocketControllerFormProps) {
  const { data, saveData, setData } = props;

  const [SliderRange, setSliderRange] = useState<number | number[]>([0,2100]);
  const [SliderSpeed, setSliderSpeed] = useState<number | number[]>([20]);

  const changeLedOn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ led_on: event.target.checked }, saveData);
  }

  const onSliderRange = (event: any, value: number | number[])  => {
    setSliderRange(value)
  }

  const onSliderSpeed = (event: any, value: number | number[])  => {
    setSliderSpeed(value)
  }

  return (<>
      <ValidatorForm onSubmit={saveData}>
        <Box mt={8} mx={4}>
          <Slider
            value={SliderRange}
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

        <Box mt={8} mx={4}>
          <Slider
            value={SliderSpeed}
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
            <Button variant="contained" color="primary">
              <ChevronLeft />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="primary">
              <ChevronRight />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Switch
                  name="checkedB"
                  color='primary'
                />
              }
              label="Bounce"
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained">
              HOME
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary">
              STOP
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}
