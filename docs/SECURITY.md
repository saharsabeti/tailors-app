# Security readiness

- `VITE_*` values are public; never place secrets or credentials in web variables.
- Demo data and draft order previews are not persisted or sent.
- Do not call mock orders production transactions.
- Backend must validate authorization, workflow transitions, filenames/uploads and user inputs.
- Use HTTPS, secure credential storage, CSRF strategy where relevant and per-request authorization.
- Add threat modeling and end-to-end tests before releasing payment flows.
