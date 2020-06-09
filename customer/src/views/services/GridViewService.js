import React, {useState, useEffect} from 'react';
import {Card} from 'semantic-ui-react';
import Service from './Service';
import axios from 'axios';

const GridViewService = () => {
    
    const [listService, setListService] = useState([]);
    useEffect(() => {
        axios.get(`https://motorcare-api.herokuapp.com/api/services?page=1`)
        .then(res => {
            setListService(res.data.data);
        }).catch(error => {
            console.log(error);
        });
        //setListProduct(result);
    }, []);
    

    return(
        <div>
            <Card.Group>
                {listService && listService.map((service) => <Service key={service.id} service={service}/>)}
            </Card.Group>
        </div>
    );
};

export default GridViewService;