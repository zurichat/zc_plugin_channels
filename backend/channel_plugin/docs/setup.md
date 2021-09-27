
This is for if you wish to see the formatted version of the documentation, built using [Docusaurus](https://docusaurus.io/).

1. Install swagger-markdown

    GitHub [here](https://github.com/syroegkin/swagger-markdown).

2. Install and start docusaurus

    Quick docs [here](https://docusaurus.io/docs#fast-track).

    i. Create the web-docs folder in this folder, using:

        npx @docusaurus/init@latest init web-docs classic

    ii. Start the server

        cd web-docs
        npx docusaurus start

3. The backend server should have been running on `:8000`. Refresh when changes are made

        python refresh.py