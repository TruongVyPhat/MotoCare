import React from 'react';
import { Button, Card, Icon, Image, Popup } from 'semantic-ui-react';
import { Row, Col } from 'reactstrap';

const Service = ({service}) => {

	return (
		<Card href="# ">
			<Image src= {service.image ? service.image:"https://react.semantic-ui.com/images/avatar/large/matthew.png"} wrapped ui={true} />
			<Card.Content>
				<Card.Header>{service.name}</Card.Header>
				<Card.Meta>
					Thời gian: <span className="date">{service.duration}</span> phút
				</Card.Meta>
				{/* <Card.Description>{service.description}</Card.Description> */}
			</Card.Content>

			<Card.Content extra>
				<Row>
					<Col xs={9}>
							<Icon name="cart" />
							Giá tiền: {service.price} VNĐ
					</Col>
					<Col xs={3}>
							<Popup content='Add to service' trigger={<Button icon='add' />} />
					</Col>
				</Row>
			</Card.Content>
		</Card>
	);
};

export default Service;
