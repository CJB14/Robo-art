const deepai = require('deepai');
const Product = require('../models/Product');

//TO DO: CHANGE/ADD TO .ENV
deepai.setApiKey('2667375d-8f2d-448a-8acb-a0c5e20228a2');

const text2img = async (req, res) => {
    try {
      const { text } = req.body; // Assuming the user's input text is provided in the request body
      // Call 'deepai' API with the provided text
      const resp = await deepai.callStandardApi('text2img', { text });
  
      // Save the image response to the database
      const product = new Product({
        description: text,
        imageUrl: resp.output_url, // Assuming the response contains the image URL
      });
      await product.save();
  
      res.json(resp);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  
  module.exports = {
    text2img,
  };