import { ZkIdentity, Strategy } from "@libsem/identity"
import checkParameter from "./checkParameter"

/**
 * Create an InterRep identity by deriving it from a signed message.
 * The signed message should contain an InterRep provider and a nonce.
 * @param sign The function to sign the message.
 * @param provider The InterRep provider of the message (e.g. twitter).
 * @param nonce The nonce of the message.
 * @returns A Semaphore identity class.
 */
export default async function createIdentity(
    sign: (message: string) => Promise<string>,
    provider: string,
    nonce = 0
): Promise<ZkIdentity> {
    checkParameter(sign, "sign", "function")
    checkParameter(provider, "provider", "string")
    checkParameter(nonce, "nonce", "number")

    const message = await sign(
        `Sign this message to generate your ${provider} Semaphore identity with key nonce: ${nonce}.`
    )

    return new ZkIdentity(Strategy.MESSAGE, message)
}
