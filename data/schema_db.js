export const typeDefs = `#graphql
    type Employers {
        EmployerID: Int!,
        CompanyName: String!,
        ContactName: String,
        ContactTitle: String,
        Industry: String!,
        Country: String!,
        City: String!,
        Address: String!,
        JobPostings: [JobPosting]!
    }

    type Professionals {
        ProfessionalID: Int!,
        FirstName: String!,
        LastName: String!,
        Professions: [String]!,
        Applications: [Application]!,
        Resume: String!
    }

    type JobPosting {
        JobPostingID: Int!,
        EmployerID: Int!,
        Employers: Employers!,
        Title: String!,
        Description: String!,
        Requirements: [String]!,
        Location: String!,
        PostedDate: String!,
        ExpiryDate: String!
    }

    type Application {
        ApplicationID: Int!,
        Professionals: [Professionals]!,
        JobPostings: [JobPosting]!,
        ApplicationDate: String!,
        Status: String!
    }

    type Query {
        employers: [Employers]!,
        employer(EmployerID: Int!): Employers,

        professionals: [Professionals]!,
        professional(ProfessionalID: Int!): Professionals,

        jobPostings: [JobPosting]!,
        jobPosting(JobPostingID: Int!): JobPosting,

        applications: [Application]!,
        application(ApplicationID: Int!): Application
    }
    type Mutation {
        addEmployer(EmployerID: Int!, CompanyName: String!, ContactName: String, ContactTitle: String, Industry: String!, Country: String!, City: String!, Address: String!): Employers,
        addProfessional(ProfessionalID: Int!, FirstName: String!, LastName: String!, Email: String!, Phone: String, Address: String, Professions: [String]!, ResumeXML: String!): Professionals,
        addJobPosting(JobPostingID: Int!, EmployerID: Int!, Title: String!, Description: String!, Requirements: [String]!, Location: String!, PostedDate: String!, ExpiryDate: String!): JobPosting,
        addApplication(ApplicationID: Int!, ProfessionalID: Int!, JobPostingID: Int!, ApplicationDate: String!): Application,

        updateEmployer(EmployerID: Int!, CompanyName: String, ContactName: String, ContactTitle: String, Industry: String, Country: String, City: String, Address: String): Employers,
        updateProfessional(ProfessionalID: Int!, FirstName: String, LastName: String, Email: String, Phone: String, Address: String, Professions: [String], ResumeXML: String): Professionals,
        updateJobPosting(JobPostingID: Int!, EmployerID: Int, Title: String, Description: String, Requirements: [String], Location: String, PostedDate: String, ExpiryDate: String): JobPosting,
        updateApplication(ApplicationID: Int!, ProfessionalID: Int, JobPostingID: Int, ApplicationDate: String, Status: String): Application,

        deleteEmployer(EmployerID: Int!): Employers,
        deleteProfessional(ProfessionalID: Int!): Professionals,
        deleteJobPosting(JobPostingID: Int!): JobPosting,
        deleteApplication(ApplicationID: Int!): Application
    }

`;
