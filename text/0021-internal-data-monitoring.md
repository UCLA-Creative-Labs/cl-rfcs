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
content! The projects are detailed in the later sections.

Note: Since we do not have complete datasets on many events or projects in
the past, much of this will be just to setup infrastructure for the future.

#### Future Goals
The obvious first direction for future goals is for new data analysis
projects to be added and implemented into this monorepo. It would be
beneficial for there to be a system in place where anyone on Creative
Labs board can submit an issue in regards to CL data - whether it's
displaying a certain dataset or exploring if there is a correlation
between two datasets - that the dev team can then add to existing
projects or start a new project if necessary.

## Why are we doing this?

Event attendance and participation is frequently stressed within internal
board goals, and it would be great to see how we can collectively improve
those numbers and grow our organization! Watchdog allows us to implement
a system and benefit from years of past datasets that can help us make
informed decisions in the future. This would be especially great for
design and marketing teams so that they can focus on strategies that
have been proven to work.

## What is the high level design/implementation?

On a high level, the current ideas for Watchdog tools follow the same
structure, but with different data from various sources. The projects
would be a web application that allows board members to authenticate
themselves as the data is sensitive and for internal use only as of now.
Following the authentication the data needs to be collected, preprocessed,
and formatted. There then needs to be the development of the web app
that displays the most important parts of the dataset. After this,
options should be implemented for the user to selectively view various
portions of the data (with respect to certain time periods or project
types, etc). 

## What are the requirements for this project?

Watchdog is a collection of internal data visualization projects. They 
all require authentication as the data is privacy sensitive, so Firebase
experience for authentication and data storage would be useful. The
projects would utilize Python for data fetching and processing portions
and use React on the frontend to display the visualization and handle
user interactions. 

### Project 1: Project Data Vis
The first project is a continuation of the current Watchdog project, which
is a tool to get data analytics on Creative Labs projects. Currently, it
fetches project application information and displays its various statistics.
We want to organize this by creating user datasets that would keep track
of the same applicant through multiple application cycles. There would be a
web app that displays the most important datasets in a visualized format and
key conclusions would be highlighted. An addition would be to allow board
members to better access the data by allowing users to choose their own
method of displaying data (bar graph, pie chart, etc) and choosing a
specific time period with various filters.

Project 1 with project applications would use the [gspread API](https://docs.gspread.org/en/latest/user-guide.html)
to obtain the data from the spreadsheets and parse through/organize the
necessary statistics. Then, the post-processed organized data would be stored
into Firebase, where we would use [React-Vis](https://uber.github.io/react-vis/) to display the data
and come up with concrete conclusions and inferences.

### Project 2: Social Media Data Vis
The second project would be a program that monitors how others interact
with Creative Labs. This would be primarily to understand the correlation
between social media post interactions (ads, likes, shares) and event
attendance. 

Project 2 with social media monitoring would use the [Facebook API](https://developers.facebook.com/docs/graph-api/reference/page/)
and the [Instagram API](https://developers.facebook.com/docs/instagram-api/) to obtain the neccesary datapoints. We would
need to map each post and advertisement run to a specific event hosted by
Creative Labs and quantify the effect or potential correlation. This
mapping would be done by giving each event in Creative Labs a certain
time frame and checking the timestamp of each post or advertisement run
to see which fall into that time frame.

### Project 3: Website Data Vis
The third project would dive into where (and at what frequency) users
are navigating towards on our main website.

Project 3 with monitoring for the main website would require integration with
the implementation of the site in the future.

## What are we launching today?

The most important part of this project is allowing board members to easily
access more internal data and its visualization. A barebones version would
be successfully creating a web app that allows users to authenticate themselves
and see a general overview of the project data. The first main add on to this
version would be an interface that allows the user to select a certain time
frame to view, or other various options such as looking solely at iOS or game
development projects and their statistics. The second main addition to the
barebones version would be a monitoring platform for both Creative Labs social
media interactions and main website traffic.

## FAQ

> Working backwards, what are some questions a user, developer, designer, marketer
> have regarding the project? Answering these questions ahead of time will make
> the development process smoother and better for everyone involved.

## Appendix

The original Watchdog project can be found [here](https://github.com/UCLA-Creative-Labs/watchdog/).

For Project 1, we could use the following data tables for each project member,
project, application cycle, and time period.

Project member:
```json
{
    "<email>": {
        "name": "<name>",
        "year": "<year>",
        "major": "<major>",
        "application_cycles": ["<cycle_id1>", "<cycle_id2>", ...],
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
        "project_lead": ["<project_lead1>", "<project_lead2>", ...],
        ...
    }
}
```

Application cycle:
```json
{
    "<cycle_id>": {
        "application_status": "<accepted_rejected>",
        "timestamp": "<timestamp>",
        "project_order": ["<project_id1>", "<project_id2>", ...],
        ...
    }
}
```

Time period:
```json
{
    "<quarter_id>": {
        "number_of_projects": "<number>",
        "number_of_members": "<number>",
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
    }
}
```

For Project 2, we could use the following data tables for each post and
Creative Labs event.

Post:
```json
{
    "<post_id>": {
        "created_time": "<created_time>",
        "linked_event": "<event_id>",
    }
}
```

CL event:
```json
{
    "<event_id>": {
        "linked_posts": ["<post_id1>", "<post_id2>", "<post_id3>", ...],
        "event_time": "<date>",
        "range_of_time": ["<date1>", "<date2>"],
        "attendees_list": ["<email1>", "<email2>", ...],
    }
}