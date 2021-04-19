import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {  IconButton, TableHead, Tooltip } from '@material-ui/core';
import styled from 'styled-components'
import TablePaginationActions from '../TablePaginationActions'
import ModalRoom from './ModalRoom';
import roomApi from '../../../api/roomApi';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

function ListRoomOnFloor({ floor, buildingData, fetchData }) {
  const classes = useStyles2();

  const [page, setPage] = useState(0);
  const [data, setData] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDelete = async (roomId) => {
    try {
      const response = await roomApi.delete(roomId)
      await fetchData();
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setData(floor.listRooms)
  }, [floor])
  return (
    <>
      <StyledHeader>
        <StyledTextHeader>Floor {floor.floorNumber}</StyledTextHeader>
      </StyledHeader>
      <StyledTable component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center" >#</TableCell>
              <TableCell align="center" >Room Name</TableCell>
              <TableCell align="center" >Room Info</TableCell>
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
                  {row.roomName}
                </TableCell>
                <TableCell align="center">
                  {row.roomInfo}
                </TableCell>
                <TableCell align="center">
                  <ModalRoom roomData={row} buildingData={buildingData} fetchData={fetchData} />
                  <Tooltip title="Delete">
                  <IconButton size="small" color="secondary" onClick={() => handleDelete(row._id)}><DeleteIcon /> </IconButton>
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
                rowsPerPageOptions={[5, 10]}
                colSpan={4}
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


ListRoomOnFloor.propTypes = {
  floor: PropTypes.object
}

export default ListRoomOnFloor

