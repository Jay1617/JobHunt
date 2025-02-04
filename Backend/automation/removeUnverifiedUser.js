import cron from "node-cron";
import { User } from "../models/user.model.js";

export const removeUnverifiedUser = () => {
  try {
    console.log("Running Remove-Unverified-User Cron Automation");

    cron.schedule("*/30 * * * *", async () => {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      await User.deleteMany({
        accountVerified: false,
        createdAt: { $lt: thirtyMinutesAgo },
      });
    });
  } catch (error) {
    console.log("ERROR In Remove-Unverified-User Cron Automation CATCH BLOCK");
    return next(console.error(error || "Some error in Remove-Unverified-User Cron."));
  }
};
