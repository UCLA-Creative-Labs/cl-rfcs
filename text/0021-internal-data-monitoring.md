---
rfc pr: https://github.com/UCLA-Creative-Labs/cl-rfcs/pull/22
tracking issue: https://github.com/UCLA-Creative-Labs/cl-rfcs/issues/21
---

# Watchdog

`Watchdog` is a monorepo that will contain a variety of Creative Labs
data analysis tools for internal usage. 

## Blurb

The goal of this project is to allow all the teams across Creative Labs
board to make data-driven decisions. We want to set up a system where all
members can access previous data and use insights from the past to make
good judgement calls in the present.

Watchdog is meant to be a monorepo to house several data analysis tools
for Creative Labs. These tools are primarily meant for Creative Labs
board members, but we could look towards displaying some of the data
publicly or publishing our findings through a blog post for marketing
content! We will detail the first project in the following sections.

Note: Since we do not have complete datasets on many events or projects in
the past, much of this will be just to setup infrastructure for the future.

### Future Goals

The obvious first direction for future goals is for new data analysis
projects to be added and implemented into this monorepo. It would be
beneficial for there to be a system in place where anyone on Creative
Labs board can submit an issue in regards to CL data - whether it's
displaying a certain dataset or exploring if there is a correlation
between two datasets - that the dev team can then add to existing
projects or start a new project if necessary. 

Other projects under ideation include a social media data visualizer
that would monitor the correlation between social media post interactions
(ads, likes, shares) and event attendance. Another project would be
to create a tool that monitors where (and at what frequency) users
are navigating towards on our main site.

## Why are we doing this?

Event attendance and participation is frequently stressed within internal
board goals, and it would be great to see how we can collectively improve
those numbers and grow our organization! Watchdog allows us to implement
a system and benefit from years of past datasets that can help us make
informed decisions in the future. This would be especially great for
design and marketing teams so that they can focus on strategies that
have been proven to work.

## What is the high level design/implementation?

On a high level, the projects for Watchdog tools follow the same structure,
but with different data from various sources. The data needs to be collected,
processed, and organized into specific data structures that we can query in
the future. The projects would be displayed through a web application that
allows board members to authenticate themselves as the data is sensitive and
for internal use only as of now.

The web application will display and visualize the important parts of the
dataset with conclusions. After this, options will be implemented for the
user to selectively view various portions of the data (with respect to certain
time periods or project types, etc). 

## What are the requirements for this project?

The first project is a continuation of the current Watchdog project, which
will be a tool to get data analytics on Creative Labs applications and
visualize that data on a web app that is accessible to all board members
and teams.

The project will utilize Python for data fetching and processing portions
and use React on the frontend to display the datasets and handle
user interactions. 

#### Data Overview
We have some main datasets to work with:

* all project member applications from Fall 2016 - Present
* all project lead applications from Spring 2017 - Present

We have some preliminary questions to answer:

* Percentage of applicants who reapply
    * Percentage of current project members who reapply for other projects
* Age demographic
* Major demographic
* Experience demographic
* Where do people hear about CL?
* Does GM attendance reflect number of applications?
* When do people usually apply?
* Number of applicants per quarter
* Does more projects == more applicants?
* Popular types of projects?

#### Data Collection

The project will need to first fetch the project member and project lead
application information mentioned in the above section. We would need to use the
[gspread API](https://docs.gspread.org/en/latest/user-guide.html) which allows
a variety of functions to pull data in specific formats from google spreadsheets.
gspread API is extremely simple to authenticate and requires minimal setup.

#### Data Processing

We want to organize the data from the spreadsheets by creating data structures
that will allow us to query the necessary information easily. 

The current data that we have is split into two groups: project member applications
and project lead applications. The project member apps are in the format of:
name, year, major, email, and project choices. The project lead apps are currently
in the format of: project type, project name, accepted/rejected, timestamp, previous
projects, number of openings, and project lead information (name, year, major, email).

The main tables we need to set up are for each student, application, project,
and time period. More details on these structures can be found in the ```Appendix```
section.

After organizing the data to our specified format, we would need to store this
data using [Firestore](https://firebase.google.com/docs/firestore/quickstart).
We would need to create an instance of Cloud Firestore (either by using Google
Cloud Platform with credits or on our own server with a service account). Firestore
stores data within Documents, which are in turn stored within Collections. We
would create a Collection and add our various Documents where we can store
different sets of necessary information. Finally, we would need to secure our
data by specifying which parties are allowed access to the Firestore. 

#### Data Visualization

There will be a web app to showcase the info and we would need to use React
to pull the data from the Documents in Firestore.

The landing page will provide a general summary of our developed tool and a
display of the most important datasets in a visualized format with highlighted
key conclusions. Following that, the user will be able to go into various options.
There are some current ideas: users choosing their own method of displaying data
(bar graph, pie chart, etc), choosing to look into a specific time period in detail,
having various filtering options for the data.

Some technologies to look into for data visualization are [React-Vis](https://uber.github.io/react-vis/),
[RAWGraphs](https://rawgraphs.io/about) and [Gephi](https://gephi.org/).

#### Authentication

This web app detailed in the above section would require authentication as the
data is privacy sensitive, which can be done either through Firebase or Google App
Scripts detailed [here](https://script.gs/password-protected-web-app/). 

With Firebase, we will create a Document within our Collections that will contain a
field with our password stored as a string. Then, we will check to see if the user's
input matches our string and allow access if true.

## What are we launching today?

The most important part of this project is allowing board members to easily
access more internal data and its visualization. A barebones version would
be successfully creating a web app that allows users to authenticate themselves
and see a general overview of the project data. The first main add on to this
version would be an interface that allows the user to select a certain time
frame to view, or other various options such as looking solely at iOS or game
development projects and their statistics. Future additions to the barebones
version would be a monitoring platform for both Creative Labs social media
interactions and main website traffic.

## FAQ

> Working backwards, what are some questions a user, developer, designer, marketer
> have regarding the project? Answering these questions ahead of time will make
> the development process smoother and better for everyone involved.

## Appendix

The original Watchdog project can be found [here](https://github.com/UCLA-Creative-Labs/watchdog/).

For Project 1, we could use the following data tables for each student,
application, project, and time period.

Student:
```json
{
    "<email>": {
        "name": "<name>",
        "year": "<year>",
        "major": "<major>",
        "application": ["<application_id1>", "<application_id2>", ...],
        ...
    }
}
```

Application:
```json
{
    "<application_id>": {
        "applicant": "<email>",
        "application_status": "<boolean>",
        "time_period": "<quarter_id>",
        "timestamp": "<timestamp>",
        "project_order": ["<email1>", "<email2>", ...],
        ...
    }
}
```

Project:
```json
{
    "<project_id>": {
        "type": "<project_type>",
        "number_of_accepted": "<number>",
        "time_period": "<quarter_id>",
        "project_lead": ["<project_lead1>", "<project_lead2>", ...],
        ...
    }
}
```

Time period:
```json
{
    "<quarter_id>": {
        "number_of_projects": "<number>",
        "number_of_applicants": "<number>",
        "number_of_accepted": "<number>",
        "applications": ["<application_id1", "<application_id2>", "<application_id3>", ...],
        "accepted_applications": ["<application_id1", "<application_id2>", "<application_id3>", ...],
        "projects": ["<project_id1>", "<project_id2>", ...],
        "project_distribution": {
            "iOS": "<number>",
            "web app": "<number>",
            "writing": "<number>",
            ...
        },
        "grade_distribution": {
            "first": "<number>",
            "second": "<number>",
            "third": "<number>",
            "fourth": "<number>",
            "other" : "<number>"
        },
        "major_distribution": {
            "Computer Science": "<number>",
            "Cog Sci": "<number>",
            "Engineering": "<number>",
            "DESMA": "<number>",
            ...
        },
        ...
    }
}
```
