import mongoose from "mongoose"


const purchaseSchema = new mongoose.Schema({

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true
    },
    userId: {
        type: String,
        ref: "User",
        required: true
    },


    amount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" }




}, { timestamps: true });

<<<<<<< HEAD
const Purchase = mongoose.model("Purchase", purchaseSchema)
export default Purchase;
=======
const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;
>>>>>>> 384cca2 (Added Stripe Payment GateWay)
