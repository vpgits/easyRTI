This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This is done by volunteers, so always looking for help. Currently temporarily hosted on Vercel free because no finances for a full deployment. Eventually will go into being a full app on its own domain. You can <a href="https://www.patreon.com/bePatron?u=49713840" data-patreon-widget-type="become-patron-button">become a Patron</a> to help me do more of these, because then I don't have to go out and do a 'real job.'

This is a web application that allows users to generate Right to Information (RTI) requests in multiple languages (Sinhala, Tamil, and English). Users [in the complete final version] can select an institution [from a list], choose a template, and generate a PDF of their request. I don't know how to code, so I have used generative AI to put this together. I still need a tonne of help, so let me know if you can help with (UI is a first to make it look less fugly).

Any edits with GAI as comments are edits that I made through generative AI, so would definitely need having looked-at by humans because I don't know coding at all. This initially started as a simple generator, and it sill mostly is. But now there is a fuller plan so future expansion can be kept in mind when developing.

## Revised Roadmap 14/Dec/2024

This is the revised, somewhat feature-creeped, roadmap.

(At the beginning) Users will get to to pick,

- Name
- Postal Address
- Email Address
- Telephone Number
- If information needs to be saved (implementation of OpenAuth)

Users can select
- If the information request related to an immediate threat to life (adds a line if so)
- Proactively to ask for private information to be redacted (adds a line if so)
- Refer (a) case(s) (users pick from drop-down, and app pulls case reference from a list)

(The draft PDF)

- Chooses from type, subtype1, subtype2, subtype3

- [date]
- [paaddress]

- [body]+additions from first page.

- [contact details of requestor]

This contains reset and generate links. Reset clears all fields, generate creates the PDF file.
Once PDF is clreated, users can either download the PDF file or email it (:mailto can take attachments right?)

Users get to download a calendar appointment file to add to their calendars to help rememeber deadline.

## Backend

- initially draw from a worksheet
- new addresses go into a holding file that will be merged to the main list

## Future versions

- Generative AI assist to ensure RTI request is clear and correct (sooner the better)
- will have appeal tools to Designated Officer and RTI Commission
- Timekeeping with reminder emails

## Strcture for Addresses

- National
  Special Spending Units
  Government Departments
  Ministries
  Independent Commissions
- State Owned Enterprises
  Provincial (has the nine)
    Provincial Councils
    Provincial Ministries
- District (has the twenty-five)
    District Secretariats
- Pradeshiya Sabha (has the full list)
    Full list
- Urban/Municipal Councils (has the ful list)
    Full list
- Police Stations
  Provincial
    District
      Division
        List
Schools
  Provincial
    District
      List
Hospitals
    Provincial
      District
        List

## Original Roadmap

- Multi-language support [Mostly done]
- UI needs disclaimers about data not being recorded. [Needs to be done]
- Non-fugly dark-mode UI [Needs to be done]
- Searchable institution list [Working on it]
-   Database and backend
-    Using Google Maps API [Idea]
-    User registration for collab support [Parked]
- Template selection for requests [Low priority]
- PDF generation [Parked]
- Email functionality [Parked]
- Generative AI assistance for request generation [Parked]
