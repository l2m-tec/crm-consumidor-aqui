import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth/account', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/auth/account')>()
  return { ...actual, requireRole: vi.fn() }
})

import { ForbiddenError, requireRole } from '@/lib/auth/account'
import { DELETE, POST } from './route'

describe('WhatsApp configuration authorization', () => {
  beforeEach(() => {
    vi.mocked(requireRole).mockReset()
    vi.mocked(requireRole).mockRejectedValue(new ForbiddenError())
  })

  it('rejects a non-admin before reading credentials or contacting Meta', async () => {
    const json = vi.fn()
    const response = await POST({ json } as unknown as Request)
    expect(response.status).toBe(403)
    expect(requireRole).toHaveBeenCalledWith('admin')
    expect(json).not.toHaveBeenCalled()
  })

  it('rejects a non-admin before deleting the configuration', async () => {
    const response = await DELETE()
    expect(response.status).toBe(403)
    expect(requireRole).toHaveBeenCalledWith('admin')
  })
})
