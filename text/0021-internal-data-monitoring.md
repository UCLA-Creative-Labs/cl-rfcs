---
rfc pr: https://github.com/UCLA-Creative-Labs/cl-rfcs/pull/22
tracking issue: https://github.com/UCLA-Creative-Labs/cl-rfcs/issues/21
---

# Watchdog

`Watchdog` is a monorepo that will contain a variety of Creative Labs data analysis tools for internal use. 

## Blurb

The goal of this project is to allow all the teams across Creative Labs
board to make data-driven decisions. We want to set up a system where all
members can access previous data and use insights from the past to make
good judgement calls in the present.

Watchdog is meant to be a monorepo to house various data analysis tools
for Creative Labs. There are two main projects to implement currently.
The first is a continuation of the current Watchdog project, which is a
tool to get data analytics on Creative Labs projects. Currently, it
fetches project application information and displays its various statistics.
We want to organize this by creating user datasets that would keep track
of the same applicant through multiple application cycles. An improvement
upon the original Watchdog project would be to allow board members to better
access the data - through a web app that allows users to choose their own
method of displaying data (bar graph, pie chart, etc) or choosing a
specific time period with various filters.

The second project would be a program that monitors how others interact
with Creative Labs. This would include where (and at what frequency) users
are navigating towards on our main website or understanding the correlation
between social media posts interactions (ads, likes, shares) and event
attendance. This project is primarily meant for Creative Labs board members
but we could look at displaying some of the data publicly or publishing our
findings through a blog post for marketing content!

Note: Since we do not have complete data on many events or projects in the
past, much of this will be just to setup infrastructure for the future.

### Future Goals
The obvious first direction for future goals after these two projects is
for new data analysis projects to add and implement into this monorepo.
It would be beneficial for there to be a system in place where anyone on
Creative Labs board can submit an issue in regards to CL data - whether
it's displaying a certain dataset or exploring if there is a correlation
between two factors - that the dev team can then add to existing projects
or start a new project if necessary.

## Why are we doing this?

Event attendance and participation is frequently stressed within internal
board goals, and it would be great to see how we can collectively improve
those numbers and grow our organization! Watchdog allows us to implement
a system and benefit from years of past datasets that can help us make
informed decisions in the future. This would be especially great for
design and marketing teams so that they can focus on strategies that
have been proven to work.

## What is the high level design/implementation?

The first part of the project would require a web app that allows board
members to authenticate themselves as the data is sensitive and for
internal use only as of now. Following the authentication there needs to
be the development of the web app that displays the most important parts
of the dataset. After this, options should be implemented for the user
to be able to select specific project types or time periods. The second
part of the project would be essentially the same structure, but with data
from different sources and split up by each notable Creative Labs event
(Demo Day or General Meeting).

Main parts of project:
* displaying main portions of data
* options for user selection
    * time period
    * project type
    * member major
    * member year

We could use the following data tables for each member application and time period.

Member application
```
{
    "<name>": {
        "year": "<year>",
        "major": "<major>",
        "email": "<email>",
        "timestamp": "<timestamp>",
        "project_choice_order": "[<choice_1>, <choice_2>, ...]",
        "other_application_cycles": "[<cycle_1>, <cycle_2>, ...]"
        ...
    }
}
```

Time period:
```
{
    "<quarter_id>": {
        "number_of_projects": "<number>",
        "number_of_members": "<number>",
        "project_distribution": {
            "iOS": "<number>",
            "web app": "<number>",
            "writing": "<number>",
            ...
        }
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

## What are the requirements for this project?

Watchdog is currently split into two individual projects. Both require authentication
as the data is privacy sensitive, so Firebase experience for authentication and data
storage would be useful. Both projects would utilize Python for data fetching and
processing portions and use React on the frontend to display the visualization
and handle user interactions. 

The first project with project member applications and projects would use the [gspread API](https://docs.gspread.org/en/latest/user-guide.html)
to obtain the data from the spreadsheets and parse through/organize the necessary
statistics. Then, the post-processed organized data would be stored into Firebase,
where we would use [React-Vis](https://uber.github.io/react-vis/) to display the data
and come up with concrete conclusions and inferences.

The second project with data monitoring would use the [Facebook API](https://developers.facebook.com/docs/graph-api/reference/page/) and the [Instagram API](https://developers.facebook.com/docs/instagram-api/)
to obtain the neccesary datapoints. We would need to map each post and advertisement
run to a  specific event hosted by Creative Labs and quantify the effect or correlation.
The continuation of this monitoring for the main website would require integration with
the implementation of the site in the future.

We would then be able to launch both web apps through Netlify.

## What are we launching today?

The most important part of this project is allowing board members to easily access
more internal data and its visualization. A barebones version would be successfully
creating a web app that allows users to authenticate themselves and see a general
overview of the project data. The first main add on to this version would be an
interface that allows the user to select a certain time frame to view, or other
various options such as looking solely at iOS or game development projects and their
statistics. The second main addition to the barebones version would be a monitoring
platform for both Creative Labs social media interactions and main website traffic.

## FAQ

> Working backwards, what are some questions a user, developer, designer, marketer
> have regarding the project? Answering these questions ahead of time will make
> the development process smoother and better for everyone involved.

## Appendix

The original Watchdog project can be found [here](https://github.com/UCLA-Creative-Labs/watchdog/).
