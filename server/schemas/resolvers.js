const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const bcrypt = require('bcrypt');
const deepai = require('deepai');

const resolvers = {
    Query: {
      // Resolver functions for queries
        products: async () => {
          return await Product.find();
        },
        userProducts: async (parent, args, context) => {
          if (context.user) {
            const userId = context.user._id;
            const userProducts = await Product.find({ artist: userId });
            console.log(userProducts);
            return userProducts;
          }
          throw new AuthenticationError('User not authenticated.');
        },
        user: async (parent, args, context) => {
          if (context.user) {

            const userId = context.user._id;
            console.log(userId);

            const user = await User.findById(userId);
            return user;
          }
        
          throw new AuthenticationError('Not logged in');
        },
      order: async (parent, { _id }, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.products',
            populate: 'category'
          });
  
          return user.orders.id(_id);
        }
  
        throw new AuthenticationError('Not logged in');
      },
      checkout: async (parent, args, context) => {
        const url = new URL(context.headers.referer).origin;
        const order = new Order({ products: args.products });
        const line_items = [];
  
        const { products } = await order.populate('products');
  
        for (let i = 0; i < products.length; i++) {
          const product = await stripe.products.create({
            name: products[i].name,
            description: products[i].description,
            images: [`${url}/images/${products[i].image}`]
          });
  
          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: products[i].price * 100,
            currency: 'usd',
          });
  
          line_items.push({
            price: price.id,
            quantity: 1
          });
        }
  
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`
        });
  
        return { session: session.id };
      }
    },
    Mutation: {      
          // Resolver functions for mutations
    addUser: async (parent, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      const token = signToken(user);
      return { token, user };
      },
      addOrder: async (parent, { products }, context) => {
        console.log(context);
        if (context.user) {
          const order = new Order({ products });
  
          await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
  
          return order;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
      },      
      login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
  
        if (!user) {
          console.log('user not found')
          console.log('user', user);
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          console.log('incorrect password')
          console.log('correctPw', correctPw);
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      text2img: async (parent, { text }, context) => {

        if(context.user) {
          const userId = context.user._id;
      
            // Call 'deepai' API with the provided text
            const resp = await deepai.callStandardApi("stable-diffusion", { text });
        
            // Log the value of resp.output_url
            console.log('Output URL:', resp.output_url);
      
            // Save the image response to the database
              const product = new Product({
              description: text,
              imageURL: resp.output_url,
              artist: userId, 
            })

            await product.save();
            return product;
        } else {
          throw new AuthenticationError('You need to be logged in!');
        }
      },
    }
  };
  
  module.exports = resolvers;