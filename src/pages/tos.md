# Terms of Service

_Last updated: 6th March 2023_

First of all, thank you for using Gimlet! Bellow you can read the terms in which you can use it. It protects both you and the service, so we can enjoy a long time together.

When I say “Company”, “we”, “our”, or “us” in this document, I'm referring to LASZLO CONSULTING Kft, Vaci ut 22-24. 3. em. 1132 Budapest Hungary Tax no.: HU26534769

When I say “Service”, I mean Gimlet delivered on https://$instance.gimlet.io, where $instance is your Gimlet instance hosted by us.

I may update these Terms of Service in the future. Whenever I make a significant change to the policies, I will announce it on Twitter and on the Gimlet blog.

When you use the Service, now or in the future, you are agreeing to the latest Terms of Service. These terms do contain a limitation of our liability.

If you violate of any of the terms, we may terminate your account.

## Account Terms

- You are responsible for maintaining the security of your account and password. The Company cannot and will not be liable for any loss or damage from your failure to comply with this security obligation. We recommend users set up two-factor authentication in Github/Gitlab for added security. In some of our Services, we may require it.
- You must be a human. Accounts registered by “bots” or other automated methods are not permitted.
- You can close your account at any time by emailing us (laszlo@gimlet.io). We will delete your data immediately upon request.
- If the Service ceases operation, all your data remains available in your Github/Gitlab repositories. Everything remains operational, but you will lose the convenience that Gimlet provides in managing them.
- You must not abuse the Service by knowingly posting malicious code, or links to malicious sites, that could harm other users. If you find a security or privacy bug, we ask that you report it to us right away on laszlo@gimlet.io

## Uptime, Security, and Privacy

- Your use of the Service is at your sole risk. We provide the Service on an “as is” and “as available” basis. We do not offer service-level agreement for the Service, but do take uptime seriously. After all, this service is about infrastructure, you judge the credibility of the service by its uptime.
- We reserve the right to temporarily disable your account if your usage significantly exceeds the average usage of other customers of the Service. We will reach out to you before taking any action except in rare cases where the level of use may negatively impact the performance of the Service for other customers.
- We take many measures to protect and secure your data through backups, redundancies, and encryption. We enforce encryption for data both in transmission and at rest.
- If there is a significant outage, you will receive a full explanation of the circumstances and what measures will be taken to prevent a recurrence.

## Data we need access to and store

- Gimlet requires you to create a Github Application. All Gimlet access is granted through this Github Application. With Github's fine-grained access granting options, when you install (and later configure) this Github Application to your Github Organization, **you can set which repositories Gimlet gets access to**. This can be just a single repository, many, or all of your repositories.
  Gimlet gets the following OAuth scopes through this Github Application to the selected list of Github repositories:

  - Read/Write access on Repository Administration. Gimlet uses this access to bootstrap gitops environments and create repositories for them.
  - Read only access on Repository Checks
  - Read/Write access on Repository Contents. Gimlet uses this access to write your gitops repositories, and make changes to your Gimlet environment files in the .gimlet folder of your application source code repositories. Gimlet stores commit hashes, timestamps, statuses and messages in its database to speed up rendering and track gitops state.
  - Read/Write access on Repository Pull requests. Gimlet uses this access to make changes to your Gimlet environment files in the .gimlet folder of your application source code repositories.
  - Read/Write access on Repository Webhooks.
  - Read only access on Organization Members. Gimlet uses this access to verify your organization membership upon authentication and authorization.

- The Service requires personal / group access token on your Gitlab account. Gimlet uses this token to perform the operations that are listed under the Github access section.

- The Service stores cookies in your browser for authentication purposes.
- The Service stores your email address and we use it to contact you in relation with your usage of the Service. We also subscribe you to a stream of occasional product updates. You can unsubscribe from these within every email we send.
- The Service uses a third-party, posthog.com to provide in-product analytics and to help us better understand product usage. Posthog.com is GDPR compliant and they store data in their EU cloud in Frankfurt.

## Features and Bugs

- We design the Services with care, however there is no such thing as a service that pleases everybody. We make no guarantees that our Services will meet your specific requirements or expectations.

- We also test all features extensively before shipping them. As with any software, the Service inevitably have some bugs. We track the bugs reported and work through priority ones, especially any related to security or privacy. Not all reported bugs will get fixed and We don’t guarantee completely error-free Service.
