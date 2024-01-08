export class HuffmanNode<T = any> {
    public readonly value?: T
    public readonly frequency: number

    public left?: HuffmanNode
    public right?: HuffmanNode
    public parent?: HuffmanNode

    constructor(frequency: number, value?: T) {
        this.value = value
        this.frequency = frequency
    }

    public isLeafNode(): boolean {
        return !this.left && !this.right
    }
}

/**
 * Build a Huffman tree from a list of characters and their frequencies.
 * @param characters The list of characters
 * @param frequencies The frequencies of the characters. If not provided, all characters are assumed to have the same frequency
 * @returns The root node of the Huffman tree
 */
export function buildHuffmanTree<T>(characters: T[], frequencies?: number[]) {
    const nodes: HuffmanNode<T>[] = []
    for (let i = 0; i < characters.length; i++) {
        const node = new HuffmanNode<T>(frequencies ? frequencies[i] : 1, characters[i])
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

/**
 * Traverse a Huffman tree in level order.
 * @param root The root node of the Huffman tree
 * @param callback The first argument is the list of nodes on the level, the second argument is the level number
 */
export function levelOrderTraversal<T>(
    root?: HuffmanNode<T>,
    callback?: (levelNodes: HuffmanNode<T>[], level: number) => void
) {
    if (!root) return
    const queue: HuffmanNode<T>[] = [root]
    while (queue.length > 0) {
        let level = 0
        const levelSize = queue.length
        const levelNodes: HuffmanNode<T>[] = []
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift()!
            levelNodes.push(currentNode)
            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        callback && callback(levelNodes, ++level)
    }
}
