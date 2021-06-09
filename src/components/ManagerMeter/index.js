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
import { Spin, Input, Space } from 'antd';
import { AudiotrackOutlined } from '@material-ui/icons';

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const { Search } = Input;

const suffix = (
  <AudiotrackOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

function ManagerMeter() {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([])
  const [listBuilding, setListBuilding] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let { url } = useRouteMatch();

  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const [searchText, setSearchText] = useState("")
  const [listDataShow, setListDataShow] = useState([])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const showLocation = (item) => {
    if (!item.buildingId && !item.roomId) {
      return "-"
    }
    return `Room ${item.roomName || "?"} Floor ${item.floor || "?"} Building ${item.buildingName || "?"}`
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await meterApi.getAll()
      const getListBuilding = await meterApi.getBuildings()
      setData(response.data);
      setListBuilding(getListBuilding.data)
      setListDataShow(response.data.filter(i => i.meterId.includes(searchText)))
      setIsLoading(false)
      console.log('Fetch building successfully: ', response);
    } catch (error) {
      console.log('Failed to fetch building list: ', error);
      if (error.response) {
        // Request made and server responded
        const errorMessage = error.response.data.message
        console.log(error.response.data);
        setIsLoading(false)
        setIsError(true)
        setError(errorMessage)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setIsLoading(false)
        setIsError(true)
        setError(error.message)
      }
    }
  };
  useEffect(() => {
    async function getApi() {
      await fetchData();
    }
    getApi();
  }, []);

  useEffect(() => {
    setListDataShow(data.filter(i => i.meterId.includes(searchText)))
  }, [searchText]);


  const onSearch = value => setListDataShow(data.filter(i => i.meterId.includes(value)))
  const handleValue = (e, setValue) => {
    setValue(e.target.value)
  }
  return (
    <>
      <StyledHeader>
        <StyledTextHeader>Manager Meter</StyledTextHeader>
      </StyledHeader>
      {
        isLoading ?
          <StyledLoading>
            < Spin />
            <StyledTextLoading> Loading data</StyledTextLoading>
          </StyledLoading >
          :
          <>
            {isError ?
              <StyledError>
                {error}
              </StyledError>
              :
              <>
                <Search
                  placeholder="Search meter id"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onSearch={onSearch}
                  value={searchText}
                  onChange={e => handleValue(e, setSearchText)}
                  style={
                    {
                      width: "40%"
                    }
                  }
                />
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
                        ? listDataShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : listDataShow
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
                              <StyledLinkView to={`/meters/${row.meterId}`}>  <IconButton size="small" color="inherit"><VisibilityIcon /></IconButton>  </StyledLinkView>
                            </Tooltip>
                            <ModalMeter meterData={row} listBuilding={listBuilding} fetchData={fetchData} />
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
            }
          </>
      }

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
  text-align: center;
  margin-top:20px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`
const StyledLinkView = styled(Link)`
  color:black;
  text-decoration: none;
`

const StyledLoading = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const StyledTextLoading = styled.h2`

`
const StyledError = styled.div`
margin-bottom:10px;
font-size:18px;
color:red;
text-align:center;
`
export default ManagerMeter

