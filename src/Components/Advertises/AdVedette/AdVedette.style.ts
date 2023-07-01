import { styled } from "@mui/material/styles";
import { Button, FormControl, TextField, Grid } from "@mui/material";


export const ContainerFluid = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
});

export const Col = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

export const Figure = styled('figure')({
    height: '420px',
    overflow: 'hidden',
    position: 'relative',
});

export const Media = styled('div')(({ theme }) => ({
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100%',
    position: 'absolute',
    transition: `all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    width: '100%',

    '&:hover': {
        transform: 'scale(1.25)',
    },
}));

export const Figcaption = styled('figcaption')({
    color: 'black',
    // height: 'calc(100% - 30px)',
    margin: '15px',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '250px',
    height: '350px',
});

export const Body = styled('div')({
    // backgroundColor: 'white',
    bottom: '0',
    padding: '15px',
    position: 'absolute',
    width: '85%',
    marginBottom: "50px",
    height: "149px",
    maxHeight: "100px",
    overflow: "hidden",
});

export const Svg = styled('svg')({
    height: 'inherit',
    width: '100%',

    '& text': {
        textAnchor: 'middle',
    },

    '& #alpha': {
        fill: 'white',
    },

    '& .title': {
        fontSize: '32px',
        fontFamily: 'Montserrat',
        letterSpacing: '5px',

    },

    '& #base': {
        // fill: 'white',
        WebkitMask: 'url(#mask)',
        mask: 'url(#mask)',
        opacity: '0.65'
    },

});
