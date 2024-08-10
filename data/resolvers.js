import mongoose from 'mongoose';

// Import models
const Employers = mongoose.model('Employers');
const Professionals = mongoose.model('Professionals');
const JobPosting = mongoose.model('JobPosting');
const Application = mongoose.model('Application');

export const resolvers = {
    Query: {
        // Fetch all employers or a specific employer
        employers: async () => await Employers.find({}),
        employers: async (parent, { EmployerID }) => await Employers.findById(EmployerID),

        // Fetch all professionals or a specific professional
        professionals: async () => await Professionals.find({}),
        professionals: async (parent, { ProfessionalID }) => await Professionals.findById(ProfessionalID),

        // Fetch all job postings or a specific job posting
        jobPostings: async () => await JobPosting.find({}),
        jobPosting: async (parent, { JobPostingID }) => await JobPosting.findById(JobPostingID),

        // Fetch all applications or a specific application
        applications: async () => await Application.find({}),
        application: async (parent, { ApplicationID }) => await Application.findById(ApplicationID),
    },
    Employers: {
        // Resolve the job postings for each employer
        JobPostings: async (employers) => await JobPosting.find({ EmployerID: employers.EmployerID })
    },
    Professionals: {
        // Resolve the applications for each professional
        Applications: async (professionals) => await Application.find({ ProfessionalID: professionals.ProfessionalID })
    },
    JobPosting: {
        // Resolve the employer details for each job posting
        Employers: async (jobPosting) => await Employers.findById(jobPosting.EmployerID)
    },
    Application: {
        // Correct the field to singular as per the schema
        Professionals: async (application) => await Professionals.findById(application.ProfessionalID),
        // Ensure other fields are resolved appropriately
        JobPostings: async (application) => await JobPosting.findById(application.JobPostingID)
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
        deleteJobPosting: async (parent, { JobPostingID }) => {
            return JobPosting.findByIdAndDelete(JobPostingID);
        },
        deleteApplication: async (parent, { ApplicationID }) => {
            return Application.findByIdAndDelete(ApplicationID);
        }
    }
};
