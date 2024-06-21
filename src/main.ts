import * as core from '@actions/core'
import { EnvObject } from './types'
import { getFileEntries } from './readFile'
import { exportVariables } from './exportVars'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const filePath: string = core.getInput('filePath')
    const mask: boolean = core.getBooleanInput('mask')
    const removeQuotes: boolean = core.getBooleanInput('removeQuotes')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`filePath: ${filePath}`)
    core.debug(`mask: ${mask}`)
    core.debug(`mask: ${removeQuotes}`)

    const entries: EnvObject = await getFileEntries(filePath)
    exportVariables(entries, mask, removeQuotes)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
