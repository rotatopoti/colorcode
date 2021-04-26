import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import styles from './Cards.module.css'
import CountUp from 'react-countup'
import cx from 'classnames'


const Cards = ({ resistance, tolerance, maximum, minimum }) => {
    console.log('Resistance for cards', resistance)
    return (
        <div className = {styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.resistance)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Resistance</Typography>
                        <Typography variant="h5">
                            {(resistance &&
                                <CountUp 
                                    start={-100}
                                    end={resistance}
                                    duration={2}
                                    decimals={2}
                                    separator="," 
                                />
                            )}
                        </Typography>
                        <Typography variant="body2">Calculated resistance using color band system</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.tolerance)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Tolerance</Typography>
                        <Typography variant="h5">
                            {(tolerance &&
                                <CountUp 
                                    start={-100}
                                    end={tolerance}
                                    duration={2}
                                    decimals={2}
                                    separator="," 
                                />
                            )}
                        </Typography>
                        <Typography variant="body2">Tolerance as a percentage</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.minimum)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Minimum</Typography>
                        <Typography variant="h5">
                            {(minimum &&
                                <CountUp 
                                    start={-100}
                                    end={minimum}
                                    duration={2}
                                    decimals={2}
                                    separator="," 
                                /> 
                            )} 
                        </Typography>
                        <Typography variant="body2">Minimum resistance for resistor.</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.maximum)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Maximum</Typography>
                        <Typography variant="h5">
                        {(maximum &&
                                <CountUp 
                                    start={-100}
                                    end={maximum}
                                    duration={2}
                                    decimals={2}
                                    separator="," 
                                />
                            )} 
                        </Typography>
                        <Typography variant="body2">Maximum resistance for resistor</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}
 
export default Cards;