// //TO DO: THIS IS COPY AND PASTED, NEEDS EDITING

// import React from 'react';
// import { useStoreContext } from "../../utils/GlobalState"; // TO DO: GLOBAL STATE MAY NEED EDITING TOO
// import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

// //TO DO: EDIT BC WE ARE USING MONGOOSE DB
// import { idbPromise } from "../../utils/helpers";


// const CartItem = ({ item }) => {

//   const [, dispatch] = useStoreContext();

//   const removeFromCart = item => {
//     dispatch({
//       type: REMOVE_FROM_CART,
//       _id: item._id
//     });
//     //TO DO : EDIT BC WE ARE USING MONGOOSE
//     idbPromise('cart', 'delete', { ...item });

//   };

//   const onChange = (e) => {
//     const value = e.target.value;
//     if (value === '0') {
//       dispatch({
//         type: REMOVE_FROM_CART,
//         _id: item._id
//       });
//       //TO DO : EDIT BC WE ARE USING MONGOOSE
//       idbPromise('cart', 'delete', { ...item });

//     } else {
//       dispatch({
//         type: UPDATE_CART_QUANTITY,
//         _id: item._id,
//         purchaseQuantity: parseInt(value)
//       });
//       //TO DO : EDIT BC WE ARE USING MONGOOSE
//       idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

//     }
//   }

//   return (
//     <div className="flex-row">
//       <div>
//         <img
//           src={`/images/${item.image}`}
//           alt=""
//         />
//       </div>
//       <div>
//         <div>{item.name}, ${item.price}</div>
//         <div>
//           <span>Qty:</span>
//           <input
//             type="number"
//             placeholder="1"
//             value={item.purchaseQuantity}
//             onChange={onChange}
//           />
//           <span
//             role="img"
//             aria-label="trash"
//             onClick={() => removeFromCart(item)}
//           >
//             🗑️
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CartItem;
