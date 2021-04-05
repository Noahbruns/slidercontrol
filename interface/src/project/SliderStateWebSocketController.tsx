import React, { Component } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { Box, Switch, Grid, Button, FormControlLabel } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { WEB_SOCKET_ROOT } from '../api';
import { WebSocketControllerProps, WebSocketFormLoader, WebSocketFormProps, webSocketController } from '../components';
import { SectionContent, } from '../components';

import { SliderState } from './types';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

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

  /*const changeLedOn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ led_on: event.target.checked }, saveData);
  }*/

  const onSliderRange = (event: any, value: unknown)  => {
    setData({ ...data, range_min: (value as number[])[0], range_max: (value as number[])[1] }, saveData);
  }

  const onSliderSpeed = (event: any, value: unknown)  => {
    setData({ ...data, speed: value as number }, saveData);
  }

  return (<>
      <ValidatorForm onSubmit={saveData}>
        <Box mt={8} mx={4}>
          <Slider
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

        <Box mt={8} mx={4}>
          <Slider
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
