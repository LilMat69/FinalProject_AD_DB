import mongoose from 'mongoose';

// Import models
const Employers = mongoose.model('employers');
const Professionals = mongoose.model('professionals');
const Resume = mongoose.model('resumes');
const JobPosting = mongoose.model('jobpostings');  // Fixed casing inconsistency
const Application = mongoose.model('applications');

export const resolvers = {
    Query: {
        // Fetch all employers
        allEmployers: async () => await Employers.find(),
        // Fetch a specific employer by EmployerID
        employer: async (parent, { EmployerID }) => await Employers.findOne({EmployerID: EmployerID}),

        // Fetch all professionals
        allProfessionals: async () => await Professionals.find(),
        // Fetch a specific professional by ProfessionalID
        professional: async (parent, { ProfessionalID }) => await Professionals.findOne({ProfessionalID: ProfessionalID}),
        
        // Fetch all job postings
        allJobPostings: async () => await JobPosting.find(),
        // Fetch a specific job posting by JobPostingID
        jobPosting: async (parent, { JobPostingID }) => await JobPosting.findOne({JobPostingID: JobPostingID}),

        // Fetch all applications
        allApplications: async () => await Application.find(),
        // Fetch a specific application by ApplicationID
        application: async (parent, { ApplicationID }) => await Application.findOne({ApplicationID: ApplicationID}),
    },
    Employer: {
        // Resolve the job postings for each employer
        JobPostings: async (employer) => await JobPosting.find({ EmployerID: employer.EmployerID })
    },
    Professional: {
        // Resolve the applications for each professional
        Applications: async (professionals) => await Application.find({ ProfessionalID: professionals.ProfessionalID }),
        Resumes: async(resumes) => await Resume.find({ResumeID: resumes.ResumeID})
    },
    JobPosting: {
        // Resolve the employer details for each job posting
        Employers: async (jobPosting) => await Employers.findById(jobPosting.EmployerID)
    },
    Application: {
        // Resolve the professional details for each application
        Professionals: async (application) => {
            // Assuming application.ProfessionalID holds the custom ID value you want to query by
            return await Professionals.findOne({ ProfessionalID: application.ProfessionalID });
        },
        // Resolve the employer details for each application
        Employers: async (application) => {
            // Assuming application.EmployerID holds the custom ID value you want to query by
            return await Employers.findOne({ EmployerID: application.EmployerID });
        }
    },
    Mutation: {
        addEmployer: async (parent, args) => {
            const newEmployer = new Employers(args);
            return newEmployer.save();
        },
        addProfessional: async (parent, args) => {
            const newProfessional = new Professionals(args);
            return newProfessional.save();
        },
        addResume: async (parent, args) => {
            const newResume = new Resume(args);
            return newResume.save();
        },
        addJobPosting: async (parent, args) => {
            const newJobPosting = new JobPosting(args);
            return newJobPosting.save();
        },
        addApplication: async (parent, args) => {
            const newApplication = new Application(args);
            return newApplication.save();
        },
        updateEmployer: async (parent, args) => {
            const { EmployerID, ...rest } = args;
            return Employers.findByIdAndUpdate(EmployerID, rest, { new: true });
        },
        updateProfessional: async (parent, args) => {
            const { ProfessionalID, ...rest } = args;
            return Professionals.findByIdAndUpdate(ProfessionalID, rest, { new: true });
        },
        updateResume: async (parent, args) => {
            const { ResumeID, ...rest } = args;
            return Resume.findByIdAndUpdate(ResumeID, rest, { new: true });
        },
        updateJobPosting: async (parent, args) => {
            const { JobPostingID, ...rest } = args;
            return JobPosting.findByIdAndUpdate(JobPostingID, rest, { new: true });
        },
        updateApplication: async (parent, args) => {
            const { ApplicationID, ...rest } = args;
            return Application.findByIdAndUpdate(ApplicationID, rest, { new: true });
        },
        deleteEmployer: async (parent, { EmployerID }) => {
            return Employers.findByIdAndDelete(EmployerID);
        },
        deleteProfessional: async (parent, { ProfessionalID }) => {
            return Professionals.findByIdAndDelete(ProfessionalID);
        },
        deleteResume: async (parent, { ResumeID }) => {
            return Resume.findByIdAndDelete(ResumeID);
        },
        deleteJobPosting: async (parent, { JobPostingID }) => {
            return JobPosting.findByIdAndDelete(JobPostingID);
        },
        deleteApplication: async (parent, { ApplicationID }) => {
            return Application.findByIdAndDelete(ApplicationID);
        }
    }
};
