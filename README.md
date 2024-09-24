# DEV-Challenge-XXI-Frontend-Online-Round-

 Description

Ministry of Foreign Affairs of Ukraine (MFA of Ukraine) is a central executive body whose activities are directed and coordinated by the Cabinet of Ministers of Ukraine. The MFA of Ukraine is the main body in the system of central executive authorities in formulating and ensuring the implementation of the state policy in the field of foreign relations of Ukraine.

Your task. 
Development of a web or desktop tool that will allow users with minimal technical skills to quickly and easily visualize various types of data. The product should provide the ability to upload data (tables, CSV, Excel, JSON files, and manual data entry into a field), select the type of visualization (graphs, charts, tables, etc.), and configure the main visualization parameters (colors, axes, titles) through an intuitive interface.
The tool should be as easy to use as possible, without the need for deep technical knowledge. The product should be adaptive to different screens and have integrations or the ability to export data to common formats (PDF, PNG, SVG) and print to a printer.
Files with test data are available at the link.



Basic functional requirements

1. Interface:

    Create a simple, intuitive user interface.
    The visual style should be based on the MFA website: https://mfa.gov.ua/
    Provide a clear structure where users can quickly find the options they need (uploading files, choosing a graph type, settings).
    A detailed description of the interface elements is given below


2. Data upload:

    The tool should support uploading data in CSV, Excel, JSON formats, manual data entry into the input field.
    Support for drag and drop of files.
    Ability to preview the uploaded data in a tabular format before building a visualization.
    Resistance to errors and unforeseen situations (incorrect data, empty files, etc.).
    Test data can be found at the link.


3. Selecting the type of visualization:

    The tool should provide the ability to create at least 3 types of visualizations: line graph, bar chart, pie chart.
    Add a simple mechanism for selecting the type of visualization (e.g. drop-down menu or buttons).
    HTML, SVG, and CANVAS can be used to display graphs.


4. Customize charts:

    Provide users with the ability to customize basic graph settings: colors, axis names, titles, line styles.
    The interface for changing the color palette of the graph should be interactive and user-friendly (e.g. color selection through a palette).
    The graph should be able to be animated.
    Graph scales should be calculated using extreme values.
    The legend should be placed inside the graph, but not interfere with the main data.


5. Adaptability:

    The application should work correctly on all devices: desktops, tablets, and mobile phones. Ensure smooth adaptation of the interface to different screens.


6. Export of visualizations:

    Implement the ability to export ready-made visualizations to PNG, PDF, and SVG formats.
    Add functionality to save charts as separate images (download button).
    Print to printer (print only the graph, without the interface and unnecessary elements).


7. Documentation/Interactive tips:

    Add short interactive instructions or tips to help users understand how to use the tool.


8. Application performance.

    The speed of loading and processing large amounts of data.
    The application works without delays. 
    Smooth animations.




Basic interface requirements

    Main Section.
    a. Header:
      • The name of the instrument.
      • Icon for settings or switching the theme (light/dark).
    b. File Upload Area:
      • Create a large area with the text ‘Drag & Drop area’.
      • Add a ‘Choose File’ button for those who don't use the drag and drop feature.
      • Support for file formats (CSV, Excel, JSON) should be indicated below the upload area.
      • Field for manual data entry
    c. Chart Type Selection:
      • Add a drop-down menu or buttons to select the type of visualization: line chart, bar chart, pie chart.
    d. Generate Chart Button:
      • The Generate Chart Button should be highlighted and located next to the file upload options.

    Visualization Section.
    a. Chart Area:
      • The central part of the screen is reserved for displaying the chart.
      • The chart should occupy the maximum space on the screen so that the user can see it clearly.
    b. Customization Panel:
      • The panel should allow you to configure the following parameters:
        1) Graph title.
        2) Captions for the X and Y axes.
        3) Selecting colors for graph elements (using the color palette).
      • Select the line style (for line graphs) or column thickness (for bar graphs).
    c. Reset button to reload the files.

    Export Section.
    a. Export Buttons:
      • Add buttons to export your visualization in PNG, PDF, SVG formats.
      • Print button - print the graph on the printer. 
       1) Important: the cmd (Ctrl) + p combination should also print the adapted page.
      • The buttons should be available after the graph is generated.

    Responsiveness.
    a. Mobile version:
      • The interface should adapt to the screen of mobile devices (the settings menu and chart types can be hidden behind the hamburger button or at your discretion). Charts should scroll horizontally if the screen width is not enough
    b. Tablet:
      • The interface should work as well on tablets as it does on desktops, with the ability to use touch elements.

    Documentation or Tooltips.
    a. Include interactive tooltips or a quick start guide on the home screen so that users can quickly find their way around.

    Additional.
    a. Three-dimensional graph
      • The user can display data in 3-dimensional space
    b. Dark/Light Theme
      • Add the ability to switch between light and dark themes. Use modern approaches to contrast to ensure that the interface remains comfortable in dark lighting conditions.
    c. Interactive Elements
      • Graphs should be interactive: add the ability to zoom in/out and navigate.
      • Tooltips for each visualization element should appear when hovering over parts of the graph.




Additional tasks (bonus points)

1. 3d graph. Ability to build a three-dimensional graph.

2. Interactivity of graphs:

    Implement zooming and navigation on graphs (zoom in/out, drag to pan).
    Add the ability to filter data directly on the graph (e.g., filtering by specific categories).


3. Dark/light theme:

    Implement the ability to switch between a dark and a light interface theme.


4. Web accessibility – compliance with WCAG standards.



Colours and other UI elements

    Primary Colors
    a. Primary Blue: it is the main colour that symbolises formality and authority.
    HEX: #003366
    RGB: (0, 51, 102)
    b. Secondary Blue: for accents and background elements.
    HEX: #0056A2
    RGB: (0, 86, 162)
    c. White: used for backgrounds and text on dark backgrounds.
    HEX: #FFFFFF
    RGB: (255, 255, 255)
    d. Gray for Backgrounds: it is used as a background for secondary elements, text entry areas, etc.
    HEX: #F1F1F1
    RGB: (241, 241, 241)
    e. Black: for the main text.
    HEX: #000000
    RGB: (0, 0, 0)

    Accent Colors
    a. Golden Accent: for accents and decorative elements.
    HEX: #FFD700
    RGB: (255, 215, 0)
    b. Error Red: for reporting errors or critical items.
    HEX: #D32F2F
    RGB: (211, 47, 47)

    Typography
    a. Font: Use classic sans-serif fonts such as Arial, Roboto, or Open Sans that are easy to read and match the official style.
    b. Headings:
    Font Size: 24px, Bold
    Line Height: 32px
    Color: #003366 (Primary Blue)
    c. Body Text:
    Font Size: 16px, Regular
    Line Height: 24px
    Color: #000000 (Black)
    d. Labels and Small Text:
    Font Size: 12px, Regular
    Line Height: 16px
    Color: #0056A2 (Secondary Blue)

    Button Style
    a. Primary Button:
    Background Color: #003366 (Primary Blue)
    Text Color: #FFFFFF (White)
    Border Radius: 0
    Padding: 12px 24px
    Hover: Slightly darker blue, for example, #00284D
    b. Secondary Button:
    Background Color: #FFD700 (Golden Accent)
    Text Color: #000000 (Black)
    Border Radius: 0
    Padding: 12px 24px
    Hover: Slightly darker Golden Accent
    c. Error Button:
    Background Color: #D32F2F (Error Red)
    Text Color: #FFFFFF (White)
    Hover: Slightly darker Error Red

    Chart Style
    a. You can choose from the following color palettes, or those of your choice b. Palette 1 (Inspired by MFA color scheme):
    HEX: #003366, RGB: (0, 51, 102)
    HEX: #0056A2, RGB: (0, 86, 162)
    HEX: #FFD700, RGB: (255, 215, 0)
    HEX: #F1F1F1, RGB: (241, 241, 241)
    HEX: #D32F2F, RGB: (211, 47, 47)

    c. Palette 2 (Classic contrasting colors):
    HEX: #1F77B4, RGB: (31, 119, 180)
    HEX: #FF7F0E, RGB: (255, 127, 14)
    HEX: #2CA02C, RGB: (44, 160, 44)
    HEX: #D62728, RGB: (214, 39, 40)
    HEX: #9467BD, RGB: (148, 103, 189)

    d. Palette 3 (Balanced cool and warm tones):
    HEX: #4E79A7, RGB: (78, 121, 167)
    HEX: #F28E2B, RGB: (242, 142, 43)
    HEX: #E15759, RGB: (225, 87, 89)
    HEX: #76B7B2, RGB: (118, 183, 178)
    HEX: #59A14F, RGB: (89, 161, 79)

    e. Palette 4 (Vibrant and modern):
    HEX: #8E44AD, RGB: (142, 68, 173)
    HEX: #3498DB, RGB: (52, 152, 219)
    HEX: #E74C3C, RGB: (231, 76, 60)
    HEX: #F1C40F, RGB: (241, 196, 15)
    HEX: #2ECC71, RGB: (46, 204, 113)

    f. Palette 5 (Bold and dynamic colors):
    HEX: #6A4C93, RGB: (106, 76, 147)
    HEX: #1982C4, RGB: (25, 130, 196)
    HEX: #8AC926, RGB: (138, 201, 38)
    HEX: #FFCA3A, RGB: (255, 202, 58)
    HEX: #FF595E, RGB: (255, 89, 94)

    Icons and Visual Elements
    a. Icons can only be used from the Material Icons library.
    b. Use icons only where necessary to maintain a clean and simple interface.

    Dark Mode
    a. Background: #121212 (Dark Gray).
    b. Text: #FFFFFF (White).
    c. Buttons: Blue or gold for the main elements on a dark background.




Format of results presentation

    Download the decision on the platform in one file archive with the name in the format FileName.zip.
    The solution should include project source files that are ready to build and a pre-built version of the project that can be run using a simple web server and browser (for example, npx http-server) or just a browser.


☝️ Please note that the name of the archive and file names inside the archive should not contain your first or last name. The size of the solution archive should not exceed 10 MB.

The Organizers and Judges reserve the right to disqualify the Participant's work if the work:

    Contains any reference to the Participant's name, surname, e-mail address, company, address, or other personal data;
    Completed in a different format than specified in the task;
    Performed with the help of third parties, and not by the Participant personally.




Submission Deadline

October 3, at 00:00 (GMT+3) — after the time runs out, the possibility of uploading works to the platform will be automatically blocked. The participants who have moved on to the Final will be announced on October 14, 2023.
☝️ Set your time zone in the settings on the DEV Challenge platform to more conveniently track the time of the deadline.



Evaluation Criteria

    The use of ready-made libraries, CSS/JS frameworks is prohibited, only pure HTML/CSS/JS. TypeScript is not allowed.
    Icons can only be used from the Material Icons library.
    Cross-browser is not a criterion. Entries will be checked in the latest version of Google Chrome.


Technical assessment
1. Usability (UI/UX) — 16 points.
2. Three format support — 16 points.
3. Chart animations — 8 points.
4. Drag-n-drop support — 8 points.
5. Data preview — 16 points.
6. Data/file errors handling — 16 points.
7. Data visualization works correct — 32 points.
8. Chart settings (colors, axis names legend) — 32 points.
9. Responsive (mobile design) — 8 points.
10. Export to PNG, SVG, PDF — 32 points.
11. Print chart — 16 points.
12. Documentation/instructions — 8 points.
13. Performance — 16 points.
Expert assessment
14. Code quality — 32 points.
Bonus points
15. 3d chart — 32 points.
16. Chart interactions (zoom, zoom in/out, drag to pan, data filtering) — 32 points.
17. Light/dark theme — 32 points.
18. Web Accessibility — 32 points.

☝️ Participants in the Frontend nomination will be divided into Hard and Lite levels in the Final.



Contacts

Questions and clarifications regarding the content of tasks:
Slack channel: #nomination-frontend. 
☝️ Judges will ignore questions that do not relate to the tasks of the Championship.

Organizational questions: 
Contact us via e-mail at hello@devchallenge.it or Slack channel #02-ask-the-organizers.
