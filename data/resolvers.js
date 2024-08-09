import mongoose from 'mongoose';

// Import models
const Employer = mongoose.model('Employer');
const Professional = mongoose.model('Professional');
const JobPosting = mongoose.model('JobPosting');
const Application = mongoose.model('Application');

export const resolvers = {
    Query: {
        // Fetch all employers or a specific employer
        employers: async () => await Employer.find({}),
        employer: async (parent, { EmployerID }) => await Employer.findById(EmployerID),

        // Fetch all professionals or a specific professional
        professionals: async () => await Professional.find({}),
        professional: async (parent, { ProfessionalID }) => await Professional.findById(ProfessionalID),

        // Fetch all job postings or a specific job posting
        jobPostings: async () => await JobPosting.find({}),
        jobPosting: async (parent, { JobPostingID }) => await JobPosting.findById(JobPostingID),

        // Fetch all applications or a specific application
        applications: async () => await Application.find({}),
        application: async (parent, { ApplicationID }) => await Application.findById(ApplicationID),
    },
    Employer: {
        // Resolve the job postings for each employer
        JobPostings: async (employer) => await JobPosting.find({ EmployerID: employer.EmployerID })
    },
    Professional: {
        // Resolve the applications for each professional
        Applications: async (professional) => await Application.find({ ProfessionalID: professional.ProfessionalID })
    },
    JobPosting: {
        // Resolve the employer details for each job posting
        Employer: async (jobPosting) => await Employer.findById(jobPosting.EmployerID)
    },
    Application: {
        // Resolve linked professional and job posting details
        Professional: async (application) => await Professional.findById(application.ProfessionalID),
        JobPosting: async (application) => await JobPosting.find(application.JobPostingID)
    },
    Mutation: {
        addEmployer: async (parent, args) => {
            const newEmployer = new Employer(args);
            return newEmployer.save();
        },
        addProfessional: async (parent, args) => {
            const newProfessional = new Professional(args);
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
            return Employer.findByIdAndUpdate(EmployerID, rest, { new: true });
        },
        updateProfessional: async (parent, args) => {
            const { ProfessionalID, ...rest } = args;
            return Professional.findByIdAndUpdate(ProfessionalID, rest, { new: true });
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
            return Employer.findByIdAndDelete(EmployerID);
        },
        deleteProfessional: async (parent, { ProfessionalID }) => {
            return Professional.findByIdAndDelete(ProfessionalID);
        },
        deleteJobPosting: async (parent, { JobPostingID }) => {
            return JobPosting.findByIdAndDelete(JobPostingID);
        },
        deleteApplication: async (parent, { ApplicationID }) => {
            return Application.findByIdAndDelete(ApplicationID);
        }
    }
};
