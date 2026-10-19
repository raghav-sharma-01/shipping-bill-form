import { saveBill } from './demo-store'
import type { SavedBill, ShippingBillFormValues } from './model'

const MOCK_LATENCY_MS = 350

function wait<T>(value: T, delay = MOCK_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay))
}

/**
 * API-shaped local service for environments without a backend.
 * Keeping persistence behind this boundary makes a future HTTP implementation
 * replaceable without coupling the form to storage details.
 */
export const shippingBillMockService = {
  async submit(values: ShippingBillFormValues, id?: number): Promise<SavedBill> {
    // Keep this boundary asynchronous, like a real network request.
    await wait(null)
    return saveBill(values, id)
  }
}
