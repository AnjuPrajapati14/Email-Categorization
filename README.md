 
---

# **Email Processing Web Application**  

This is a web application for processing email data from uploaded CSV files. The application categorizes emails into "personal" or "work" and provides real-time status updates. It leverages **Redis Pub/Sub** for asynchronous background processing and **MongoDB** for data storage.  

---

## **Features**  

- Upload CSV files containing email data  
- Background job processing using Redis Pub/Sub  
- Batch processing of email records for efficient database insertion  
- Real-time status updates for each upload request  
- Email categorization into "personal" and "work"  

---

## **Tech Stack**  

- **Node.js** (Backend)  
- **Express.js** (Web framework)  
- **MongoDB** (Database)  
- **Redis** (Job queue and Pub/Sub)  
- **Mongoose** (MongoDB ODM)  
- **uuid** (Unique request identifiers)  
- **multer** (File uploads)  
- **fs** (File system handling)  

---

## **Installation**  

1. Clone the repository:  
   ```bash
   git clone https://github.com/AnjuPrajapati14/Email_Check.git
   cd Email_Check
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Set up MongoDB and Redis on your local machine. Ensure that Redis is running on `127.0.0.1:6379`.  

4. Create a `.env` file with the following configuration:  
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   REDIS_URL=redis://127.0.0.1:6379
   ```

5. Start the application:  
   ```bash
   npm start
   ```

---

## **API Endpoints**  

### **Upload Emails**  
**POST** `/api/upload`  

- **Description**: Upload a CSV file with email data.  
- **Request Body**: Multipart form-data with a CSV file (`file` key).  
- **Response**:  
  ```json
  {
    "message": "Emails uploaded successfully.",
    "requestId": "c1a5090f-301e-4d20-9796-29e597d73b42"
  }
  ```

---

## **How It Works**  

1. **CSV Upload**: The user uploads a CSV file containing email addresses.  
2. **Batch Processing**: Emails are inserted into MongoDB in batches of 1000 records.  
3. **Redis Pub/Sub**: After inserting the emails, a `requestId` is published to the `emailQueue` channel.  
4. **Background Worker**: A separate worker subscribes to the `emailQueue` and processes each request in the background.  
5. **Email Categorization**: The worker categorizes emails into "personal" or "work" and updates the status in the database.  

---

## **Redis Monitoring**  

To verify Redis activity, you can use the `redis-cli`:  

```bash
127.0.0.1:6379> SUBSCRIBE emailQueue
Reading messages... (press Ctrl-C to quit)
```

You will see messages containing the `requestId` for each batch of emails processed.  

---

## **File Structure**  

```
project-root
│
email-backend
- src
├── config/
│   └── cachingConfig.js            
│   └── config.js
│   └── db.js
│   └── jobProcessing.js               
│   └── redis.js            # Redis client setup
├── controllers/
│   └── emailController.js  # Upload and batch processing logic
│   └── statusController.js  # status updation logic
│   └── uploadController.js  # Upload
├── middlewares/
│   └── errorHandler.js       # error handling
├── models/
│   └── emailModel.js       # Mongoose schema for emails
├── utils/
│   └── csvParser.js        # CSV parsing utility
│   └── redisUtils.js         
├── routes/
│   └── emailRoutes.js      # API routes for email processing
|   └── redisRoutes.js   
├── worker/
│   └── emailWorker.js      # Redis subscriber for background processing
├── .env                    # Environment variables
├── app.js                  # Main application entry point
-uploads / folder for uploaded files
└── README.md               # Project documentation
```

---

## **Future Enhancements**  

- Add **progress tracking** for each batch.  
- Implement a **retry mechanism** for failed jobs.  
- Add a **notification system** for job completion.  
- Support **large-scale CSV uploads** with cloud storage integration.  

---

## **License**  
This project is licensed under the MIT License.  

---

 
README.md: Documentation for the project

