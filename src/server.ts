import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  
  // Cleanup local disk after sending response.
  app.use('/filteredimage', (req: express.Request, res: express.Response, next)=>{
    res.once('finish', () => {
      deleteLocalFiles([res.locals.image]);
    });
    next();
  })

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  app.get('/filteredimage', async (req: express.Request, res: express.Response) =>{
    try{
     const image_url: string = req.query.image_url;
     const splitByColon: Array<string> = image_url.split(':');
     
     // Check whether image_url is set
     if (!image_url) {
       return res.status(400).send({ message: 'Image_url is required'});
   }
   // Check the image_url is valid
   
   if( splitByColon[0] !== 'https' ) {
     return res.status(400).send({
        message: 'Image_url is not valid'});
   }
   
   // Get the image
    const filteredImage: string = await filterImageFromURL(image_url);
     //  console.log(image);
     res.locals.filteredImage = filteredImage;
      res.status(200).sendFile(filteredImage);

    }
    catch(error){
       console.log(error);
       res.status(403).send({message: error});

    }
   

 });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: express.Request, res: express.Response ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();