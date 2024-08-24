# Final Project for DB

> Please use a mongoDB server, it can be a docker container or any other

```bash
#Initiate project dependencies
npm install
#Start Project
npm run dev
```
# Database Diagram
<p>This is our database proposal, this diagram will make sure that the data will be distributed in a efficient way</p>

<p align="center">
    <img alt="Prisma Image" src="./images/DB_Propousal.png" width="500" height="480" />
</p>

# Mongo Atlas Replication
<p align="center">For the migration method of the database we are using a MongoAtlas database, that automatically make the replication of the data in the secondary clusters that it contain, so in the next image we can see the <b>General Cluster</b> that contains the other clusters.</p> 
<hr>

<h3 align="center">General Cluster</h3>
<p align="center">
    <img alt="Prisma Image" src="./images/ClusterIMG.png" width="400" height="180" />
</p>
<hr>

<h3 align="center">Primary and secondaries clusters</h3>
<p align="center">
    <img alt="Prisma Image" src="./images/Clusters.png" width="400" height="180" />
</p>
<hr>

<h3 align="center">Replicated Information</h3>

<p align="center">
    <img alt="Prisma Image" src="./images/Information.png" width="400" height="180" />
</p>

# Testing Querys

<p align="center"><b>Registry of Bidders</p>

```bash
mutation Mutation($employerId: Int!, $companyName: String!, $industry: String!, $country: String!, $city: String!, $address: String!, $type: String!) {
  addEmployer(EmployerID: $employerId, CompanyName: $companyName, Industry: $industry, Country: $country, City: $city, Address: $address, Type: $type) {
    EmployerID
  }
}
```

```bash
{ 
  "employerId": 45,
  "companyName": "name",  
  "industry": "Cars",
  "country": "CR",  
  "city": "Puntarenas",
  "address": "40mts sur",
  "type": "Juridic"
}
```
> Remember to send corresponding data into the *JSON* section, or else the query will not work

<p align="center">Case File Registration</p>

```bash
mutation Mutation($resumeId: Int!, $professionalId: Int!, $titles: [String]!, $experience: [String]!) {
  addResume(ResumeID: $resumeId, ProfessionalID: $professionalId, Titles: $titles, Experience: $experience) {
    ProfessionalID
    ResumeID
  }
}
```
```bash
{  
  "resumeId": 5,
  "professionalId": 8,  
  "titles": ["Electrical Engineering", "IT manager"],
  "experience": ["20 years of experience",            "5 years"]
}
```
> Remember to send corresponding data into the *JSON* section, or else the query will not work

<p align="center">Job Vacancy Announcement</p>

```bash
query Query {
  allJobPostings {
    Title
    Requirements
    Status
  }
}
```

<p align="center">General Information (employer)</p>

```bash
query Employer($employerId: ID!) {
  employer(EmployerID: $employerId) {
    EmployerID
    ContactName
    CompanyName
    Address
    Type
    Country
  }
}
```
```bash
{
  "employerId": 8
}
```

<p align="center">Specific Information (professional)</p>

```bash
query Professional($professionalId: Int!) {
  professional(ProfessionalID: $professionalId) {
    ProfessionalID
    LastName
    FirstName
    Resumes {
      Experience
      Titles
    }
    Sex
    Applications {
      ApplicationDate
      Status
    }
  }
}
```
```bash
{
  "professionalId": 8
}
```
> Remember to send the professionalID into the *JSON* section, or else the query will not work


<p align="center">Inventory Information of Vacant Positions</p>

```bash
query Query {
  allJobPostings {
    JobPostingID
    Title
    Status
    Requirements
  }
}
```

<p align="center">Name of Applicants for a Specific Area</p>

```bash
query ProfessionalsByArea($area: String!) {
  professionalsByArea(area: $area) {
    FirstName
    LastName
  }
}
```
> Remember to send the area into the *JSON* section, or else the query will not work

<p align="center">Number and Percentage of Registered Professionals by Area</p>

```bash
query Query {
  countProfessionalsByArea {
    area
    count
    percentage
  }
}
```

<p align="center" textColor="#00000"> Number of Registered Professionals by Gender</p>

```bash
query Query {
  countProfessionalsByGender {
    femaleCount
    maleCount
  }
}
```
# Example Images for Querying

<p align="center">Registry of Bidders</p>
<p align="center">
    <img alt="Prisma Image" src="./images/testing_examples/Bidders.png" width="500" height="280" />
</p>
<p align="center">Case File Registration</p>
<p align="center">
    <img alt="Prisma Image" src="./images/testing_examples/Resume.png" width="500" height="280" />
</p>
<p align="center">Job Vacancy Announcement</p>
<p align="center">
    <img alt="Prisma Image" src="./images/testing_examples/JobOffers.png" width="500" height="280" />
</p>
<p align="center">General Information (employer)</p>
<p align="center">
    <img alt="Prisma Image" src="./images/testing_examples/InformationEmployer.png" width="500" height="280" />
</p>
<p align="center">Specific Information (professional)</p>
<p align="center">
    <img alt="Prisma Image" src="./images/testing_examples/Professional.png" width="500" height="280" />
</p>

<p align="center">Name of Applicants for a Specific Area</p>
<p align="center">
    <img alt="Prisma Image" src="./images/testing_examples/ProfessionalsByArea.png" width="500" height="280" />
</p>
<p align="center">Number and Percentage of Registered Professionals by </p>
<p align="center">
    <img alt="Prisma Image" src="./images/testing_examples/CountByArea.png" width="500" height="280" />
</p>
<p align="center" textColor="#00000"> Number of Registered Professionals by Gender</p>
<p align="center">
    <img alt="Prisma Image" src="./images/testing_examples/CountProfesionalByGender.png" width="500" height="280" />
</p>
