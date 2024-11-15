const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;
    
    const client = new MongoClient(`${mongoURI}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to MongoDB
    await client.connect();
    
    console.log(`MongoDB connected successfully to database: ${dbName}`);

    // Use the database for operations, if needed
    const db = client.db(dbName);
    
    // Close the connection when done
    // client.close(); // Uncomment when finished with operations

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
