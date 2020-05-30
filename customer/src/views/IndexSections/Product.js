import React from 'react';
import { Button, Card, Icon, Image, Popup } from 'semantic-ui-react';
import { Row, Col } from 'reactstrap';

const Product = ({product}) => {

	return (
		<Card>
			<Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" wrapped ui={true} />
			<Card.Content>
				<Card.Header>Motul 300V</Card.Header>
				<Card.Meta>
					<span className="date">1L</span>
				</Card.Meta>
				<Card.Description>Ester 100% Synthetic</Card.Description>
			</Card.Content>

			<Card.Content extra>
				<Row>
					<Col xs={9}>
						<a>
							<Icon name="cart" />
							395.000 VNĐ
						</a>
					</Col>
					<Col xs={3}>
						<a animated="horizental">
							<Popup content='Add to cart' trigger={<Button icon='add' />} />
						</a>
					</Col>
				</Row>
			</Card.Content>
		</Card>
	);
};

export default Product;
