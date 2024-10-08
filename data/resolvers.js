import { GraphQLError } from 'graphql';
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

        // Fetch professionals by gender and count them
        countProfessionalsByGender: async () => {
            try {
                const maleCount = await Professionals.countDocuments({ Sex: 'M' });
                const femaleCount = await Professionals.countDocuments({ Sex: 'F' });
                return {
                    maleCount,
                    femaleCount
                };
            } catch (err) {
                console.error(err);
                throw new GraphQLError('Error fetching professional counts by gender');
            }
        },

        // Fetch the count and percentage of professionals by area
        countProfessionalsByArea: async () => {
            try {
                const totalProfessionals = await Professionals.countDocuments();
                const areas = ['Ciencias Administrativas', 'Ciencias Sociales', 'Arte y Humanidades', 'Ingeniería', 'Tecnología', 'Ciencias de la Salud', 'Educación'];

                const areaStats = await Promise.all(areas.map(async (area) => {
                    const count = await Professionals.countDocuments({ Area: area });
                    const percentage = (count / totalProfessionals) * 100;
                    return {
                        area,
                        count,
                        percentage: parseFloat(percentage.toFixed(2)) 
                    };
                }));

                return areaStats;
            } catch (err) {
                console.error(err);
                throw new GraphQLError('Error fetching professional counts by area');
            }
        },
        
        // Fetch professionals by a specific area
        professionalsByArea: async (parent, { area }) => {
            try {
                const professionals = await Professionals.find({ Area: area });
                return professionals;
            } catch (err) {
                console.error(err);
                throw new GraphQLError('Error fetching professionals by area');
            }
        },
        
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
        // add new employer
        addEmployer: async (parent, args) => {
            const newEmployer = new Employers(args);
            return newEmployer.save();
        },
        // add new professional
        addProfessional: async (parent, args) => {
            const newProfessional = new Professionals(args);
            return newProfessional.save();
        },
        // attach resume for a professional
        addResume: async (parent, args) => {
            const newResume = new Resume(args);
            return newResume.save();
        },
        // add new job posting to offer the professionals
        addJobPosting: async (parent, args) => {
            const newJobPosting = new JobPosting(args);
            return newJobPosting.save();
        },
        // add new application for a professional
        addApplication: async (parent, args) => {
            try {
                // Fetch the professional using ProfessionalID from args
                const professional = await Professionals.findOne({ ProfessionalID: args.ProfessionalID });
                if (!professional) {
                    console.log("Not found")
                    throw new Error('Professional not found');
                }
                // Check if the professional has reached the maximum number of applications
                if (professional.MaxApplication >= 3) {
                    console.log("Maximum")
                    // Using ApolloError for better integration with Apollo Server error handling
                    throw new GraphQLError('Maximum application limit reached for the month');
                }
                console.log('Create Application')
                // Create and save a new Application
                const newApplication = new Application(args);
                return newApplication.save();
            } catch (err) {
                console.log(err);
                throw err; // Rethrowing the error to be handled by Apollo Server
            }
        },
        // update employer
        updateEmployer: async (parent, args) => {
            const { EmployerID, ...rest } = args;
            return Employers.findByIdAndUpdate(EmployerID, rest, { new: true });
        },
        // update professional
        updateProfessional: async (parent, args) => {
            const { ProfessionalID, ...rest } = args;
            return Professionals.findByIdAndUpdate(ProfessionalID, rest, { new: true });
        },
        // update resume for a professional
        updateResume: async (parent, args) => {
            const { ResumeID, ...rest } = args;
            return Resume.findByIdAndUpdate(ResumeID, rest, { new: true });
        },
        // update job posting
        updateJobPosting: async (parent, args) => {
            const { JobPostingID, ...rest } = args;
            return JobPosting.findByIdAndUpdate(JobPostingID, rest, { new: true });
        },
        // delete employer
        deleteEmployer: async (parent, { EmployerID }) => {
            return Employers.findByIdAndDelete(EmployerID);
        },
        // delete professional
        deleteProfessional: async (parent, { ProfessionalID }) => {
            return Professionals.findByIdAndDelete(ProfessionalID);
        },
        // delete resume
        deleteResume: async (parent, { ResumeID }) => {
            return Resume.findByIdAndDelete(ResumeID);
        },
        // delete job posting
        deleteJobPosting: async (parent, { JobPostingID }) => {
            return JobPosting.findByIdAndDelete(JobPostingID);
        },
        // delete application of a Job
        deleteApplication: async (parent, { ApplicationID }) => {
            return Application.findByIdAndDelete(ApplicationID);
        }
    }
};
