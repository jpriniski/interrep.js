import type { MerkleTreeNode, MerkleTreeZero } from "./MerkleTree.model"
import type { Group, MerkleTreeNodeDocument, MerkleTreeZeroDocument } from "./MerkleTree.types"

export async function findByGroupAndLevelAndIndex(
    this: typeof MerkleTreeNode,
    group: Group,
    level: number,
    index: number
): Promise<MerkleTreeNodeDocument | null> {
    return this.findOne({ group, level, index }).populate("parent")
}

export async function findByGroupAndHash(
    this: typeof MerkleTreeNode,
    group: Group,
    hash: string
): Promise<MerkleTreeNodeDocument | null> {
    return this.findOne({ group, hash }).populate("parent")
}

export async function findByGroupProviderAndHash(
    this: typeof MerkleTreeNode,
    groupProvider: string,
    hash: string
): Promise<MerkleTreeNodeDocument | null> {
    return this.findOne({ "group.provider": groupProvider, hash }).populate("parent")
}

export async function getGroupNamesByProvider(this: typeof MerkleTreeNode, provider: string): Promise<string[]> {
    return this.distinct("group.name", { "group.provider": provider })
}

export async function getNumberOfNodes(this: typeof MerkleTreeNode, group: Group, level: number): Promise<number> {
    return this.countDocuments({ group, level })
}

export async function findZeroes(this: typeof MerkleTreeZero): Promise<MerkleTreeZeroDocument[] | null> {
    return this.find()
}