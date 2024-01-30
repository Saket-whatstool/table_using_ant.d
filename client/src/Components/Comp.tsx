import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';


  // const originData = [];
  // for (let i = 0; i < 100; i++) {
  //   originData.push({
  //     key: i.toString(),
  //     name: `Edward ${i}`,
  //     age: 32,
  //     address: `London Park no. ${i}`,
  //   });
  // }


  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
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
      title: 'name',
      dataIndex: 'name',
      width: 150,
      fixed: "left",
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: 150,
      editable: true,
    },
    {
      title: 'address_1',
      dataIndex: 'address_1',
      width: 100,
      editable: true,
    },
    {
      title: 'address_2',
      dataIndex: 'address_2',
      width: 100,
      editable: true,
    },
    {
      title: 'address_3',
      dataIndex: 'address_3',
      width: 100,
      editable: true,
    },
    {
      title: 'address_4',
      dataIndex: 'address_4',
      width: 100,
      editable: true,
    },
    {
      title: 'address_5',
      dataIndex: 'address_5',
      width: 100,
      editable: true,
    },
    {
      title: 'address_6',
      dataIndex: 'address_6',
      width: 100,
      editable: true,
    },
    {
      title: 'address_7',
      dataIndex: 'address_7',
      width: 100,
      editable: true,
    },
    {
      title: 'address_8',
      dataIndex: 'address_8',
      width: 100,
      editable: true,
    },
    {
      title: 'address_9',
      dataIndex: 'address_9',
      width: 100,
      editable: true,
    },
    {
      title: 'operation',
      fixed: "right",
      dataIndex: 'operation',
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
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default App;