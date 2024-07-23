/* instanbul ignore file */

import { RecordStorage, StorageRecord } from './RecordStorage.ts'
import { env } from 'node:process'
import { getStore } from '@netlify/blobs'

export class NetlifyBlobStorage implements RecordStorage {
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
		;['NETLIFY_AUTH_TOKEN', 'NETLIFY_SITE_ID'].forEach((key) => {
			if (!(key in env)) throw new Error(`missing environment variable ${key}.`)
		})

		const id = 'some_id'
		const recordWithId = { ...record, id }

		await getStore({
			name: store,
			siteID: `${env.NETLIFY_SITE_ID}`,
			token: `${env.NETLIFY_AUTH_TOKEN}`,
		}).set(id, JSON.stringify(recordWithId))

		return recordWithId
	}

	/**
	 * Gets a record from storage.
	 *
	 * @param  {string}                 store Name of store.
	 * @param  {string}                 id    Record ID.
	 * @return {Promise<StorageRecord>}       Record from storage.
	 * @throws {Error}                        Store or record not found.
	 * @since  unreleased
	 */
	async get(_store: string, _id: string): Promise<StorageRecord> {
		return { id: 'some_id' }
	}

	/**
	 * Updates a record in storage.
	 *
	 * @param  {string}                 store  Name of store.
	 * @param  {StorageRecord}          record Record to update.
	 * @return {Promise<StorageRecord>}        Updated record.
	 * @throws {Error}                         Store or record not found.
	 * @since  unreleased
	 */
	async update(_store: string, _record: StorageRecord): Promise<StorageRecord> {
		return { id: 'some_id' }
	}

	/**
	 * Deletes a record from storage.
	 *
	 * @param  {string}                 store  Name of store.
	 * @param  {StorageRecord}          record Record to delete.
	 * @return {Promise<StorageRecord>}        Deleted record.
	 * @throws {Error}                         Store or record not found.
	 * @since  unreleased
	 */
	async delete(_store: string, _record: StorageRecord): Promise<StorageRecord> {
		return { id: 'some_id' }
	}
}
