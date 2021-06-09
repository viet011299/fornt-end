import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Table } from 'antd';
import { getTextTime, formatDate } from 'helper/helper'
import meterApi from 'api/meterApi';

const minMax = (listData) => {
  let minV = Number.POSITIVE_INFINITY
  let maxV = Number.NEGATIVE_INFINITY
  let minA = Number.POSITIVE_INFINITY
  let maxA = Number.NEGATIVE_INFINITY
  let minW = Number.POSITIVE_INFINITY
  let maxW = Number.NEGATIVE_INFINITY
  let minkWh = Number.POSITIVE_INFINITY
  let maxkWh = Number.NEGATIVE_INFINITY
  const data = []
  for (let i = 1; i <= 4; i++) {
    if (i == 1) {
      data.push({
        name: "Min V",
        value: null,
        time: null
      })
      data.push({
        name: "Max V",
        value: null,
        time: null
      })
    }
    if (i == 2) {
      data.push({
        name: "Min I",
        value: null,
        time: null
      })
      data.push({
        name: "Max I",
        value: null,
        time: null
      })
    }
    if (i == 3) {
      data.push({
        name: "Min P",
        value: null,
        time: null
      })
      data.push({
        name: "Max P",
        value: null,
        time: null
      })
    }
    if (i == 4) {
      data.push({
        name: "Min Energy",
        value: null,
        time: null
      })
      data.push({
        name: "Max Energy",
        value: null,
        time: null
      })
    }
  }

  listData.forEach((item, index) => {
    let count = 0;
    if (item.v < minV) { minV = item.v; data[count].value = item.v; data[count].time = item.time }
    count++
    if (item.v > maxV) { maxV = item.v; data[count].value = item.v; data[count].time = item.time }
    count++
    if (item.a < minA) { minA = item.a; data[count].value = item.a; data[count].time = item.time }
    count++
    if (item.a > maxA) { maxA = item.a; data[count].value = item.a; data[count].time = item.time }
    count++
    if (item.w < minW) { minV = item.w; data[count].value = item.w; data[count].time = item.time }
    count++
    if (item.w > maxW) { maxW = item.w; data[count].value = item.w; data[count].time = item.time }
    count++
    if (item.kWh < minkWh) { minkWh = item.kWh; data[count].value = item.kWh; data[count].time = item.time }
    count++
    if (item.kWh > maxkWh) { maxkWh = item.kWh; data[count].value = item.kWh; data[count].time = item.time }
  })

  return data
}

const totalE = (listData) => {
  let result = 0
  if (listData.length > 0) {
    const start = listData[0].kWh
    const end = listData[listData.length - 1].kWh
    result = (end - start).toFixed(2)
  }

  return result
}
function Analytics({ selectionRange, listData, meterId, isModalVisible, closeModal }) {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const [listEvent, setListEvent] = useState({})
  const dataMinMax = useMemo(() => minMax(listData), [listData])
  const handleOk = () => {
    closeModal()
  };

  const handleCancel = () => {
    closeModal()
  };
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columnsMaxMin = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: "center",
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      align: "center",
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text, row) => formatDate(text),
      align: "center",
    },
  ];
  const columnsLostE = [
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
      render: (text, row) => formatDate(text),
      align: "center",
    },
    {
      title: 'End',
      dataIndex: 'end',
      key: 'end',
      render: (text, row) => formatDate(text),
      align: "center",
    },
  ];
  const columns = [
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      align: "center",
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
      align: "center",
      render: (text, row) => formatDate(text),
    },
    {
      title: 'End',
      dataIndex: 'start',
      key: 'start',
      align: "center",
      render: (text, row) => formatDate(text),
    },
  ];
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const query = { startDate: selectionRange.startDate, endDate: selectionRange.endDate }
      const response = await meterApi.analytics(meterId, query)
      setListEvent(response.data)
      setIsLoading(false)
      console.log('Fetch building successfully: ', response);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        const errorMessage = error.response.data.message
        console.log(error.response.data);
        setIsError(true)
        setError(errorMessage)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setIsError(true)
        setError(error.message)
      }
      setIsLoading(false)
    }
  }
  useEffect(() => {
    async function getApi() {
      await fetchData();
    }
    getApi()
  }, [])
  return (
    <>
      <Modal centered width={1000}
        bodyStyle={{
          height: " 500px",
          overflowY: "scroll"
        }

        }
        title={`Analytics ${getTextTime(selectionRange)}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Total Energy: {totalE(listData)} kWh</h3>
        <Table dataSource={dataMinMax} columns={columnsMaxMin} />

        <h3>Power Cut: {listEvent["8"] ? listEvent["8"].length : 0} times</h3>
        <Table dataSource={listEvent["8"] || []} columns={columnsLostE} pagination={{ pageSize: 5 }} />

        <h3>Over current: {listEvent["1"] ? listEvent["3"].length : 0} times</h3>
        <Table dataSource={listEvent["1"] || []} columns={columns} pagination={{ pageSize: 5 }} />

        <h3>Over Voltage: {listEvent["2"] ? listEvent["2"].length : 0} times</h3>
        <Table dataSource={listEvent["2"] || []} columns={columns} pagination={{ pageSize: 5 }} />

        <h3>Low Voltage : {listEvent["3"] ? listEvent["1"].length : 0} times</h3>
        <Table dataSource={listEvent["3"] || []} columns={columns} pagination={{ pageSize: 5 }} />


      </Modal>
    </>
  );

}

Analytics.propTypes = {

}

export default Analytics

