export const typeDefs = `#graphql
    type Employer {
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

    type Professional {
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
        Employer: Employer!,
        Title: String!,
        Description: String!,
        Requirements: [String]!,
        Location: String!,
        PostedDate: String!,
        ExpiryDate: String!
    }

    type Application {
        ApplicationID: ID!,
        ProfessionalID: ID!,
        JobPostingID: ID!,
        ApplicationDate: String!,
        Status: String! 
    }

    type Query {
        employers: [Employer]!,
        employer(EmployerID: ID!): Employer,

        professionals: [Professional]!,
        professional(ProfessionalID: ID!): Professional,

        jobPostings: [JobPosting]!,
        jobPosting(JobPostingID: ID!): JobPosting,

        applications: [Application]!,
        application(ApplicationID: ID!): Application
    }
    type Mutation {
        addEmployer(EmployerID: ID!, CompanyName: String!, ContactName: String, ContactTitle: String, Industry: String!, Country: String!, City: String!, Address: String!): Employer,
        addProfessional(ProfessionalID: ID!, FirstName: String!, LastName: String!, Email: String!, Phone: String, Address: String, Professions: [String]!, ResumeXML: String!): Professional,
        addJobPosting(JobPostingID: ID!, EmployerID: ID!, Title: String!, Description: String!, Requirements: [String]!, Location: String!, PostedDate: String!, ExpiryDate: String!): JobPosting,
        addApplication(ApplicationID: ID!, ProfessionalID: ID!, JobPostingID: ID!, ApplicationDate: String!): Application,

        updateEmployer(EmployerID: ID!, CompanyName: String, ContactName: String, ContactTitle: String, Industry: String, Country: String, City: String, Address: String): Employer,
        updateProfessional(ProfessionalID: ID!, FirstName: String, LastName: String, Email: String, Phone: String, Address: String, Professions: [String], ResumeXML: String): Professional,
        updateJobPosting(JobPostingID: ID!, EmployerID: ID, Title: String, Description: String, Requirements: [String], Location: String, PostedDate: String, ExpiryDate: String): JobPosting,
        updateApplication(ApplicationID: ID!, ProfessionalID: ID, JobPostingID: ID, ApplicationDate: String, Status: String): Application,

        deleteEmployer(EmployerID: ID!): Employer,
        deleteProfessional(ProfessionalID: ID!): Professional,
        deleteJobPosting(JobPostingID: ID!): JobPosting,
        deleteApplication(ApplicationID: ID!): Application
    }

`;
