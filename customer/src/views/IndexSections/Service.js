import React from 'react';
import { Button, Card, Icon, Image, Popup } from 'semantic-ui-react';
import { Row, Col } from 'reactstrap';

const Service = ({service}) => {

	return (
		<Card>
			<Image src= {service.image ? service.image:"https://react.semantic-ui.com/images/avatar/large/matthew.png"} wrapped ui={true} />
			<Card.Content>
				<Card.Header>{service.name}</Card.Header>
				<Card.Meta>
					<span className="date">{service.brand}</span>
				</Card.Meta>
				{/* <Card.Description>{service.description}</Card.Description> */}
			</Card.Content>

			<Card.Content extra>
				<Row>
					<Col xs={9}>
						<a>
							<Icon name="cart" />
							{service.price}VNĐ
						</a>
					</Col>
					<Col xs={3}>
						<a animated="horizental">
							<Popup content='Add to service' trigger={<Button icon='add' />} />
						</a>
					</Col>
				</Row>
			</Card.Content>
		</Card>
	);
};

export default Service;
