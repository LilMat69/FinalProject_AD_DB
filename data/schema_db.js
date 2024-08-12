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
        Sex: String!,
        Professions: [String]!,
        Applications: [Application]!,
        ResumeID: Int!,
        Resume: Resume!,
    }

    type JobPosting {
        JobPostingID: Int!,
        EmployerID: Int!,
        Employers: Employers!,
        Title: String!,
        Description: String!,
        Requirements: [String]!,
        Location: String!,
        Status: String!,
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

    type Resume {
        ResumeID: Int!,
        Titles: [String]!,
        Experience: [String]!,
        Professionals: [Professionals]]!,
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
        addProfessional(ProfessionalID: Int!, FirstName: String!, LastName: String!, Email: String!, Phone: String, Address: String, Professions: [String]!): Professionals,
        addResume(ResumeID: Int!, ProfessionalID: Int!, Titles: [String]!, Experience: [String]!): Resume,
        addJobPosting(JobPostingID: Int!, EmployerID: Int!, Title: String!, Description: String!, Requirements: [String]!, Location: String!, PostedDate: String!, ExpiryDate: String!): JobPosting,
        addApplication(ApplicationID: Int!, ProfessionalID: Int!, JobPostingID: Int!, ApplicationDate: String!): Application,

        updateEmployer(EmployerID: Int!, CompanyName: String, ContactName: String, ContactTitle: String, Industry: String, Country: String, City: String, Address: String): Employers,
        updateProfessional(ProfessionalID: Int!, FirstName: String, LastName: String, Email: String, Phone: String, Address: String, Professions: [String], ResumeXML: String): Professionals,
        updateResume(ResumeID: Int!, ProfessionalID: Int!, Titles: [String]!, Experience: [String]!): Resume,
        updateJobPosting(JobPostingID: Int!, EmployerID: Int, Title: String, Description: String, Requirements: [String], Location: String, PostedDate: String, ExpiryDate: String): JobPosting,
        updateApplication(ApplicationID: Int!, ProfessionalID: Int, JobPostingID: Int, ApplicationDate: String, Status: String): Application,

        deleteEmployer(EmployerID: Int!): Employers,
        deleteProfessional(ProfessionalID: Int!): Professionals,
        deleteResume(ResumeID: Int!): Resume,
        deleteJobPosting(JobPostingID: Int!): JobPosting,
        deleteApplication(ApplicationID: Int!): Application
    }

`;
