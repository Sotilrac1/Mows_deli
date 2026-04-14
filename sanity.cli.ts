/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: { projectId: 'sy7cap7p', dataset: 'production' },
  deployment: {
    appId: 'mdd19s7wo73x9j11ofqy1juy',
  },
})
