import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const CustomTable = ({itemList, identity, handleItemSelection}) => {
  const classes = makeStyles({
    table: {
      minWidth: 650
    }
  });

  const itemListEntries = itemList.map((item, index) => 
      <TableRow key={index}>
        <TableCell padding="checkbox">
          <Checkbox onClick={handleItemSelection(identity, index)}/> 
        </TableCell>
        <TableCell>{item}</TableCell>
      </TableRow>
  );

  return(
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>String</TableCell>
          </TableRow>
        </TableHead>
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
  const [leftSelected, setLeftSelected] = React.useState([]);
  const [rightSelected, setRightSelected] = React.useState([]);
  //const [leftOrder, setLeftOrder] = React.useState('asc');
  //const [rightOrder, setRightOrder] = React.useState('asc');
  //const [leftFilter, setLeftFilter] = React.useState("");
  //const [rightFilter, setRightFilter] = React.useState("");

  // Download list contents from DB on start
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

  // Move selected strings from left list to right list
  const handleSwapLeftToRight = () => {

  }

  // Move selected strings from right list to left list
  const handleSwapRighttoLeft = () => {

  }

  const handleItemSelection = (identity, index) => () => {
    console.log(`item ${index} in list ${identity} selected`);
    if (identity === "left") {
      setLeftSelected(leftSelected.concat({name:leftList[index], index: index}));
    } else {
      setRightSelected(rightSelected.concat({name:rightList[index], index: index}));
    }
  }

  return (
    <div className="App">
      <div className="leftList">
        <CustomTable itemList={leftList} identity="left" handleItemSelection={handleItemSelection}/>
      </div>
      <div className="buttonGroup">
        <Button variant="contained" onClick={handleSwapLeftToRight}><KeyboardArrowRightIcon/></Button>
        <Button variant="contained" onClick={handleSwapRighttoLeft}><KeyboardArrowLeftIcon/></Button>
      </div>
      <div className="rightList">
        <CustomTable itemList={rightList} identity="right" handleItemSelection={handleItemSelection}/>
      </div>
    </div>
  );
}

export default App;
