export interface StorageRecord {
	id: string
	[K: string]: unknown
}

export interface RecordStorage {
	/**
	 * Creates a record in storage.
	 *
	 * @param  {string}                  store  Name of store.
	 * @param  {Record<string, unknown>} record Record to create.
	 * @return {Promise<StorageRecord>}         Created record.
	 * @since  unreleased
	 */
	create(store: string, record: Record<string, unknown>): Promise<StorageRecord>

	/**
	 * Gets a record from storage.
	 *
	 * @param  {string}                 store Name of store.
	 * @param  {string}                 id    Record ID.
	 * @return {Promise<StorageRecord>}       Record from storage.
	 * @throws {Error}                        Store or record not found.
	 * @since  unreleased
	 */
	get(store: string, id: string): Promise<StorageRecord>

	/**
	 * Updates a record in storage.
	 *
	 * @param  {string}                 store  Name of store.
	 * @param  {StorageRecord}          record Record to update.
	 * @return {Promise<StorageRecord>}        Updated record.
	 * @throws {Error}                         Store or record not found.
	 * @since  unreleased
	 */
	update(store: string, record: StorageRecord): Promise<StorageRecord>

	/**
	 * Deletes a record from storage.
	 *
	 * @param  {string}                 store  Name of store.
	 * @param  {StorageRecord}          record Record to delete.
	 * @return {Promise<StorageRecord>}        Deleted record.
	 * @throws {Error}                         Store or record not found.
	 * @since  unreleased
	 */
	delete(store: string, record: StorageRecord): Promise<StorageRecord>
}
