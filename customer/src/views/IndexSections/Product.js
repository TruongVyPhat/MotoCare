import React, { useState, useEffect } from 'react';
import { Button, Card, Icon, Image, Popup } from 'semantic-ui-react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { purple } from '@material-ui/core/colors';
import ProductDetail from "views/examples/ProductDetail";

const Product = ({ product }) => {
	const [ onSale_price, setonSale_price ] = useState(undefined);
	const [ onSale, setonSale ] = useState(false);
	useEffect(() => {
		const current_date = new Date().getTime();
		const start_date = new Date(product.start_date).getTime();
		const end_date = new Date(product.end_date).getTime();
		if (current_date > start_date && current_date < end_date) {
			const price = parseInt(product.sell_price) * (100 - product.discount_percent) / 100;
			setonSale_price(price);
			setonSale(true);
		}
	}, []);

	const handleAddtoCart = () => {
		console.log('dada')
	}
	
	return (
		<Card href={`/product-detail/${product.id}`}> 
			<Image 
				src={product.image ? product.image : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'}
				wrapped
				ui={true}
			/>
			<Card.Content>
				<Card.Header>{product.name}</Card.Header>
				<Card.Meta>
					Nhãn hiệu: <span className="date">{product.brand_name}</span>
				</Card.Meta>
				<Card.Meta>
					Số lượng tồn: <span classname="date">{product.amount}</span> bình
				</Card.Meta>
			</Card.Content>

			<Card.Content extra>
				<Row>
					<Col xs={9}>
						<a>
							<Icon name="cart"  />
							{onSale ? onSale_price : product.sell_price} VNĐ
						</a>
					</Col>
					<Col xs={3}>
						<a animated="horizental">
							<Popup content="Add to cart" trigger={<Button onClick={(event)=>{
								event.preventDefault();
								handleAddtoCart()
								}} icon="add" />} />
						</a>
					</Col>
				</Row>
			</Card.Content>
		</Card>
	);
};

export default Product;
