import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
config()

 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your Cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API key    
    api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret 
    
});

export default cloudinary;