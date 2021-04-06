import { withStyles, Slider } from '@material-ui/core';

const MainSlider = withStyles({
    root: {
        color: '#3880ff',
        height: 4,
        padding: '15px 0',
    },
    thumb: {
        height: 32,
        width: 6,
        backgroundColor: '#444',
        marginTop: -14,
        marginLeft: -5,
        borderRadius: 0,
    },
    active: {},
    valueLabel: {
        left: 'calc(-200%)',
        textAlign: 'center',
        top: -22,
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    track: {
        height: 4,
    },
    rail: {
        height: 4,
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 10,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
})(Slider);

export default MainSlider;