import React, { useState, useEffect } from 'react';
import { Button, Card, Icon, Image, Popup } from 'semantic-ui-react';
import { Row, Col } from 'reactstrap';
import { purple } from '@material-ui/core/colors';

const Product = ({ product }) => {
	const [ onSale_price, setonSale_price ] = useState(undefined);
	const [ onSale, setonSale ] = useState(false);
	useEffect(() => {
		const current_date = new Date().getTime();
		const start_date = new Date(product.start_date).getTime();
		const end_date = new Date(product.end_date).getTime();
		if (current_date > start_date && current_date < end_date) {
			const price = parseInt(product.sell_price.replace(',', ''));
			let temp = price * (100 - product.discount_percent) / 100;
			// temp = temp.replaceAll('');
			setonSale_price(temp);
			setonSale(true);
		}
	}, []);
	console.log(product);
	return (
		<Card>
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
					Số lượng: <span classname="date">{product.amount}</span>
				</Card.Meta>
				{/* <Card.Description>{product.description}</Card.Description> */}
			</Card.Content>

			<Card.Content extra>
				<Row>
					<Col xs={9}>
						<a>
							<Icon name="cart" />
							{onSale ? onSale_price : product.sell_price}VNĐ
						</a>
					</Col>
					<Col xs={3}>
						<a animated="horizental">
							<Popup content="Add to cart" trigger={<Button icon="add" />} />
						</a>
					</Col>
				</Row>
			</Card.Content>
		</Card>
	);
};

export default Product;
