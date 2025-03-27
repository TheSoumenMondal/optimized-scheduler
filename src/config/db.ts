import mongoose from "mongoose"

interface ConnectionObject {
    isConnected?: number
}

const connection: ConnectionObject = {}

export const connectDB = async (): Promise<void> => {
    if (connection.isConnected) {
        console.log("Already connected")
        return
    }
    try {
        const dbConn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI! || "")
        connection.isConnected = dbConn.connections[0].readyState
        console.log("Connected to MongoDB")

    } catch (error) {
        console.log("Error while connecting mongoDB.", error)
        process.exit(1)
    }
}