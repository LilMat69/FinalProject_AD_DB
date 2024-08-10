export const typeDefs = `#graphql
    type Employers {
        EmployerID: ID!,
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
        ProfessionalID: ID!,
        FirstName: String!,
        LastName: String!,
        Professions: [String]!,
        Applications: [Application]!,
        Resume: String!
    }

    type JobPosting {
        JobPostingID: ID!,
        EmployerID: ID!,
        Employers: Employers!,
        Title: String!,
        Description: String!,
        Requirements: [String]!,
        Location: String!,
        PostedDate: String!,
        ExpiryDate: String!
    }

    type Application {
        ApplicationID: ID!,
        Professionals: [Professionals]!,
        JobPostings: [JobPosting]!,
        ApplicationDate: String!,
        Status: String!
    }

    type Query {
        employers: [Employers]!,
        employer(EmployerID: ID!): Employers,

        professionals: [Professionals]!,
        professional(ProfessionalID: ID!): Professionals,

        jobPostings: [JobPosting]!,
        jobPosting(JobPostingID: ID!): JobPosting,

        applications: [Application]!,
        application(ApplicationID: ID!): Application
    }
    type Mutation {
        addEmployer(EmployerID: ID!, CompanyName: String!, ContactName: String, ContactTitle: String, Industry: String!, Country: String!, City: String!, Address: String!): Employers,
        addProfessional(ProfessionalID: ID!, FirstName: String!, LastName: String!, Email: String!, Phone: String, Address: String, Professions: [String]!, ResumeXML: String!): Professionals,
        addJobPosting(JobPostingID: ID!, EmployerID: ID!, Title: String!, Description: String!, Requirements: [String]!, Location: String!, PostedDate: String!, ExpiryDate: String!): JobPosting,
        addApplication(ApplicationID: ID!, ProfessionalID: ID!, JobPostingID: ID!, ApplicationDate: String!): Application,

        updateEmployer(EmployerID: ID!, CompanyName: String, ContactName: String, ContactTitle: String, Industry: String, Country: String, City: String, Address: String): Employers,
        updateProfessional(ProfessionalID: ID!, FirstName: String, LastName: String, Email: String, Phone: String, Address: String, Professions: [String], ResumeXML: String): Professionals,
        updateJobPosting(JobPostingID: ID!, EmployerID: ID, Title: String, Description: String, Requirements: [String], Location: String, PostedDate: String, ExpiryDate: String): JobPosting,
        updateApplication(ApplicationID: ID!, ProfessionalID: ID, JobPostingID: ID, ApplicationDate: String, Status: String): Application,

        deleteEmployer(EmployerID: ID!): Employers,
        deleteProfessional(ProfessionalID: ID!): Professionals,
        deleteJobPosting(JobPostingID: ID!): JobPosting,
        deleteApplication(ApplicationID: ID!): Application
    }

`;
