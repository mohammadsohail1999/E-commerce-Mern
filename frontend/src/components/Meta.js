import React from 'react'
import {Helmet} from 'react-helmet';

const Meta = ({title,description,keywords}) => {
    return (
        <div>
            <Helmet>
    <title>{title}</title>
    <meta name='description' content={description}/>
    
    <meta name='keyword' content={keywords}/>

            </Helmet>

            
        </div>
    )
}


Meta.defaultProps = {
    title: 'Welcome To ProShop',
    description:'we sell products',
    keywords:'elctronics,buy electronics, cheap electronics'

}




export default Meta
