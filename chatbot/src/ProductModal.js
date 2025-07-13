import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useTable } from 'react-table';

const ProductModal = () => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch products when modal is opened
  useEffect(() => {
    if (show) {
      setLoading(true);
      axios.get('https://fakestoreapi.com/products')
        .then(res => setProducts(res.data))
        .catch(err => console.error('Error fetching products:', err))
        .finally(() => setLoading(false));
    }
  }, [show]);

  const columns = useMemo(() => [
    {
      Header: 'Title',
      accessor: 'title'
    },
    {
      Header: 'Price',
      accessor: 'price'
    },
    {
      Header: 'Category',
      accessor: 'category'
    }
  ], []);

  const tableInstance = useTable({ columns, data: products });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Show Products
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Product List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center py-3">
              <Spinner animation="border" />
              <div>Loading products...</div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table {...getTableProps()} className="table table-bordered table-hover">
                <thead className="table-light">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductModal;
