const express = require('express');
const router = express.Router();
const axios = require('axios')
const moment = require('moment')

const {auth} = require('../middleware/auth')
const {api} = require('../middleware/apikey')


router.post('/listingCheck', async (req, res) =>{
    console.log(req.body.searchList)


    const responses = await Promise.all(
        ids.map(async id => {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${id}`
            ); // Send request for each id
        })
    );

    // const listBack = []


    // for(let i = 0; req.body.searchList.length > i; i++){
    //     console.log(req.body.searchList[i])
    //     try{
    //         let config = {
    //             headers: {
    //             'x-api-key': process.env.ETSYKEY,
    //             }
    //         }
    
    //     const listing = await axios.get(`https://openapi.etsy.com/v3/application/listings/${req.body.searchList[i]}`,
    //     config
    //     )
    //     console.log(listing)
    
    //     const numberOfFavorites = listing.data.num_favorers
    //     const tags = listing.data.tags
    //     const price = listing.data.price.amount/listing.data.price.divisor
    
    
    //     const itemReview = await axios.get(`https://openapi.etsy.com/v3/application/listings/${req.body.searchList[i]}/reviews`, config)
        
    //     // console.log(itemReview.data.count)
    
    //     const reviewByShop = await axios.get(`https://openapi.etsy.com/v3/application/shops/${listing.data.shop_id}/reviews`, config)
    //     // console.log(reviewByShop.data.count)
    //     const shop = await axios.get(`https://openapi.etsy.com/v3/application/shops/${listing.data.shop_id}`, config)
    //     // console.log(shop.data)
    
    
    //     const projectedSale = (shop.data.transaction_sold_count/reviewByShop.data.count)*itemReview.data.count
    //     var endDate = moment(new Date());
    //     var difference = endDate.diff(moment.unix(1632355751), 'months')
    //     const averageMonthSales = projectedSale/difference
    //     const monthRevenue = averageMonthSales*price
    //     listBack.push(projectedSale, averageMonthSales, numberOfFavorites, tags, price, monthRevenue)
    //     }catch(err){
    //         console.log(err)
    //     }

    // }

    // console.log(listBack)
    
    // res.send(listBack)

})




module.exports = router;