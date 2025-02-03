import { Job } from "../models/job.model.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualifications,
    offers,
    salary,
    hiringMultipleCandidates,
    personalWebsiteTitle,
    personalWebsiteUrl,
    jobNiche,
  } = req.body;
  if (
    !title ||
    !jobType ||
    !location ||
    !companyName ||
    !introduction ||
    !responsibilities ||
    !qualifications ||
    !salary ||
    !jobNiche
  ) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }
  if (
    (personalWebsiteTitle && !personalWebsiteUrl) ||
    (!personalWebsiteTitle && personalWebsiteUrl)
  ) {
    return next(
      new ErrorHandler(
        "Provide both the website url and title, or leave both blank.",
        400
      )
    );
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualifications,
    offers,
    salary,
    hiringMultipleCandidates,
    personalWebsite: {
      title: personalWebsiteTitle,
      url: personalWebsiteUrl,
    },
    jobNiche,
    postedBy,
  });
  res.status(201).json({
    success: true,
    message: "Job posted successfully.",
    job,
  });
});

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const { city, niche, searchKeyword } = req.query;
  const query = {};
  if (city) {
    query.location = city;
  }
  if (niche) {
    query.jobNiche = niche;
  }
  if (searchKeyword) {
    query.$or = [
      { title: { $regex: searchKeyword, $options: "i" } },
      { companyName: { $regex: searchKeyword, $options: "i" } },
      { introduction: { $regex: searchKeyword, $options: "i" } },
    ];
  }
  const jobs = await Job.find(query);
  res.status(200).json({
    success: true,
    jobs,
    count: jobs.length,
  });
});
// export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { city, niche, searchKeyword, sortBy, page = 1, limit = 10 } = req.query;
  
//       const query = {};
  
//       // Convert filters to lowercase for case-insensitive search
//       if (city) {
//         query.location = { $regex: new RegExp(city, "i") };
//       }
//       if (niche) {
//         query.jobNiche = { $regex: new RegExp(niche, "i") };
//       }
//       if (searchKeyword) {
//         query.$or = [
//           { title: { $regex: new RegExp(searchKeyword, "i") } },
//           { companyName: { $regex: new RegExp(searchKeyword, "i") } },
//           { introduction: { $regex: new RegExp(searchKeyword, "i") } },
//         ];
//       }
  
//       // Pagination
//       const skip = (page - 1) * limit;
      
//       // Sorting Options
//       let sortOptions = { createdAt: -1 }; // Default: newest jobs first
//       if (sortBy === "salary") sortOptions = { salary: -1 }; // Sort by salary descending
//       if (sortBy === "title") sortOptions = { title: 1 }; // Sort by title alphabetically
  
//       // Fetch Jobs with Pagination & Sorting
//       const jobs = await Job.find(query)
//         .sort(sortOptions)
//         .skip(skip)
//         .limit(Number(limit));
  
//       // Count total jobs matching the query (for pagination)
//       const totalJobs = await Job.countDocuments(query);
  
//       res.status(200).json({
//         success: true,
//         jobs,
//         count: jobs.length,
//         totalJobs, // Total jobs available
//         currentPage: Number(page),
//         totalPages: Math.ceil(totalJobs / limit),
//       });
//     } catch (error) {
//       next(new ErrorHandler("Failed to fetch jobs", 500));
//     }
//   });
  

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted.",
  });
});

export const getASingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }
  res.status(200).json({
    success: true,
    job,
  });
});
