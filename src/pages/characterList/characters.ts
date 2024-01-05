import { getCharshipsByCharId } from 'src/apis/charship'
import { ref } from 'vue'

export function useCharshipPreviews(charId: number) {
    const relations = ref([])

    getCharshipsByCharId(charId, 'preview').then((res: any) => {
        if (!res.success) return
        const rows = res.result.rows
        relations.value = rows
            .map((row: any) => {
                row.characters.forEach((char: any) => {
                    char.title = char.name
                    char.name = `${row.relationship}`
                })
                return row.characters
            })
            .flat()
            .splice(0, 4)
    })

    return { relations }
}
