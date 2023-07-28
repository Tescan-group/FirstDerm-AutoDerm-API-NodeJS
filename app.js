const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path'); // Import the 'path' module

const app = express();
const port = 8000;

// Set the API key as an environment variable
const apiKey = "OQK9f8z2ZV5ypJ7z5vMlkywtBVkYkocCuaX9j1xrFoI";

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware to serve static files (index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Define the route to handle the image upload and API request
app.post('/submit_image', upload.single('file'), async (req, res) => {
  try {
    const apiUrl = "https://autoderm.firstderm.com/v1/query";

    // Get the uploaded image file from the request
    const imageContents = fs.createReadStream(req.file.path); // Use createReadStream to create an UploadFile object

    const formData = new FormData();
    formData.append('file', imageContents, { filename: req.file.originalname }); // Append the UploadFile object

    const formHeaders = formData.getHeaders();

    // Make the API request using Axios
    const response = await axios.post(apiUrl, formData, {
      headers: {
        ...formHeaders,
        "Api-Key": apiKey
      }
    });

    // Send the API response back to the client
    res.json(response.data);
  } catch (error) {
    // Handle any errors that may occur during the API request
    console.error("API Request Error:", error.response.status, error.response.data);

    // Send a more descriptive error response back to the client
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

