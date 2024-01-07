import { defineStore } from 'pinia'
import { Octokit } from '@octokit/rest'
import type { components as octokitComponents } from '@octokit/openapi-types'

export type Commit = octokitComponents['schemas']['commit']

export type State = {
    /**
     * The latest commit.
     */
    latest: Commit | null
    /**
     * The commits.
     */
    commits: Commit[]
    /**
     * Whether the commits are being loaded.
     */
    isLoading: boolean
}

const repo = 'MyCharacterList'
const owner = 'ayan0312'
const octokit = new Octokit()

export const useCommitsStore = defineStore('commits', {
    state: (): State => ({
        latest: null,
        commits: [],
        isLoading: false
    }),
    actions: {
        async fetch() {
            this.isLoading = true
            try {
                const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
                    repo,
                    owner
                })

                this.latest = response.data[0]
                this.commits = response.data
            } catch (error) {
                console.error('Error fetching commits:', error)
            }
            this.isLoading = false
        }
    }
})
