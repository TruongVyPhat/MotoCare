import React, { useState, useEffect } from 'react';
import { Button, Card, Icon, Image, Popup } from 'semantic-ui-react';
import { Row, Col } from 'reactstrap';
import { useToasts } from 'react-toast-notifications'

const Product = ({ product }) => {
	const [ onSale_price, setonSale_price ] = useState(undefined);
	const [ onSale, setonSale ] = useState(false);
	const current_date = new Date().getTime();
	const start_date = new Date(product.start_date).getTime();
	const end_date = new Date(product.end_date).getTime();
	const [isChanged, setIsChanged] = useState(false)
	const { addToast } = useToasts()
	
	useEffect(() => {
		if (current_date > start_date && current_date < end_date) {
			const price = parseInt(product.sell_price) * (100 - product.discount_percent) / 100;
			setonSale_price(price);
			setonSale(true);
		}
	}, [isChanged, current_date, start_date, end_date, product.discount_percent, product.sell_price]);

	const handleAddtoCart = () => {
		if(window.localStorage.getItem('myCart') !== null){
			let same = 0;
			var oldCart = JSON.parse(window.localStorage.getItem('myCart')) || [];
			for(let i=0; i< oldCart.data.orders.length;i++)
			{
				if(product.id === oldCart.data.orders[i].id){
					oldCart.data.orders[i].quantity++
					same = 1;
				}
			}
			if(same === 0){
				let newItem = { 
					'id': product.id,
					'name':product.name,
					'image': product.image,
					'quantity': 1,
					'sell_price': product.sell_price
				}
				oldCart.data.orders.push(newItem)
			}
			window.localStorage.setItem("myCart",JSON.stringify(oldCart))
		}
		else if(window.localStorage.getItem('myCart') === null){
			window.localStorage.setItem("myCart",JSON.stringify({
				"data": {
					"discount":0,
					"orders": [
					{
						"id": product.id,
						'name':product.name,
						'image': product.image,
						"quantity": 1,
						'sell_price': product.sell_price
					}
					]
				}
			}))
		}
		addToast('Add success 1 product to your cart', { appearance: 'success' })
		setIsChanged(!isChanged)
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
					Số lượng tồn: <span className="date">{product.amount}</span> 
				</Card.Meta>
			</Card.Content>

			<Card.Content extra>
				<Row>
					<Col xs={9}>
							<Icon name="cart"  />
							{onSale ? onSale_price : product.sell_price} USD
					</Col>
					<Col xs={3}>
							<Popup content="Add to cart" trigger={<Button onClick={(event)=>{
								event.preventDefault();
								handleAddtoCart()
								}} icon="add" />} />
					</Col>
				</Row>
			</Card.Content>
		</Card>
	);
};

export default Product;
