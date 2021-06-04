import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Table } from 'antd';
import { getTextTime, formatDate } from 'helper/helper'

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
function Analytics({ selectionRange, listData }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dataMinMax = useMemo(() => minMax(listData), [listData])
  console.log(dataMinMax);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text, row) => formatDate(text)
    },
  ];
  const columnsLostE = [
    {
      title: 'Start',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'End',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Time',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Analytics
      </Button>

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
        <h3>Total Energy: {totalE(listData)}</h3>
        <Table dataSource={dataMinMax} columns={columnsMaxMin} />

        <p>Quá dòng: n times</p>
        <Table dataSource={dataSource} columns={columns} />

        <p>Điện áp thấp: n times</p>
        <Table dataSource={dataSource} columns={columns} />

        <p>Điện áp cao: n times</p>
        <Table dataSource={dataSource} columns={columns} />

        <p>Mất điện: n times</p>
        <Table dataSource={dataSource} columns={columnsLostE} />
      </Modal>
    </>
  );

}

Analytics.propTypes = {

}

export default Analytics

