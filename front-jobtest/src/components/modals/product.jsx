import React, { Component } from "react";
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { faPlus,faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import FormCreateProduct from "../forms/FormProduct";

export class Card extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            product: props.product ? props.product : {}
        };
    }

    handleClose() {
        this.setState({ show: false });
        this.props.setPage(1);
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <>
                { this.props.product ?
                    <Button onClick={this.handleShow}>
                        <FontAwesomeIcon icon={faEdit} className="icon" />
                    </Button>
                    :
                    <Button onClick={this.handleShow}>
                        <FontAwesomeIcon icon={faPlus} className="icon" /> Adicionar produto
                    </Button>
                }

                <div className="setTop">
                    <Modal
                        show={this.state.show}
                        onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{
                                this.state.product ? 'Editar produto' : 'Adicionar produto'
                            }</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormCreateProduct closeModal={this.handleClose} product={this.state.product} setStateModal={this.setState} />
                        </Modal.Body>
                    </Modal>
                </div>
            </>
        );
    }
}

export default Card;
