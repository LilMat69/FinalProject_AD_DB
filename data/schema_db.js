export const typeDefs = `#graphql
    type Employer {
        EmployerID: Int!,
        CompanyName: String!,
        ContactName: String,
        ContactTitle: String,
        Industry: String!,
        Country: String!,
        City: String!,
        Address: String!,
        JobPostingID: ID!,
        JobPostings: [JobPosting]!,
        Type: String! 
    }

    type Professional {
        ProfessionalID: Int!,
        FirstName: String!,
        LastName: String!,
        Sex: String!,
        Professions: [String]!,
        MaxApplication: Int!,
        ApplicationID: ID!,
        Applications: [Application]!,
        ResumeID: ID!,
        Resumes: [Resume]!,
        Area: String! 
    }

    type AreaStats {
        area: String!,
        count: Int!,
        percentage: Float!
    }

    type GenderCount {
        maleCount: Int!,
        femaleCount: Int!
    }

    type JobPosting {
        JobPostingID: Int!,
        EmployerID: ID!,
        Employers: [Employer]!,
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
        ProfessionalID: Int!,
        Professionals: Professional!,
        EmployerID: ID!,
        Employers: Employer!,
        ApplicationDate: String!,
        Status: String!
    }

    type Resume {
        ResumeID: Int!,
        ProfessionalID: Int!,
        Titles: [String]!,
        Experience: [String]!,
    }

    type Query {
        allEmployers: [Employer]!,
        employer(EmployerID: ID!): Employer,

        allProfessionals: [Professional]!,
        professional(ProfessionalID: Int!): Professional,

        allJobPostings: [JobPosting]!,
        jobPosting(JobPostingID: Int!): JobPosting,

        allApplications: [Application]!,
        application(ApplicationID: Int!): Application,

        countProfessionalsByGender: GenderCount!,

        countProfessionalsByArea: [AreaStats]!,

        professionalsByArea(area: String!): [Professional]!  
    }

    type Mutation {
        addEmployer(EmployerID: Int!, CompanyName: String!, ContactName: String, ContactTitle: String, Industry: String!, Country: String!, City: String!, Address: String!, Type: String! ): Employer,
        addProfessional(ProfessionalID: Int!, FirstName: String!, LastName: String!, Sex: String!, ResumeID: ID!, Area: String!): Professional,
        addResume(ResumeID: Int!, ProfessionalID: Int!, Titles: [String]!, Experience: [String]!): Resume,
        addJobPosting(JobPostingID: Int!, EmployerID: Int!, Title: String!, Description: String!, Requirements: [String]!, Location: String!, Status: String!, PostedDate: String!, ExpiryDate: String!): JobPosting,
        addApplication(ApplicationID: Int!, ProfessionalID: ID!,EmployerID: ID!, JobPostingID: ID!, ApplicationDate: String!, Status: String, Comments: [String]): Application,

        updateEmployer(EmployerID: Int!, CompanyName: String, ContactName: String, ContactTitle: String, Industry: String, Country: String, City: String, Address: String): Employer,
        updateProfessional(ProfessionalID: Int!, FirstName: String, LastName: String, Sex: String, Email: String, Phone: String, Address: String, Professions: [String]): Professional,
        updateResume(ResumeID: Int!, ProfessionalID: Int!, Titles: [String]!, Experience: [String]!): Resume,
        updateJobPosting(JobPostingID: Int!, EmployerID: Int, Title: String, Description: String, Requirements: [String], Location: String, PostedDate: String, ExpiryDate: String): JobPosting,
        updateApplication(ApplicationID: Int!, ProfessionalID: Int, JobPostingID: Int, ApplicationDate: String, Status: String): Application,

        deleteEmployer(EmployerID: Int!): Employer,
        deleteProfessional(ProfessionalID: Int!): Professional,
        deleteResume(ResumeID: Int!): Resume,
        deleteJobPosting(JobPostingID: Int!): JobPosting,
        deleteApplication(ApplicationID: Int!): Application
    }
`;

