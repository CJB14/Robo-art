const deepai = require('deepai');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';

//TO DO: CHANGE/ADD TO .ENV
const apiKey = '2667375d-8f2d-448a-8acb-a0c5e20228a2';
deepai.setApiKey(apiKey);

const text2img = async (req, res) => {
    try {
      const { text, 
        // token 
      } = req.body;
      
      // Verify and decode the JWT token to extract the user ID
    // const decodedToken = jwt.verify(token, secret);
    // const userId = decodedToken.userId;

      // Call 'deepai' API with the provided text
      const resp = await deepai.callStandardApi("stable-diffusion", { text });
  
      // Log the value of resp.output_url
    console.log('Output URL:', resp.output_url);

      // Save the image response to the database
        const product = new Product({
        description: text,
        imageUrl: resp.output_url,
        // artist: userId, 
      })
  
      await product.save();

      res.json({success: true, imageUrl: resp.output_url});

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  
  module.exports = {
    text2img
  };