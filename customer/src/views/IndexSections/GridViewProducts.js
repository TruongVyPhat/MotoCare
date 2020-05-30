import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import Product from './Product';

const GridViewProducts = () => {
    const [listProduct, setListProduct] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    useEffect(() => {

    }, []);

    return(
        <div>
            <Card.Group>
                {listProduct && listProduct.map((product) => <Product product={product}/>)}
            </Card.Group>
        </div>
    );
};

export default GridViewProducts;