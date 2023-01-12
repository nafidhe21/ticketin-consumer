const Concert = require('../models/concerts');
const express = require('express');
const router = express.Router();

/*********************** GET *************************/

router.get(`/public/all`, async (req, res) => {
  let startDate = new Date();
  startDate = new Date(startDate.setDate(startDate.getDate()-1)).toISOString().split('T')[0];
  const concertList = await Concert.find({date: {$gte: startDate}});
  if(!concertList) {
    return res.status(400).send('error');
  }
  res.send(concertList); 
});

// get list concert from x date
router.get(`/`, async (req, res) => {
  const concertList = await Concert.find({date: {$gte: req.body.date}});
  if(!concertList) {
    return res.status(400).send('error');
  }
  return res.send(concertList); 
});


router.get(`/all`, async (req, res) => {
  let startDate = new Date();
  startDate = new Date(startDate.setDate(startDate.getDate()-1)).toISOString().split('T')[0];
  const concertList = await Concert.find({date: {$gte: startDate}});
  if(!concertList) {
    return res.status(400).send('error');
  }
  res.send(concertList); 
});

router.get('/betweendate', async (req, res) => {
  const concert = await Concert.find({date: {$gte: req.body.startDate, $lt: req.body.endDate }});
  if(!concert) {
    return res.status(400).send('error');
  }
  return res.status(200).send(concert);
});

router.get('/addonemonth', async (req, res) => {
  let endDate = new Date(req.body.date);

  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() + 1);
  endDate = endDate.toISOString().split('T')[0];

  const concert = await Concert.find({date: {$gte: req.body.date, $lt: endDate}});
  if(!concert) {
    return res.status(400).send('error');
  }
  
  return res.status(200).send(concert);
});

router.get('/:id', async (req, res) => {
  const concert = await Concert.findById(req.params.id);
  if(!concert) {
    return res.status(404).send('the concert cannot be found.');
  }

  res.status(200).send(concert);
})

/*********************** DELETE *************************/

router.delete('/:id', async (req, res)=> {
  Concert.findByIdAndRemove(req.params.id).then(concert => {
    if(concert) {
      return res.status(200).json({success: true, message: 'the concert has been deleted'});
    } else {
      return res.status(404).json({success: false, message: 'the concert not found'});
    }
  }).catch(err=>{
    return res.status(400).json({success: false, error: err})
  })
});

module.exports = router;
