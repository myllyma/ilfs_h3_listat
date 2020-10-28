import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const CustomTable = ({itemList}) => { 
  const classes = makeStyles({
    table: {
      minWidth: 650
    }
  });

  const itemListEntries = itemList.map((item) => 
    <TableRow>
      <TableCell>{item}</TableCell>
    </TableRow>
  );

  return(
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {itemListEntries}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const App = () => {
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/left_strings')
      .then((response) => {
        setLeftList(response.data);
      });

    axios
      .get('http://localhost:3001/right_strings')
      .then((response) => {
        setRightList(response.data);
      });
  }, []);

  return (
    <div className="App">
      <div className="leftList">
        <CustomTable itemList={leftList}/>
      </div>
      <div className="buttonGroup">
        <Button variant="contained"><KeyboardArrowRightIcon/></Button>
        <Button variant="contained"><KeyboardArrowLeftIcon/></Button>
      </div>
      <div className="rightList">
        <CustomTable itemList={rightList}/>
      </div>
    </div>
  );
}

export default App;
