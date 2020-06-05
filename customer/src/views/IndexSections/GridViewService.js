import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import Service from './Service';
import axios from 'axios';

const GridViewService = () => {
    
    const [listService, setListService] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:9000/api/services?page=1`)
        .then(res => {
            console.log(res.data.data)
            setListService(res.data.data);
        }).catch(error => {
            console.log(error);
        });
        //setListProduct(result);
    }, []);
    

    return(
        <div>
            <Card.Group>
                {listService && listService.map((service) => <Service service={service}/>)}
            </Card.Group>
        </div>
    );
};

export default GridViewService;