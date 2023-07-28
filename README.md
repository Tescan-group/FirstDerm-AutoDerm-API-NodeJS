# AutoDerm API - Node.js Skin Disease Prediction App

![AutoDerm API Logo](https://autoderm.firstderm.com/documentation/img/logo.png)

Welcome to the AutoDerm API Node.js application repository! This application utilizes the AutoDerm API to analyze uploaded images and predict skin diseases. Follow the steps below to set up the application on your Ubuntu VPS and start predicting skin conditions.

## Preview

![Preview image](https://github.com/Tescan-group/FirstDerm-AutoDerm-API-NodeJS/assets/73188081/9edeec20-5813-470f-8100-ff97e2ca77d3)

index.html is set to display the prediction with higest and second highest confidence value. You may edit the index.html file's <script> section accordingly if you wish a different result system.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Access Your Ubuntu VPS via SSH](#step-1-access-your-ubuntu-vps-via-ssh)
3. [Step 2: Create a New Node.js Project](#step-2-create-a-new-nodejs-project)
4. [Step 3: Clone the Git Repository](#step-3-clone-the-git-repository)
5. [Step 4: Enter Your AutoDerm API Key](#step-4-enter-your-autoderm-api-key)
6. [Step 5: Install Node.js and npm](#step-5-install-nodejs-and-npm)
7. [Step 6: Install Required Packages](#step-6-install-required-packages)
8. [Step 7: Start the Node.js Application](#step-7-start-the-nodejs-application)
9. [Step 8: Set Up Nginx Reverse Proxy](#step-8-set-up-nginx-reverse-proxy)
10. [Step 9: Access the Application](#step-9-access-the-application)

## Prerequisites

Before setting up the AutoDerm API Node.js application, ensure you have the following:

- An Ubuntu VPS with SSH access. If looking for a reliable host, [Hostinger](https://www.hostinger.com/) is recommended 👍
- Node.js and npm installed on the VPS
- An AutoDerm API key. If you don't have one, you can obtain it at [https://autoderm.firstderm.com/](https://autoderm.firstderm.com/)

## Step 1: Access Your Ubuntu VPS via SSH

Using your preferred SSH client, connect to your Ubuntu VPS by entering the following command:

```bash
ssh your_username@your_vps_ip
```

Replace `your_username` with your server's username and `your_vps_ip` with the server's IP address.

## Step 2: Create a New Node.js Project

Create a new directory for your Node.js project and navigate to it:

```bash
mkdir firstderm_node_app
cd firstderm_node_app
```

## Step 3: Clone the Git Repository

Clone this Git repository into your project directory:

```bash
git clone https://github.com/Tescan-group/FirstDerm-AutoDerm-API-NodeJS.git
```

## Step 4: Enter Your AutoDerm API Key

Open the `app.js` file using a text editor. For example, you can use `nano`:

```bash
nano app.js
```

In the `app.js` file, find line 12 and replace `YOUR_API_KEY` with your AutoDerm API key.

## Step 5: Install Node.js and npm

Update the package list and install Node.js and npm:

```bash
sudo apt update
sudo apt install nodejs npm
```

## Step 6: Install Required Packages

Install the necessary Node.js packages (Express, Axios, FormData, and Multer) using npm:

```bash
npm install express axios form-data multer fs
```

## Step 7: Start the Node.js Application

Start the Node.js application by running the following command in the terminal:

```bash
node app.js
```

Your Node.js application should now be running and listening for requests on port 8000.

## Step 8: Set Up Nginx Reverse Proxy

Install Nginx on your VPS:

```bash
sudo apt install nginx
```

Create a new Nginx configuration file for your Node.js application:

```bash
sudo nano /etc/nginx/sites-available/firstderm
```

Add the following configuration to the `firstderm` file:

```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Replace `your_domain_or_ip` with your server's domain name or IP address.

Create a symbolic link to enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/firstderm /etc/nginx/sites-enabled/
```

Test the Nginx configuration:

```bash
sudo nginx -t
```

If the test is successful, restart Nginx:

```bash
sudo systemctl restart nginx
```

## Step 9: Access the Application

Your Node.js application should now be accessible through your server's domain name or IP address. Open a web browser and enter the URL:

```
http://your_domain_or_ip
```

You should see the web page with the form to upload an image. After submitting the image, the API response should be displayed on the page.

Remember to replace `your_domain_or_ip` with your server's actual domain name or IP address.

Congratulations! You have successfully set up the AutoDerm API Node.js application. You can now use it to predict skin diseases based on uploaded images. Stay healthy! 🌟
