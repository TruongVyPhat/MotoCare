import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Container, Row, Col } from 'reactstrap';

const Product = () => (
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
				<Col xs={7}>
					<a>
						<Icon name="cart" />
						395.000 VNĐ
					</a>
				</Col>
				<Col xs={5}>
					<a animated="horizental">
						<Button.Content hidden>Add To Cart</Button.Content>
						<Button.Content visible>
							{/* <Icon name="add circle" /> */}
						</Button.Content>
					</a>
					{/* <a><Icon name="add circle" /></a>	 */}
				</Col>
			</Row>
		</Card.Content>
	</Card>
);

export default Product;
