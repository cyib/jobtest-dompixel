import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';

import Logo from '../../components/views/logo';
import TableProducts from '../../components/views/table';

import ModalProduct from '../../components/modals/product';
import Pagination from '../../components/utils/pagination';

import http from "../../services/http";
import './style.css';

export class PageHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      orderBy: 'name',
      orderDir: 'DESC',
      pages: 0,
      total: 0,
      products: []
    }

    this.getProducts(this.state.page, this.state.limit, this.state.orderBy, this.state.orderDir);
  }

  getProducts(page, limit, orderBy, orderDir) {
    console.log(this.state);
    http.get(`/products?page=${page}&limit=${limit}&orderBy=${orderBy}&orderDir=${orderDir}`).then(res => {
      this.setState({ products: [] });
      this.setState({
        products: res.data.products,
        pages: res.data.pages,
        total: res.data.total,
      });
    }).catch(err => { console.log(err); });
  }

  setPage = (page) => {
    this.setState({ page });
    this.getProducts(page, this.state.limit, this.state.orderBy, this.state.orderDir);
  };

  render() {
    return (
      <>
        <Row className="home-header">
          <Container>
            <Row>
              <Container>
                <Logo />
                <hr />
              </Container>
            </Row>
            <Row>
              <Col>
                <h2 className="title">Produtos</h2>
              </Col>
              <Col>
                <ModalProduct setPage={this.setPage} />
              </Col>
            </Row>
          </Container>
        </Row>
        <br />
        <Row className="main">
          <Container>
            <TableProducts parentState={this.state} setPage={this.setPage} />
            <Pagination page={this.state.page} pages={this.state.pages} setPage={this.setPage} />
          </Container>
        </Row>
      </>
    );
  }
}

export default PageHome;
