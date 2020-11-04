import React, { useState } from "react";
import { Button, Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useToasts } from 'react-toast-notifications';

import http from "../../services/http";
import "./style.css";

const FormCreateProduct = (props) => {
    const { handleSubmit, register } = useForm();
    const { addToast } = useToasts();
    const [product, setProduct] = useState(props.product);

    const onSubmit = values => {
        var productMapper = values;
        if(props.product.id){
            editProduct(productMapper);
        }else{
            createProduct(productMapper);
        }
        
    };

    const onChangeHandler = (event) => {
        setProduct({ [event.target.name]: event.target.value });
    }

    const editProduct = (productMapper) => {
        http.put(`/products/${props.product.id}`, productMapper).then(res => { 
            setProduct({});
            console.log(res.data.product);
            setProduct(res.data.product);
            addToast(`Produto editado com sucesso!`, { appearance: 'success', autoDismiss: true });
            props.closeModal();
        }).catch(err => { 
            console.log(err); 
            addToast(`Ops, algo deu errado na edição do produto!`, { appearance: 'error', autoDismiss: true });
        });
    }

    const createProduct = (productMapper) => {
        http.post(`/products`, productMapper).then(res => { 
            addToast(`Produto cadastrado com sucesso!`, { appearance: 'success', autoDismiss: true });
            props.closeModal();
        }).catch(err => { 
            console.log(err); 
            addToast(`Ops, algo deu errado no cadastro do produto!`, { appearance: 'error', autoDismiss: true });
        });
    }

    const onError = (message) => {
        addToast(message, { appearance: 'warning', autoDismiss: true });
        return false;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col sm={12}>
                    <Form.Label>Nome</Form.Label>
                    <InputGroup className="mb-3" >
                        <FormControl
                            name="name"
                            id="name"
                            placeholder="Digite o nome do produto"
                            value={product.name}
                            onChange={onChangeHandler}
                            ref={register({
                                validate: value => value !== "" || onError("O nome deve ser preenchido!")
                            })}
                        />
                    </InputGroup>
                </Col>
                <Col sm={12}>
                    <Form.Label>Categoria</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            name="category"
                            id="category"
                            placeholder="Digite a categoria do produto"
                            value={product.category}
                            onChange={onChangeHandler}
                            ref={register({
                                validate: value => value !== "" || onError("A categoria deve ser preenchida!")
                            })}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Preço (R$)</Form.Label>
                    <InputGroup className="mb-3" >
                        <FormControl
                            name="price"
                            id="price"
                            placeholder="Digite o preço"
                            value={product.price}
                            onChange={onChangeHandler}
                            type="number"
                            ref={register({
                                validate: value => value !== "" || onError("O preço deve ser preenchido!")
                            })}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <hr />
            <Row className="footer">
                <Col>
                    <Button variant="secondary" style={{ float: 'left' }} onClick={() => props.closeModal()}>
                        Cancelar
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                        Salvar
                    </Button>
                </Col>
            </Row>
        </form>
    );
};

export default FormCreateProduct;