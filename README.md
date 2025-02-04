Email Categorization and Processing System
This project is a Node.js-based application that processes email addresses and categorizes them as either "Personal" or "Work" using a job queue system with Bull and MongoDB. The system listens for email processing jobs, retrieves the email records from a database, processes them, and updates their status and category.

Features
Email Processing: Processes email records and categorizes them based on their domain (e.g., Gmail, Yahoo, etc. are considered "Personal").
Job Queue: Uses Bull for background job processing to handle large batches of emails.
MongoDB Integration: Stores email records in MongoDB and updates them after processing.
Error Handling: Includes error handling for failed email processing jobs.
Redis Integration: Uses Redis for Bull job queue management.
Prerequisites
Node.js (v16.x or above)
MongoDB (local or remote)
Redis (for Bull job queue)
Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/AnjuPrajapati/Email-Categorization.git
cd email-mern
2. Install Dependencies
Install the required dependencies for the project:

bash
Copy
Edit
npm install
3. Configure Environment Variables
Create a .env file in the root directory and add the following environment variables:

env
Copy
Edit
MONGO_URI=mongodb://localhost:27017/emaildb  # MongoDB connection URI
REDIS_URL=redis://localhost:6379  # Redis server URL
PORT=5000  # Port for the application
4. Start MongoDB and Redis
Make sure that both MongoDB and Redis servers are running on your machine.

Start MongoDB:

bash
Copy
Edit
mongod
Start Redis:

bash
Copy
Edit
redis-server
5. Start the Application
Start the server by running:

bash
Copy
Edit
npm start
This will start the Express server on the specified port (default: 5000).

6. Start the Email Worker
Start the background job worker that processes the email queue:

bash
Copy
Edit
node src/workers/emailWorker.js
7. Usage
The email processing worker will listen for jobs and process pending emails.
The worker checks for emails in the "Pending" status and updates them with either a "Personal" or "Work" category based on the email domain.
8. Accessing the API
The following endpoints are available:

POST /api/emails
Add a new email to the processing queue:

Request Body:

json
Copy
Edit
{
  "email": "example@gmail.com",
  "requestId": "some-unique-request-id"
}
Response:

json
Copy
Edit
{
  "message": "Email added to queue for processing"
}
GET /api/emails
Fetch all emails:

Response:
json
Copy
Edit
[
  {
    "email": "example@gmail.com",
    "status": "Processed",
    "category": "Personal",
    "requestId": "some-unique-request-id"
  },
  {
    "email": "work@example.com",
    "status": "Processed",
    "category": "Work",
    "requestId": "some-unique-request-id"
  }
]
GET /api/redis
Fetch Redis job status:

Response:
json
Copy
Edit
{
  "jobCount": 10,
  "failedJobCount": 3,
  "stalledJobCount": 2
}
Project Structure
src/: Source code directory

config/: Configuration files (e.g., database, Redis, Bull setup)
models/: Mongoose schemas and models
routes/: Express route handlers
workers/: Bull job workers for processing email records
middlewares/: Custom middlewares, such as error handling
utils/: Helper utilities
package.json: Project dependencies and scripts

.env: Environment configuration for the app

README.md: Documentation for the project

