import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Container, Row, Col } from 'reactstrap';

const CardExampleCard = () => (
	<Card>
		<Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" wrapped ui={true} />
		<Card.Content>
			<Card.Header>Motul 300V</Card.Header>
			<Card.Meta>
				<span className="date">1L</span>
			</Card.Meta>
			<Card.Description>Ester 100% Synthetic</Card.Description>
		</Card.Content>
		<Row>
			<Col xs={7}>
				<Card.Content extra>
					<a>
						<Icon name="cart" />
						395.000 VNĐ
					</a>
				</Card.Content>
			</Col>
			<Col xs={5}>
				<Button animated="vertical">
					<Button.Content hidden>Add To Cart</Button.Content>
					<Button.Content visible>
						<Icon name="add circle" />
					</Button.Content>
				</Button>
			</Col>
		</Row>
	</Card>
);

export default CardExampleCard;
