# Deploy from wandermate374 GitHub Account

You're using the **wandermate374** GitHub account for Vercel. Your code is currently pushed to **wandermate123/wandermate-packages**.

---

## Done for you

- **Remote added**: `wandermate374` → `https://github.com/wandermate374/wandermate-packages.git`
- **GitHub page opened**: Create the repo with one click (name `wandermate-packages` is pre-filled; leave "Add a README" unchecked), then run:

```powershell
.\push-to-wandermate374.ps1
```

Or: `git push -u wandermate374 main`

Then in **Vercel** (as wandermate374): **Add New** → **Project** → Import **wandermate374/wandermate-packages** → add env vars → Deploy.

---

## Other options

---

## Option A: Push this repo to wandermate374 (recommended)

So Vercel (logged in as wandermate374) deploys from **your** account.

### 1. Create repo on GitHub (wandermate374)

1. Log in to GitHub as **wandermate374**.
2. **New repository**: https://github.com/new  
3. Name it (e.g. `wandermate-packages` or `PACK12`).
4. Do **not** add README/gitignore (you already have them).
5. Create the repo.

### 2. Add wandermate374 as a remote and push

In your project folder (PACK12), run:

```powershell
# Add wandermate374 repo as a remote (replace REPO_NAME with your repo name)
git remote add wandermate374 https://github.com/wandermate374/REPO_NAME.git

# Push main branch to wandermate374
git push -u wandermate374 main
```

Example if repo is `wandermate-packages`:

```powershell
git remote add wandermate374 https://github.com/wandermate374/wandermate-packages.git
git push -u wandermate374 main
```

### 3. Connect Vercel to wandermate374’s repo

1. **Vercel** → https://vercel.com/dashboard (signed in as wandermate374).
2. **Add New** → **Project**.
3. **Import** the repo **wandermate374/REPO_NAME** (e.g. `wandermate374/wandermate-packages`).
4. Configure env vars (see `ADD-ENV-VARIABLES.md`), then **Deploy**.

Vercel will then build from the latest commit you pushed to wandermate374.

---

## Option B: Keep using wandermate123’s repo

If Vercel is already connected to **wandermate123/wandermate-packages**:

- Make sure you’re logged into Vercel with the account that has access to **wandermate123**’s repo (e.g. same user or org).
- In **Vercel → Project → Settings → Git**:
  - Confirm **Connected Git Repository** is `wandermate123/wandermate-packages`.
  - If it’s disconnected or wrong, **Connect** and choose that repo.
- In **Deployments**, use **Redeploy** on the latest deployment so it uses commit `a24f735`.

---

## Option C: Fork wandermate123 → wandermate374

1. On GitHub, as **wandermate374**, go to:  
   `https://github.com/wandermate123/wandermate-packages`
2. Click **Fork** and create the fork under **wandermate374**.
3. In your local PACK12 folder:

   ```powershell
   git remote add wandermate374 https://github.com/wandermate374/wandermate-packages.git
   git push -u wandermate374 main
   ```

4. In Vercel (as wandermate374), **Add New** → **Project** and import **wandermate374/wandermate-packages**.

---

## Summary

| Goal | Action |
|------|--------|
| Deploy from **wandermate374** | Push code to a repo under **wandermate374** and connect that repo in Vercel (Option A or C). |
| Keep using **wandermate123** repo | Connect Vercel to `wandermate123/wandermate-packages` and redeploy (Option B). |

After you push to the repo that Vercel is using, add env vars in the Vercel project (see **ADD-ENV-VARIABLES.md**) and redeploy once.
