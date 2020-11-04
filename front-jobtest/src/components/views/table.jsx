import React, { Component } from "react";
import { Table, Row, Button } from "react-bootstrap";
import { useToasts } from 'react-toast-notifications';

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalProduct from '../../components/modals/product';
import http from "../../services/http";
import "./style.css";

export class ViewTable extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    formatPrice(price) {
        return parseFloat(price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

    deleteProduct(product){
        http.delete(`/products/${product.id}`).then(res => { 
            this.props.setPage(1);
        }).catch(err => { 
            console.log(err); 
        });
    }

    render() {
        return (
            <div style={{ minHeight: '385px' }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th style={{ width: '25%' }}>Nome</th>
                            <th style={{ width: '25%' }}>Categoria</th>
                            <th style={{ width: '15%' }}>Preço</th>
                            <th style={{ width: '15%' }}>Data de criação</th>
                            <th style={{ width: '20%' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.parentState.products && this.props.parentState.products.length > 0 ?
                            this.props.parentState.products.map(product =>
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{this.formatPrice(product.price)}</td>
                                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                    <td style={{ display: 'inline-flex' }}>
                                        <ModalProduct setPage={this.props.setPage} product={product}/>
                                        <Button onClick={() => { this.deleteProduct(product) } } style={{ margin: '2px' }}>
                                            <FontAwesomeIcon icon={faTrash} className="icon" />
                                        </Button>
                                    </td>
                                </tr>
                            ) : null}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ViewTable;
