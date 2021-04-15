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
import { Button, TableHead } from '@material-ui/core';
import styled from 'styled-components'
import TablePaginationActions from '../TablePaginationActions'
import { Link } from 'react-router-dom';
import ModalRoom from './ModalRoom';
import roomApi from '../../../api/roomApi';

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
              <TableCell align="center" >Id Room</TableCell>
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
                  {row.roomId}
                </TableCell>
                <TableCell align="center">
                  <ModalRoom roomData={row} buildingData={buildingData} fetchData={fetchData} />
                  <Button variant="contained" color="secondary" style={{ marginLeft: "10px" }} onClick={() => handleDelete(row._id)}>
                    Delete
                  </Button>
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
                colSpan={3}
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
const TableTextHead = styled(TableCell)`
  font-weight: bold;
  font-size:34px;
`
const StyledHeader = styled.div`
  display:flex;
  align-items: flex-end;
`
const StyledButtonCreate = styled(Button)`
  height:40px;
  background-color: green !important;

`
const StyledTextHeader = styled.h1`
  flex:1;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`

ListRoomOnFloor.propTypes = {
  floor: PropTypes.object
}

export default ListRoomOnFloor

