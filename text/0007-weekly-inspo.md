---
rfc pr: https://github.com/UCLA-Creative-Labs/cl-rfcs/pull/11
tracking issue: https://github.com/UCLA-Creative-Labs/cl-rfcs/issues/7
---

# xplr

`xplr` is a repository dedicated to tracking the concepts, blog posts, and ideas
that inspire the Creative Labs dev team.

## Blurb

`xplr` will act as a central hub for all of our inspiration. Every week, members of 
the dev team will make a pull request to the `xplr` repository containing something 
that inspired them. Their inspiration can be anything from a cool CSS property, an 
interesting design, quirky libraries, or exciting frameworks. During our dev meeting, 
we will talk about the stuff we found and at the end of the discussion, update a 
`CHANGE_LOG` to keep a weekly timeline of the inspo we added.

The pull request will be in the form of a markdown file that contains a description of 
the inspo, why they think it's interesting, and how we could potentially use it in the 
future. The file must also include metadata to help tag and catalog who the inspo came 
from and what category the inspo belongs to.

All these markdown files will accumulate into a blog site that is easily accessible to
anyone outside of the dev team to read. The site will be searchable, filterable, and 
creatively designed to show off our inspo in an unique fashion.

Ultimately, the purpose of `xplr` is to constantly expose our dev team to the greater 
world of dev and to familarize everyone with documentation, the PR process, and 
exploration.

## Why are we doing this?

One of the things that we really stress at Creative Labs is having taste and 
inspiration. Inspo is a big part of creativity and allows us to create better work. 
Although inspo is usually something that is associated with the design side, exposing 
ourselves to different dev concepts would make us better developers and empower us to 
challenge our designers to make even more creative work.

## What is the high level design/implementation?

`xplr` can be built in an entirely self-contained environment. `xplr` will be built
as a `Next.js` application that will be deployed to Netlify. There isn't a need for
any servers as `Next.js` comes with an `api` that Netlify will deploy as a AWS function
for us.

### Organization

The `xplr` repository will have a standard `Next.js` structure. On top of the standard
configuration, we will also need to have a `_posts` and `_team` directory to keep 
track of each inspo post and each team member. See [Appendix](#organization-(expanded))
for more details on organization.

### Verification

In order to reduce the chance of introducing bugs into our application. We will need
to write some custom linters to test the efficacy of the our posts.

**Posts Linter**

* Check that the author exists in the team
* `title` is identical to the title of the article
* `slug` is identical to file name
* Check that `tag` is delimited white spaces and is an available tag in the'
  `_posts/tags.yml` file

**Team Members Linter**

* Check if `name` is capitalized
* Check that the file name is the `name` but in `kebab-case`

**Markdown Linter**

* Make sure all markdown files are only 80 characters long
* Warnings for spelling would be a nice to have
* Hopefully we can find a linter out there for this already

### Search

We can accomplish search using `Next.js` built in API system. Here is an [example](https://medium.com/@matswainson/building-a-search-component-for-your-next-js-markdown-blog-9e75e0e7d210https://medium.com/@matswainson/building-a-search-component-for-your-next-js-markdown-blog-9e75e0e7d210)
search system using `Next.js`.

### Change Log

It would be nice to keep track of a `CHANGE_LOG` to see the week by week updates that
happen to the respository. The functionality for this is mostly internal, and can serve
as a method to expose newer board members to industry practices! We would most likely 
have a `GitHub` action that runs at the time of dev team meeting each week, that would
automatically create a pull request to update the `CHANGE_LOG`.

## What are the requirements for this project?

`xplr` will require developing in `Next.js`, writing GitHub Actions, building linters, 
and deploying to Netlify. Ideally, `xplr` would be built across the CL dev team, but 
realistically a single person should be able to build out most of the functionality.

TLDR;
* Learning the `Next.js` framework
* Learning how to build a linter through `JavaScript`
* Learning how to utilize GitHub Actions

## What are we launching today?

The entirety of this project seems pretty simple and shouldn't take too long to 
develop. Future iterations can add custom metadata through the `gray-matter` of
posts to add images to the metadata and improve SEO. However, everything I laid
out in the blurb is reasonally achievable.

## FAQ

### How long should posts be?

Inspo posts **should not** take excessive time to write and find. Exploration should
be fun and hopefully this weekly task doesn't feel like a chore. Finding inspo and
writing about it should take around 30 minutes. Writing concise documentation is a big
part of developing and hopefully through this activity, our team will come to 
appreciate documentation.

### When would we start this program?

Ideally, some time before Fall quarter to work out any kinks. Let's tentatively say 
middle of September.

### Would this program be utilized across all of Creative Labs?

I think it would be nice for everyone on CL to look for inspiration on a daily basis.
As the future tech director, I only have jurisdiction with my own team. But I would be
willing to open this up to other teams to use as well.

For example:
* Design can list all the art/styles/sites that they come across
* Marketing can list all the concepts/articles/excerpts they read

**Note:** If we are to extend `xplr` to encompass all of CL in the future, it should
have another RFC to explain the expansion and the reorganization of the respository.

### What would the general workflow for a dev team member look like?

1. Before the dev team meeting, each member will find something that inspires them and
write a post about it. 
2. Then the member will make a pull request to `xplr` and the pull request will be
randomly assigned to a member on the dev team to review. **This pull request must be
made at least 24 hours before dev meeting.**
3. The reviewer will then review the pull request by proofreading it and ensuring
that the post is written with clarity.

## Appendix

### Organization (expanded)

Below is the high level structure of the repository.

```
root
├── _posts/
│   ├── [title-of-post].md
│   └── ...
├── _team/
│   ├── [bryan-pan].md
│   └── ...
├── components/
│   ├── Layout.tsx
│   └── ...
├── pages/
│   ├── api/
│   │   └── search.ts
│   ├── team/
│   │   ├── index.tsx
│   │   └── [person].tsx
│   ├── posts/
│   │   ├── index.tsx
│   │   └── [slug].tsx
│   ├── _app.tsx
|   └── index.tsx
├── public/
│   └── ...
├── utils/
│   └── ...
├── styles/
│   └── ...
└── ...
```

#### Posts

All posts go inside the `_posts/` directory. Posts must be named in 
`kebab-case`. To see an example post check out [this section](#example-post)
of the Appendix.

#### Team

All team member info go inside the `_team/` directory. Files must be named in 
`kebab-case`. To see an example team member file check out
[this section](#example-team-member) of the Appendix.

#### Components

All reusuable components go inside the `components/` directory.

Notable components:
- `Layout.tsx`: The `Layout` component houses the layout for each page. Every page
must use the `Layout` component

#### Pages

All pages are registered in the `pages/` directory.

Notable pages:
- `team/`: This directory is dedicated to highlighting our team
  - `index.tsx`: A list of our amazing team!
  - `[person].tsx`: A dynamic route for each team member and holds all the posts 
  that team member made to the repository
- `posts/`: This directory is dedicated to hosting the individual posts themselves
  - `index.tsx`: A list of all of our recent posts, with the ability to filter and 
  search
  - `[slug].tsx`: A dynamic route for the post itself
- `index.tsx`: This component is the root route (i.e. `/`). This route will have a
nice splash page for people coming on the site with a search bar. It will also feature
a short description of the site, inspo posts, and team members.

#### Public

All assets are registered in the `public/` directory.

#### Utils

All utility functions are registered in the `utils/` directory.

### Example: Post

Below is an example post for `xplr`. We will utilize [`gray-matter`](https://github.com/jonschlinkert/gray-matter) to hold our metadata.

Notice that:
- `slug` is the url path of the post and is **identical** to the file name (this will 
help) against duplicate path names as we cannot have **identical** file names
- `title` is **identical** to the post title

File: `_posts/next-js.md`

```md
---
title: Next.js: The future of JavaScript Frameworks
description: Next.js is a powerful JavaScript framework that takes everything we already love about React and brings it up to eleven.
author: Bryan Pan
tags: javascript web-dev tooling
slug: next-js
---

# Next.js: The Future of JavaScript Frameworks

Intro text blah blah...

## Why is Next.js interesting?

It's great...

## How can we use Next.js?

Everything...

## Resources and Examples

- [2021 deds site](https://tinycl.com/deds)
```

### Example: Team Member

Below is an example team member for `xplr`. We will utilize [`gray-matter`](https://github.com/jonschlinkert/gray-matter) to hold our metadata.

Notice that:
- `name` must be capitalized and **identical** to `author` metadata on a post and the file
name is the `name` but in `kebab-case`

File: `_team/bryan-pan.md`

```md
---
name: Bryan Pan
year: 2022
major: Computer Science
---

[!A beautiful image of Bryan Pan](_team/assets/bryan-pan.png)

# Bryan Pan

Little blurb about me and what I like...
```
