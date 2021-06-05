# Creative Labs RFCs

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)
[![Mergify Status][mergify-status]][mergify]

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/UCLA-Creative-Labs/project&style=flat

This repository is a place to propose and track and new internal projects or
changes to existing internal projects under [Creative Labs at UCLA].

This project adheres to the Contributor Covenant [code of conduct]. By
participating, you are expected to uphold this code. Please report unacceptable
behavior to uclacreatives@gmail.com.

[Creative Labs at UCLA]: https://creativelabsucla.com/
[code of conduct]: CODE_OF_CONDUCT.md

**Jump to:** [What is an RFC?](#what-is-an-rfc) | [RFC Process](#rfc-process)

<!--BEGIN_TABLE-->
<!--END_TABLE-->

## What is an RFC?

An RFC, or _request for comments_, is a document that details a proposed change
to an internal project or an entirely new one (such as a web app, tooling,
etc.)
It also serves as a means of reviewing these proposals, discussing them, and
tracking their implementation.

## RFC Process

1. Create a tracking issue for the proposed internal project, if it doesn't already exist.
2. 
    * If you _are_ a member of Creative Labs' board, open a new branch.
    * If you _are not_ a member of Creative Labs' board, fork this repository.
3. Copy `0000-template.md` to `text/<rfc#>-<my-proposal>.md`, where `<rfc#>` is the tracking issue number and `<my-proposal>` is the RFC title.
4. Fill in the RFC. Please be as detailed as possible!
5. Submit a **pull request** with the title `RFC: <rfc#> <title>` where `<rfc#>` is the tracking issue number and `<title>` is the name of your proposal. Then members of our team will review your RFC and offer comments and feedback. Be prepared to discuss your proposal and make changes to it if necessary.
6. Update your tracking issue with a link to the RFC PR.
7. After reviewing your RFC, we may either **reject** it, in which case the PR and issue will be close by a member of our team, or we may **accept** it, in which case the PR will be merged with the main repository.
8. If your RFC is approved, at some point we'll start implementing it.
9. Once it's implemented, the RFC's issue will be closed and it will be marked as 'done'. Congratulations! You made it.

## License

[MIT](LICENSE.md)
