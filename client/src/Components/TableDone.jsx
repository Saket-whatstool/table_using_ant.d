import {Form, Table, Popconfirm, Typography, InputNumber, Input } from 'antd';
import { useState, useEffect } from 'react';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {


  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
};

const App = () => {
  
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    fetch("http://localhost:8000/api/user")
    .then(res => res.json())
    .then(res => {
        const newData = res.data.map(item => ({ ...item, key: item._id }));
        console.log(newData);
        setData(newData);
      })
    .catch(err => console.log(err))
  }, [])


  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };


  const cancel = () => {
    setEditingKey('');
  };

  
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: "key",
      width: 100,
      dataIndex: '_id',
      fixed :"left",
      editable: false
    },
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      fixed: 'left',
      editable: true
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      fixed: 'left',
      editable: true
    },
    {
      title: 'Column 1',
      dataIndex: 'address_1',
      width: 100,
      editable: true
    },
    {
      title: 'Column 2',
      dataIndex: 'address_2',

      width: 100,
      editable: true
    },
    {
      title: 'Column 3',
      dataIndex: 'address_3',

      width: 100,
      editable: true
    },
    {
      title: 'Column 4',
      dataIndex: 'address_4',

      width: 100,
      editable: true
    },
    {
      title: 'Column 5',
      dataIndex: 'address_5',

      width: 100,
      editable: true
    },
    {
      title: 'Column 6',
      dataIndex: 'address_6',

      width: 100,
      editable: true
    },
    {
      title: 'Column 7',
      dataIndex: 'address_7',
      width: 100,
      editable: true
    },
    {
      title: 'Column 8',
      dataIndex: 'address_8',
      width: 100,
      editable: true
    },
    {
      title: 'Column 9',
      dataIndex: 'address_9',
      width: 100,
      editable: true
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: 150,
      fixed: "right",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const tableStyle = {
    top: 0,
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    maxWidth: "90vw",
    margin: "0 40px 0 40px"
  }

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/user")
    .then(res => res.json())
    .then(res => {
        const newData = res.data.map(item => ({ ...item, key: item._id }));
        setData(newData);
      })
    .catch(err => console.log(err))
  }, [])


  return (
    <div style={tableStyle}>
      <Form form={form} component={false}>
        <Table
          // columns={columns}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowClassName="editable-row"
          bordered
          columns={mergedColumns}
          dataSource={data}
          scroll={{
            x: 1500,
          }}
        />
      </Form>
    </div>
  )
}

export default App