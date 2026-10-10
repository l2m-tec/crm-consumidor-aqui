-- CRM access is provisioned by the account owner. Auth self-signup must
-- also be disabled in Supabase Authentication > Sign In / Providers.
-- Keep ownership and membership fields writable only by trusted functions.
REVOKE INSERT, UPDATE ON public.profiles FROM anon, authenticated;
GRANT UPDATE (full_name, avatar_url) ON public.profiles TO authenticated;

REVOKE UPDATE ON public.accounts FROM anon, authenticated;
GRANT UPDATE (name, default_currency) ON public.accounts TO authenticated;

-- Invitation links may only be created or revoked by the account owner.
ALTER POLICY account_invitations_modify ON public.account_invitations
  USING (public.is_account_member(account_id, 'owner'))
  WITH CHECK (public.is_account_member(account_id, 'owner'));
