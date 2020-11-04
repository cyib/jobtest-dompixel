import React, { Component } from 'react';
import { Pagination, Col, Row, Button } from 'react-bootstrap';

export class paginationBasic extends Component {
    constructor(props) {
        super(props);
    }

    getPages() {
        let active = this.props.page;
        let items = [];
        for (let number = 1; number <= this.props.pages; number++) {
            items.push(
                <Pagination.Item key={number} onClick={() => {
                    this.props.setPage(number);
                    }} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
    }


    render() {
        return (
            <div>
                <Pagination size="sm">{this.getPages()}</Pagination>
            </div>
        )
    }
}

export default paginationBasic;
