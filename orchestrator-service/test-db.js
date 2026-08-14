require('dotenv').config();
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');

async function testConnection() {
    try {
        console.log("Connecting to MongoDB Atlas...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("SUCCESS: Connected to MongoDB Atlas!");

        // Test insertion that PASSES the SNR guard (High Signal, Low Noise)
        const validTx = new Transaction({
            transactionId: `tx_${Date.now()}`,
            nodeId: "node-alpha",
            signalPower: 100,
            noisePower: 10
        });

        await validTx.save();
        console.log(`PASS: Transaction Saved successfully! SNR: ${validTx.snrValue.toFixed(2)} dB`);

    } catch (err) {
        console.error("FAIL / GUARD TRIGGERED:", err.message);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from database.");
    }
}

testConnection();