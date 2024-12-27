const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderID: { type: String, required: true, unique: true },
    customerInfo: {
        name: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
    orderItems: [
        {
            productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
        }
    ],
    orderTotal: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
