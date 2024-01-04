import { defineStore } from 'pinia'
import { Octokit } from '@octokit/rest'
import type { components as octokitComponents } from '@octokit/openapi-types'

export type Commit = octokitComponents['schemas']['commit']

export type State = {
    latest: Commit | null
    commits: Commit[]
    isLoading: boolean
}

const repo = 'MyCharacterList'
const owner = 'ayan0312'
const octokit = new Octokit()

export const useCommitsStore = defineStore('commits', {
    state: (): State => ({
        latest: null,
        commits: [] as Commit[],
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
