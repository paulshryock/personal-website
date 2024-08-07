/* instanbul ignore file */

import { RecordStorage, StorageRecord } from './RecordStorage.ts'
import { createHash } from 'node:crypto'
import { env } from 'node:process'
import { getStore } from '@netlify/blobs'

export class NetlifyBlobStorage implements RecordStorage {
	#hashAlgorithm = 'sha256'
	#requiredEnvironmentVariables = ['NETLIFY_AUTH_TOKEN', 'NETLIFY_SITE_ID']

	/**
	 * Creates a record in storage.
	 *
	 * @param  {string}                  store  Name of store.
	 * @param  {Record<string, unknown>} record Record to create.
	 * @return {Promise<StorageRecord>}         Created record.
	 * @throws {Error}                          Missing environment variable.
	 * @since  unreleased
	 */
	async create(
		store: string,
		record: Record<string, unknown>,
	): Promise<StorageRecord> {
		this.#validateEnvironmentVariables()

		const dateTimeUtc = new Date().toISOString()
		const id = this.#createId(JSON.stringify(record))
		const storedRecord = { ...record, dateTimeUtc, id }

		await getStore({
			name: store,
			siteID: env.NETLIFY_SITE_ID ?? '',
			token: env.NETLIFY_AUTH_TOKEN ?? '',
		}).set(id, JSON.stringify(storedRecord))

		return storedRecord
	}

	/**
	 * Gets a record from storage.
	 *
	 * @param  {string}                 store Name of store.
	 * @param  {string}                 id    Record ID.
	 * @return {Promise<StorageRecord>}       Record from storage.
	 * @throws {Error}                        Store or record not found.
	 * @since  unreleased
	 * @todo
	 */
	async get(_store: string, id: string): Promise<StorageRecord> {
		return { id }
	}

	/**
	 * Updates a record in storage.
	 *
	 * @param  {string}                 store  Name of store.
	 * @param  {StorageRecord}          record Record to update.
	 * @return {Promise<StorageRecord>}        Updated record.
	 * @throws {Error}                         Store or record not found.
	 * @since  unreleased
	 * @todo
	 */
	async update(_store: string, record: StorageRecord): Promise<StorageRecord> {
		return { id: record.id }
	}

	/**
	 * Deletes a record from storage.
	 *
	 * @param  {string}                 store  Name of store.
	 * @param  {StorageRecord}          record Record to delete.
	 * @return {Promise<StorageRecord>}        Deleted record.
	 * @throws {Error}                         Store or record not found.
	 * @since  unreleased
	 * @todo
	 */
	async delete(_store: string, record: StorageRecord): Promise<StorageRecord> {
		return { id: record.id }
	}

	/**
	 * Creates an ID by hashing a record.
	 *
	 * @param  {string} record Record to hash.
	 * @return {string}        Hashed ID.
	 * @since  unreleased
	 */
	#createId(record: string): string {
		return createHash(this.#hashAlgorithm).update(record).digest('hex')
	}

	/**
	 * Validates that required environment variables are set.
	 *
	 * @return void
	 * @since  unreleased
	 */
	#validateEnvironmentVariables(): void {
		for (const key of this.#requiredEnvironmentVariables)
			if (typeof env[key] === 'undefined')
				throw new Error(`missing environment variable ${key}.`)
	}
}
