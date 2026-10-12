import { describe, expect, it } from 'vitest'
import { isTrustedMetaPageUrl } from './meta-page-url'

describe('isTrustedMetaPageUrl', () => {
  it('accepts a versioned Graph API page URL', () => {
    expect(isTrustedMetaPageUrl('https://graph.facebook.com/v21.0/123/message_templates?after=abc', 'v21.0')).toBe(true)
  })

  it.each([
    'http://graph.facebook.com/v21.0/123/message_templates',
    'https://graph.facebook.com.evil.test/v21.0/123',
    'https://graph.facebook.com:444/v21.0/123',
    'https://graph.facebook.com@evil.test/v21.0/123',
    'https://graph.facebook.com/v22.0/123/message_templates',
    'not a url',
  ])('rejects an untrusted page URL: %s', (url) => {
    expect(isTrustedMetaPageUrl(url, 'v21.0')).toBe(false)
  })
})
