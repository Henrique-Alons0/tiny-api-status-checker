# API Status Service 🚀
## Description 📄
This project provides a service API that periodically checks the status of URLs from a urls.json array and logs the status in a database. The service can also be queried to fetch the current status of these URLs. This is useful for monitoring and tracking the health of external services or APIs in real-time.

## Features ✨
Cron Job ⏰: Automatically checks URL statuses at regular intervals.
Database Logging 🗄️: Stores the status of each URL in a database for future reference.
Real-Time Status Check 🔄: Allows for checking the current status of any URL via an API request.
Front-End Dashboard 💻: Provides a simple, easy-to-read interface to visualize the status of each URL.
Installation ⚙️

1. Clone the Repository 🖥️

```
git clone https://github.com/Henrique-Alons0/tiny-api-status-checker
```

2. Install Dependencies 📦

```
cd api-status-service
npm install
```

3. Configure the .env File 🌍

    Make sure to configure your environment variables in the .env file. This includes setting the database connection and cron job settings.

4. Run the Service 🚀

```
npm start
```

5. Access the Dashboard 🌐
Open your browser and navigate to public/output.html to view the dashboard.

## Usage 📊

Check the Status: Use the front-end dashboard to view the real-time status of all URLs.

API Access: Send a GET request to http://localhost:8080/status to get the status of all monitored URLs.

## Technologies Used 🛠️

Node.js 🟩

Express.js 💡

Chart.js 📈

SQLite 🗃️

## License 📑
This project is licensed under the MIT License - see the LICENSE file for details.
