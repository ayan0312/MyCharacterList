export class HuffmanNode<T = any> {
    value: T | null = null
    frequency: number
    left: HuffmanNode | null = null
    right: HuffmanNode | null = null
    parent: HuffmanNode | null = null

    constructor(frequency: number, value?: T) {
        this.frequency = frequency
        if (value) this.value = value
    }

    isLeafNode(): boolean {
        return !this.left && !this.right
    }
}

export function buildHuffmanTree<T = any>(characters: T[], frequencies: number[]) {
    const nodes: HuffmanNode<T>[] = []
    for (let i = 0; i < characters.length; i++) {
        const node = new HuffmanNode<T>(frequencies[i], characters[i])
        nodes.push(node)
    }
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.frequency - b.frequency)
        const left = nodes.shift()!
        const right = nodes.shift()!
        const mergedNode = new HuffmanNode<T>(left.frequency + right.frequency)
        mergedNode.left = left
        mergedNode.right = right
        left.parent = mergedNode
        right.parent = mergedNode
        nodes.push(mergedNode)
    }
    return nodes[0]
}
