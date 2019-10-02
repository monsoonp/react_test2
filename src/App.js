import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ButtonToolbar, Button } from 'react-bootstrap';
import csvFile from './data/seoul_temp.csv';
import * as d3 from 'd3';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Temp_chart from './chart/Temp_chart';
import Insert_panel from './chart/Insert_panel';

const styles  = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
class App extends Component {
  state = {
    list:[],
    temp:[],
    date:[],
    moist:[],
    id:[],
  }
  shouldComponentUpdate(nextProps, nextState){
    //return nextState.list !== this.state.list;
    return nextState.date !== this.state.date;
  }
  componentDidMount(prevProps, prevState) {
    const {list} = this.state;
    const node = this.node;
    
    if (list && list.length ===0){
      console.log("App componentDidMount")
      d3.csv(csvFile, (data, error) => {
        this.setState({
          list: list.concat({...data}),
          temp: this.state.temp.concat(parseInt(data.기온)),
          date: this.state.date.concat(data.일시),
          moist: this.state.moist.concat(data.습도),
          id: this.state.id.concat(data.ID),
        }, () => {console.log()})
        
      }).catch(function(err){
        console.log("d3.csv error: "+err);
      }).then(function(data){
        //console.log(data); // columns
      })
      
    } //if
    
  } //componentDidMount

  addList = (val) =>{
    //console.log(val);
    if(this.state.date.findIndex(dt => dt === val.date)===-1){  // 없는 date 값일 경우
      this.setState({
        //list: list.concat({...val}),
        date: this.state.date.concat(val.date===""? new Date : val.date),
        temp: this.state.temp.concat(val.temp===""? 0 : val.temp),
        moist: this.state.moist.concat(val.moist===""? 0 : val.moist),
        //id: this.state.id.concat(data.ID),
      })
    }
  }
  /*
  .justify-content-start
  .justify-content-end
  .justify-content-center
  .justify-content-between
  .justify-content-around
  */
  render(){
    const {classes} = this.props;
    const {list, temp, date, moist, id} = this.state;
    return (
      <div className='App'>
        <Grid container spacing={0} justify="content-around" alignItems="content-start" direction="row">
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h2><b>서울시 기온정보</b></h2>
              </Paper>
            </Grid>
            <Grid item xs={10}>
              <Paper className={classes.paper}>
                <Temp_chart list={list} temp={temp} date={date} moist={moist}/>
              </Paper>
            </Grid>
            <Grid item xs={2} justify="center" >
              <Paper className={classes.paper}>
                <Insert_panel onUpdate={this.addList}/>
              </Paper>
            </Grid>
        </Grid>
        
        
      </div>
    );
  }//render
}//class

export default withStyles(styles)(App);
