import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton, TableHead, Tooltip } from '@material-ui/core';
import styled from 'styled-components'
import TablePaginationActions from '../component/TablePaginationActions'
import ModalMeter from './ModalMeter';
import DeleteIcon from '@material-ui/icons/Delete';
import { useRouteMatch } from 'react-router';
import meterApi from '../../api/meterApi';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
function ManagerMeter() {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([])
  const [listBuilding, setListBuilding] =useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let { url } = useRouteMatch();
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const showLocation = (item) => {
    if (!item.buildingId && !item.roomId) {
      return "-"
    }
    return `Room ${item.roomName} Floor ${item.floor} Building ${item.buildingName}`
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const fetchData = async () => {
    try {
      const response = await meterApi.getAll()
      setData(response.data);
      console.log('Fetch building successfully: ', response);
    } catch (error) {
      console.log('Failed to fetch building list: ', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await meterApi.getAll()
        const getListBuilding = await meterApi.getBuildings()
        setData(response.data);
        setListBuilding(getListBuilding.data)
        console.log('Fetch building successfully: ', response);
      } catch (error) {
        console.log('Failed to fetch building list: ', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <StyledHeader>
        <StyledTextHeader>Manager Meter</StyledTextHeader>
      </StyledHeader>

      <StyledTable component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center" >#</TableCell>
              <TableCell align="center" >Meter Id</TableCell>
              <TableCell align="center" >Location</TableCell>
              <TableCell align="center" >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">
                  {row.meterId}
                </TableCell>
                <TableCell align="center">
                  {showLocation(row)}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <StyledLinkView to={`${url}/${row._id}/room`}>  <IconButton size="small" color="inherit"><VisibilityIcon /></IconButton>  </StyledLinkView>
                  </Tooltip>
                  <ModalMeter meterData={row} listBuilding={listBuilding} fetchData={fetchData} />
                  <Tooltip title="Delete">
                    <IconButton size="small" color="secondary"><DeleteIcon /> </IconButton>
                  </Tooltip>
                </TableCell>

              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                align="right"
                rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                colSpan={5}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </StyledTable>
    </>
  )
}


const StyledTable = styled(TableContainer)`
  margin-top:20px;
`

const StyledHeader = styled.div`
  display:flex;
  align-items: flex-end;
`

const StyledTextHeader = styled.h1`
  flex:1;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`
const StyledLinkView = styled(Link)`
  color:black;
  text-decoration: none;
`

export default ManagerMeter

