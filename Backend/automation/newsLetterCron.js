import cron from "node-cron";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
  cron.schedule("0 9 * * *", async () => {
    console.log("Running News-Latter Cron Automation");
    const jobs = await Job.find({ newsLettersSent: false });
    for (const job of jobs) {
      try {
        const filteredUsers = await User.find({
          $or: [
            { "niches.firstNiche": job.jobNiche },
            { "niches.secondNiche": job.jobNiche },
            { "niches.thirdNiche": job.jobNiche },
          ],
        });
        for (const user of filteredUsers) {
          const subject = `🚀 Exciting Opportunity: ${job.title} Role in ${job.jobNiche}!`;

          const message = `
              <p>Hi ${user.name},</p>  
              <p>We have great news for you! A new job opportunity that matches your niche has just been posted, and we wanted you to be among the first to know.</p>
              
              <h3>📌 Job Details</h3>
              <ul>
                <li><strong>Position:</strong> ${job.title}</li>
                <li><strong>Company:</strong> ${job.companyName}</li>
                <li><strong>Location:</strong> ${job.location}</li>
                <li><strong>Salary:</strong> ${job.salary}</li>
              </ul>

              <p>🔥 <strong><a href="#">Apply Now</a></strong> – Don't miss out, as positions like this fill up quickly!</p>
              
              <p>If you have any questions or need assistance, feel free to reach out.</p>

              <p>Best of luck with your job search!</p>

              <p><strong>Best Regards,</strong><br>JobHunt Team</p>
            `;

          await sendEmail(user.email, subject, message);
        }

        job.newsLettersSent = true;

        await job.save();
      } catch (error) {
        console.log("ERROR In News-Latter Cron Automation CATCH BLOCK");
        return next(console.error(error || "Some error in News-Latter Cron."));
      }
    }
  });
};
