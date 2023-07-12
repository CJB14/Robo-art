import React, { useEffect, useState } from 'react';
// import { Header, Image, Container, Grid, Statistic, Input, Button } from 'semantic-ui-react';
import Text2ImgComponent from '../components/Text2Img';
import jwtDecode from 'jwt-decode';

const ArtworkPage = () => {

  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Retrieve the JWT token from storage (e.g., local storage, session storage)
    const token = localStorage.getItem('jwtToken');

    if (token) {
     
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      const userId = decodedToken.userId;
      
      console.log(userId);
      
      setUserId(userId);
    }
  }, []);
  return (
    <div>
      <h1>THIS IS WHERE YOU WILL GENERATE AN IMAGE</h1>
      <Text2ImgComponent userId={userId} />
    </div>
  );
};

export default ArtworkPage;

// import React from 'react';
// // import { Header, Image, Container, Grid, Statistic, Input, Button } from 'semantic-ui-react';
// import Text2ImgComponent from '../components/Text2Img';

// const ArtworkPage = () => {
//   return (
//     <div>
//       <h1>THIS IS WHERE YOU WILL GENERATE AN IMAGE</h1>
//       <Text2ImgComponent />
//     </div>
//   );
// };

// export default ArtworkPage;
