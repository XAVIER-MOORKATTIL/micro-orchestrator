const mongoose = require('mongoose');

// Mathematical SNR Calculation: SNR = 10 * log10(P_signal / P_noise)
function calculateSNR(signalPower, noisePower) {
    if (noisePower <= 0) return Infinity;
    return 10 * Math.log10(signalPower / noisePower);
}

const TransactionSchema = new mongoose.Schema({
    transactionId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    nodeId: { 
        type: String, 
        required: true 
    },
    signalPower: { 
        type: Number, 
        required: true 
    },
    noisePower: { 
        type: Number, 
        required: true 
    },
    snrValue: { 
        type: Number 
    },
    status: { 
        type: String, 
        enum: ['PENDING', 'COMMITTED', 'ROLLED_BACK'], 
        default: 'PENDING' 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

// Pre-save Middleware: SNR Guard Enforcement (Modern Mongoose Signature)
TransactionSchema.pre('save', function () {
    const minThresholdDb = 3.0; // Minimum allowed SNR threshold in dB
    this.snrValue = calculateSNR(this.signalPower, this.noisePower);

    if (this.snrValue < minThresholdDb) {
        this.status = 'ROLLED_BACK';
        throw new Error(`Transaction rejected: SNR (${this.snrValue.toFixed(2)} dB) below threshold (${minThresholdDb} dB)`);
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);