import "dotenv/config";
import connectDB from "./connection.ts";

connectDB()
    .then(() => {
        console.log("Seed complete");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Seed failed:", error);
        process.exit(1);
    });
